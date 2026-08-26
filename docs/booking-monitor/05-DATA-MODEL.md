# 05. Модель данных, контракты, форматы

Дополнение к [04-TZ.md](04-TZ.md). PostgreSQL 16, SQLAlchemy 2.0, Alembic.

---

## 1. Схема данных

### 1.1 Диаграмма связей

```
tenants ──┬── clinics ──┬── branches ────────┐
          │             └── doctors ─────────┤
          │                                  │
          ├── platforms (справочник)         │
          │       │                          │
          │       └── platform_accounts      │
          │                                  ▼
          └────────────────────────► monitor_points ◄── platform_cards
                                          │  │  │
                     ┌────────────────────┘  │  └──────────────┐
                     ▼                       ▼                 ▼
                 measurements           incidents            mutes
                     │                       │
                     ▼                       ▼
                 snapshots ◄────────────── (ссылка на доказательство)

crawl_runs ──► measurements          canaries ──► monitor_points
audit_log                            unmatched_cards
```

### 1.2 DDL

```sql
-- ─────────── Арендаторы и справочники ───────────

CREATE TABLE tenants (
    id              bigserial PRIMARY KEY,
    code            text NOT NULL UNIQUE,
    title           text NOT NULL,
    timezone        text NOT NULL DEFAULT 'Europe/Moscow',
    settings        jsonb NOT NULL DEFAULT '{}',   -- пороги, окна, каналы (§17.1 ТЗ)
    is_active       boolean NOT NULL DEFAULT true,
    created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE platforms (
    id              smallserial PRIMARY KEY,
    code            text NOT NULL UNIQUE,          -- prodoctorov | napopravku | sberhealth
    title           text NOT NULL,
    base_url        text NOT NULL,
    max_horizon_days smallint NOT NULL DEFAULT 14,
    distinguishes_empty_schedule boolean NOT NULL DEFAULT false,
    supports_bulk_listing        boolean NOT NULL DEFAULT true,
    rate_limit_rps  numeric(4,2) NOT NULL DEFAULT 1.0,
    concurrency     smallint NOT NULL DEFAULT 2,
    is_enabled      boolean NOT NULL DEFAULT true
);

CREATE TABLE clinics (
    id              bigserial PRIMARY KEY,
    tenant_id       bigint NOT NULL REFERENCES tenants(id),
    title           text NOT NULL,
    created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE branches (
    id              bigserial PRIMARY KEY,
    tenant_id       bigint NOT NULL REFERENCES tenants(id),
    clinic_id       bigint NOT NULL REFERENCES clinics(id),
    title           text NOT NULL,
    address         text,
    external_ref    text,                          -- ID филиала в МИС
    is_active       boolean NOT NULL DEFAULT true
);

CREATE TABLE doctors (
    id              bigserial PRIMARY KEY,
    tenant_id       bigint NOT NULL REFERENCES tenants(id),
    clinic_id       bigint NOT NULL REFERENCES clinics(id),
    full_name       text NOT NULL,
    full_name_norm  text NOT NULL,                 -- нормализовано: нижний регистр, ё→е
    speciality      text,
    external_ref    text,                          -- ID врача в МИС
    is_active       boolean NOT NULL DEFAULT true,
    archived_at     timestamptz,
    created_at      timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ix_doctors_norm ON doctors (tenant_id, full_name_norm);

-- ─────────── Карточки на площадках ───────────

CREATE TABLE platform_cards (
    id              bigserial PRIMARY KEY,
    tenant_id       bigint NOT NULL REFERENCES tenants(id),
    platform_id     smallint NOT NULL REFERENCES platforms(id),
    external_id     text NOT NULL,                 -- ПЕРВИЧНЫЙ ключ связи, не ФИО
    url             text NOT NULL,
    raw_full_name   text,                          -- как написано на площадке
    raw_speciality  text,
    raw_branch      text,
    first_seen_at   timestamptz NOT NULL DEFAULT now(),
    last_seen_at    timestamptz NOT NULL DEFAULT now(),
    disappeared_at  timestamptz,
    UNIQUE (tenant_id, platform_id, external_id)
);

-- ─────────── Точка мониторинга: врач × филиал × площадка ───────────

CREATE TYPE point_status AS ENUM (
    'AVAILABLE', 'THIN', 'NO_SLOTS', 'SCHEDULE_EMPTY',
    'BOOKING_OFF', 'CARD_MISSING', 'NO_SLOTS_UNCLASSIFIED', 'UNKNOWN'
);

CREATE TABLE monitor_points (
    id              bigserial PRIMARY KEY,
    tenant_id       bigint NOT NULL REFERENCES tenants(id),
    doctor_id       bigint NOT NULL REFERENCES doctors(id),
    branch_id       bigint NOT NULL REFERENCES branches(id),
    platform_id     smallint NOT NULL REFERENCES platforms(id),
    card_id         bigint REFERENCES platform_cards(id),   -- NULL = не сопоставлено
    match_confidence numeric(3,2),                 -- 1.00 точное, <1 нечёткое
    match_method    text,                          -- exact | fuzzy | manual
    is_active       boolean NOT NULL DEFAULT true,

    -- денормализация текущего состояния для быстрого раздела
    current_status  point_status,
    status_since    date,                          -- ДАТА НАЧАЛА ИНЦИДЕНТА
    last_checked_at timestamptz,
    last_ok_at      timestamptz,
    days_to_first_slot smallint,

    created_at      timestamptz NOT NULL DEFAULT now(),
    UNIQUE (tenant_id, doctor_id, branch_id, platform_id)
);
CREATE INDEX ix_mp_current ON monitor_points (tenant_id, current_status, status_since);
CREATE INDEX ix_mp_active  ON monitor_points (tenant_id, is_active) WHERE is_active;

-- ─────────── Замеры: одна строка на точку в сутки ───────────

CREATE TABLE measurements (
    id              bigserial PRIMARY KEY,
    tenant_id       bigint NOT NULL,
    point_id        bigint NOT NULL REFERENCES monitor_points(id),
    run_id          bigint NOT NULL REFERENCES crawl_runs(id),
    measured_on     date NOT NULL,
    checked_at      timestamptz NOT NULL,
    status          point_status NOT NULL,
    confirmed       boolean NOT NULL DEFAULT false, -- подтверждено правилом 2-из-3

    -- признаки §6.3 ТЗ: пишутся ВСЕГДА
    days_to_first_slot  smallint,
    free_slots_count    integer,
    schedule_days_count smallint,
    horizon_used        smallint,
    latency_ms          integer,
    source              text NOT NULL DEFAULT 'http',  -- http | browser
    snapshot_id         bigint REFERENCES snapshots(id),
    error_code          text,

    UNIQUE (point_id, measured_on)
);
CREATE INDEX ix_meas_point_date ON measurements (point_id, measured_on DESC);
CREATE INDEX ix_meas_run        ON measurements (run_id);

-- ─────────── Инциденты ───────────

CREATE TABLE incidents (
    id              bigserial PRIMARY KEY,
    tenant_id       bigint NOT NULL,
    point_id        bigint NOT NULL REFERENCES monitor_points(id),
    status          point_status NOT NULL,          -- текущее BAD-состояние
    severity        text NOT NULL,                  -- bad | watch
    started_on      date NOT NULL,
    ended_on        date,
    duration_days   integer GENERATED ALWAYS AS
                        (COALESCE(ended_on, CURRENT_DATE) - started_on) STORED,
    open_snapshot_id  bigint REFERENCES snapshots(id),
    close_snapshot_id bigint REFERENCES snapshots(id),
    notified_open_at  timestamptz,
    notified_close_at timestamptz,
    mass_event_id   bigint REFERENCES mass_events(id)  -- если часть массового события
);
CREATE INDEX ix_inc_open ON incidents (tenant_id, ended_on) WHERE ended_on IS NULL;

-- переходы внутри инцидента (BAD → другой BAD)
CREATE TABLE incident_transitions (
    id              bigserial PRIMARY KEY,
    incident_id     bigint NOT NULL REFERENCES incidents(id),
    changed_on      date NOT NULL,
    from_status     point_status NOT NULL,
    to_status       point_status NOT NULL
);

-- ─────────── Массовые события ───────────

CREATE TABLE mass_events (
    id              bigserial PRIMARY KEY,
    tenant_id       bigint NOT NULL,
    run_id          bigint NOT NULL REFERENCES crawl_runs(id),
    scope           text NOT NULL,                  -- platform | platform_branch
    platform_id     smallint NOT NULL REFERENCES platforms(id),
    branch_id       bigint REFERENCES branches(id),
    affected_count  integer NOT NULL,
    total_count     integer NOT NULL,
    dominant_status point_status NOT NULL,
    hypothesis      text,                           -- текст версии причины
    notified_at     timestamptz,
    created_at      timestamptz NOT NULL DEFAULT now()
);

-- ─────────── Заглушения ───────────

CREATE TABLE mutes (
    id              bigserial PRIMARY KEY,
    tenant_id       bigint NOT NULL,
    point_id        bigint NOT NULL REFERENCES monitor_points(id),
    muted_from      date NOT NULL DEFAULT CURRENT_DATE,
    muted_until     date NOT NULL,
    reason          text NOT NULL,                  -- обязательно
    created_by      text NOT NULL,
    created_at      timestamptz NOT NULL DEFAULT now(),
    revoked_at      timestamptz
);
CREATE INDEX ix_mutes_active ON mutes (point_id, muted_until) WHERE revoked_at IS NULL;

-- ─────────── Снапшоты-доказательства ───────────

CREATE TABLE snapshots (
    id              bigserial PRIMARY KEY,
    tenant_id       bigint NOT NULL,
    point_id        bigint NOT NULL,
    captured_at     timestamptz NOT NULL DEFAULT now(),
    kind            text NOT NULL,                  -- json | html | screenshot
    payload         bytea NOT NULL,                 -- усечено до 64 КБ
    truncated       boolean NOT NULL DEFAULT false,
    keep_forever    boolean NOT NULL DEFAULT false, -- true для моментов перехода
    request_url     text,
    http_status     smallint
);
CREATE INDEX ix_snap_gc ON snapshots (captured_at) WHERE NOT keep_forever;

-- ─────────── Обходы ───────────

CREATE TABLE crawl_runs (
    id              bigserial PRIMARY KEY,
    tenant_id       bigint NOT NULL,
    started_at      timestamptz NOT NULL DEFAULT now(),
    finished_at     timestamptz,
    outcome         text,          -- ok | degraded | suspect | timeout | aborted
    points_total    integer,
    points_checked  integer,
    unknown_count   integer,
    http_403_count  integer,
    http_429_count  integer,
    by_status       jsonb,         -- {"AVAILABLE": 1082, "SCHEDULE_EMPTY": 41, ...}
    by_platform     jsonb,
    notes           text
);

-- ─────────── Канарейки ───────────

CREATE TABLE canaries (
    id              bigserial PRIMARY KEY,
    tenant_id       bigint NOT NULL,
    point_id        bigint NOT NULL REFERENCES monitor_points(id),
    platform_id     smallint NOT NULL REFERENCES platforms(id),
    origin          text NOT NULL,   -- auto_stable | manual_verified
    verified_at     timestamptz,
    is_active       boolean NOT NULL DEFAULT true
);

-- ─────────── Несопоставленные карточки ───────────

CREATE TABLE unmatched_cards (
    id              bigserial PRIMARY KEY,
    tenant_id       bigint NOT NULL,
    card_id         bigint NOT NULL REFERENCES platform_cards(id),
    detected_at     timestamptz NOT NULL DEFAULT now(),
    resolution      text,            -- linked | not_ours | ignored
    resolved_by     text,
    resolved_at     timestamptz
);

-- ─────────── Аудит ───────────

CREATE TABLE audit_log (
    id              bigserial PRIMARY KEY,
    tenant_id       bigint NOT NULL,
    actor           text NOT NULL,
    action          text NOT NULL,   -- mute.create | card.link | settings.update | ...
    object_type     text NOT NULL,
    object_id       bigint,
    payload         jsonb,
    created_at      timestamptz NOT NULL DEFAULT now()
);
```

### 1.3 Ключевые решения схемы

| Решение | Почему |
|---|---|
| `UNIQUE (point_id, measured_on)` в `measurements` | Одна строка на точку в сутки → идемпотентность повторного запуска обхода, простой расчёт Booking Uptime, предсказуемый объём |
| `current_status` и `status_since` денормализованы в `monitor_points` | Раздел на 1 200 строк открывается одним запросом без агрегации по истории |
| `card_id` NULLable | Точка может существовать без сопоставленной карточки (`NOT_LISTED` в отчёте о покрытии) |
| Связь по `platform_cards.external_id`, не по ФИО | Требование С2 ТЗ: смена ФИО не рвёт связь |
| `snapshots.keep_forever` | Снапшоты моментов перехода — бессрочно (доказательства), обычные — 30 дней |
| `incidents.duration_days` — GENERATED | Всегда актуально для открытых инцидентов без пересчёта |
| `tenant_id` в каждой таблице, включая дочерние | Мультитенантность включается конфигурацией, а не рефакторингом ([02-PRODUCT.md §2](02-PRODUCT.md)) |
| `settings jsonb` на арендатора | Калибровка порогов без деплоя (§17.1 ТЗ) |

### 1.4 Оценка объёма

| Таблица | Строк/год при 1 200 ТМ | Объём |
|---|---|---|
| `measurements` | 438 000 | ~80 МБ |
| `incidents` | ~2 500 | <1 МБ |
| `snapshots` (постоянные) | ~5 000 × 20 КБ | ~100 МБ |
| `snapshots` (скользящие 30 дн.) | 36 000 × 15 КБ | ~540 МБ |
| `crawl_runs` | 365 | <1 МБ |
| **Итого за год** | | **< 1 ГБ** |

Партиционирование, ClickHouse, Timescale — не требуются. Порог целесообразности партиционирования `measurements` — ~50 млн строк, то есть ~10 арендаторов × 10 лет.

---

## 2. Ключевые запросы

**Booking Uptime за период:**

```sql
SELECT
  ROUND(100.0 * COUNT(*) FILTER (WHERE m.status IN ('AVAILABLE','THIN'))
        / NULLIF(COUNT(*), 0), 1) AS booking_uptime_pct
FROM measurements m
JOIN monitor_points p ON p.id = m.point_id
WHERE m.tenant_id = :tenant
  AND m.measured_on BETWEEN :from AND :to
  AND m.status <> 'UNKNOWN'                     -- неизвестное не штрафует клинику
  AND NOT EXISTS (                              -- заглушённые вне знаменателя
    SELECT 1 FROM mutes mu
    WHERE mu.point_id = m.point_id
      AND mu.revoked_at IS NULL
      AND m.measured_on BETWEEN mu.muted_from AND mu.muted_until
  );
```

**Раздел «Онлайн-запись», основной список:**

```sql
SELECT p.id, d.full_name, d.speciality, b.title AS branch, pl.title AS platform,
       p.current_status, p.status_since,
       CURRENT_DATE - p.status_since AS days_in_status,
       p.days_to_first_slot, p.last_checked_at, c.url,
       (mu.id IS NOT NULL) AS is_muted
FROM monitor_points p
JOIN doctors  d  ON d.id = p.doctor_id
JOIN branches b  ON b.id = p.branch_id
JOIN platforms pl ON pl.id = p.platform_id
LEFT JOIN platform_cards c ON c.id = p.card_id
LEFT JOIN mutes mu ON mu.point_id = p.id
     AND mu.revoked_at IS NULL AND CURRENT_DATE BETWEEN mu.muted_from AND mu.muted_until
WHERE p.tenant_id = :tenant AND p.is_active
  AND (:show_muted OR mu.id IS NULL)
  AND p.current_status = ANY(:statuses)
ORDER BY days_in_status DESC NULLS LAST
LIMIT :limit OFFSET :offset;
```

**Проверка порога массовости после обхода:**

```sql
SELECT pl.code, b.id AS branch_id, b.title,
       COUNT(*) FILTER (WHERE m.status IN
            ('SCHEDULE_EMPTY','BOOKING_OFF','CARD_MISSING','NO_SLOTS_UNCLASSIFIED')) AS bad,
       COUNT(*) AS total,
       ROUND(100.0 * COUNT(*) FILTER (WHERE m.status IN
            ('SCHEDULE_EMPTY','BOOKING_OFF','CARD_MISSING','NO_SLOTS_UNCLASSIFIED'))
            / COUNT(*), 1) AS bad_pct
FROM measurements m
JOIN monitor_points p ON p.id = m.point_id
JOIN branches b ON b.id = p.branch_id
JOIN platforms pl ON pl.id = p.platform_id
WHERE m.run_id = :run_id
GROUP BY pl.code, b.id, b.title
HAVING COUNT(*) FILTER (WHERE m.status IN
            ('SCHEDULE_EMPTY','BOOKING_OFF','CARD_MISSING','NO_SLOTS_UNCLASSIFIED')) >= 10
   AND 100.0 * COUNT(*) FILTER (WHERE m.status IN
            ('SCHEDULE_EMPTY','BOOKING_OFF','CARD_MISSING','NO_SLOTS_UNCLASSIFIED'))
            / COUNT(*) >= 30;
```

---

## 3. Контракты коннектора

```python
from dataclasses import dataclass
from datetime import date, datetime

@dataclass(frozen=True)
class Capabilities:
    distinguishes_empty_schedule: bool
    supports_bulk_listing: bool
    max_horizon_days: int
    requires_browser: bool

@dataclass(frozen=True)
class CardRef:
    external_id: str
    url: str
    raw_full_name: str | None
    raw_speciality: str | None
    raw_branch: str | None
    booking_enabled: bool | None      # None = из листинга не определить, нужен L2

@dataclass(frozen=True)
class SlotDay:
    day: date
    free_slots: int                   # количество СВОБОДНЫХ слотов
    has_reception: bool               # есть ли в этот день приём вообще

@dataclass(frozen=True)
class RawAvailability:
    card_found: bool
    booking_enabled: bool | None
    schedule_days: list[SlotDay]      # пустой список = календарь пуст
    fetch_failed: bool
    error_code: str | None
    horizon_used: int
    latency_ms: int
    source: str                       # 'http' | 'browser'
    raw_payload: bytes                # для снапшота, уже очищен от лишних полей
```

**Инварианты, проверяемые тестами:**

| # | Инвариант |
|---|---|
| К1 | Коннектор **никогда** не возвращает `point_status` — только сырые факты. Классификация едина для всех площадок |
| К2 | `raw_payload` очищен от любых полей, не относящихся к свободным слотам, **до** возврата (требование Б8 ТЗ) |
| К3 | При `fetch_failed=True` остальные поля игнорируются классификатором |
| К4 | `schedule_days` содержит только дни в пределах `horizon_used`, отсортированные по возрастанию |
| К5 | `has_reception=False` и `free_slots=0` для дня — день без приёма, не «всё занято» |
| К6 | Коннектор не выполняет повторов и не управляет частотой — это ответственность оркестратора |

---

## 4. API раздела

Префикс `/api/booking`. Авторизация — существующая сессия дашборда.

| Метод | Путь | Назначение |
|---|---|---|
| `GET` | `/summary` | Плитки сводки + Booking Uptime + спарклайн 30 дней |
| `GET` | `/points` | Список ТМ: фильтры, сортировка, серверная пагинация |
| `GET` | `/points/{id}` | Карточка ТМ: текущее состояние, признаки, ссылки |
| `GET` | `/points/{id}/history` | Лента состояний по дням за период |
| `GET` | `/points/{id}/incidents` | Инциденты по ТМ |
| `GET` | `/points/{id}/snapshot/{snapshot_id}` | Доказательство (JSON/HTML/скриншот) |
| `POST` | `/points/{id}/mute` | Заглушить: `{until: date, reason: str}` — reason обязателен |
| `DELETE` | `/points/{id}/mute` | Снять заглушение |
| `GET` | `/incidents` | Открытые инциденты, фильтры |
| `GET` | `/mass-events` | Массовые события за период |
| `POST` | `/export` | Запустить формирование XLSX (фоново) → `{task_id}` |
| `GET` | `/export/{task_id}` | Статус и ссылка на готовый файл |
| `GET` | `/coverage` | Отчёт о полноте сопоставления (для Ц3/П3) |
| `GET` | `/unmatched` | Очередь новых карточек |
| `POST` | `/unmatched/{id}/link` | Связать карточку с врачом и филиалом |
| `GET` | `/runs` | Журнал обходов (только администратор) |
| `GET` | `/health` | Состояние системы: последний обход, канарейки, свежесть данных |

**Параметры `/points`:**
`platform[]`, `branch[]`, `status[]`, `speciality[]`, `new_within_days`, `days_in_status_gte`, `q`, `show_muted`, `sort` (по умолчанию `days_in_status:desc`), `limit`, `offset`.

Состояние фильтров кодируется в query-строке раздела, чтобы ссылка из Telegram открывала нужный срез (требование §11.3 ТЗ).

---

## 5. Форматы уведомлений — шаблоны

Шаблоны хранятся отдельно от кода (Jinja2), редактируются без деплоя.

| Шаблон | Триггер | Канал |
|---|---|---|
| `digest_daily.j2` | после обхода, ежедневно | клиент |
| `mass_event.j2` | порог массовости | клиент |
| `weekly_summary.j2` | понедельник | клиент |
| `platform_paused.j2` | `403` / стоп-кран | клиент (кратко) + разработчик |
| `tech_suspect.j2` | канарейки упали | разработчик |
| `tech_degraded.j2` | `UNKNOWN` > 20 % | разработчик |
| `tech_auditor_mismatch.j2` | расхождение ночного аудитора | разработчик |
| `tech_drift.j2` | распределение состояний вне 3σ | разработчик |
| `tech_watchdog.j2` | обход не запустился | разработчик (через healthchecks.io) |

Макеты сообщений — [04-TZ.md §10.3](04-TZ.md).

---

## 6. Структура репозитория

```
booking-monitor/
├── CLAUDE.md                 # правила для агента, см. 06-PLAN.md §4
├── docker-compose.yml
├── alembic/
├── src/booking_monitor/
│   ├── config.py             # только чтение настроек, никаких констант-порогов
│   ├── models/               # SQLAlchemy
│   ├── connectors/
│   │   ├── base.py           # Protocol, dataclasses (§3) — ЕДИНСТВЕННЫЙ контракт
│   │   ├── prodoctorov.py
│   │   ├── napopravku.py
│   │   ├── sberhealth.py
│   │   └── browser.py        # Playwright-fallback, общий для всех
│   ├── classify.py           # §6.2 ТЗ — один файл, полное покрытие тестами
│   ├── orchestrator.py       # обход, лимиты, подтверждение, стоп-кран
│   ├── incidents.py          # жизненный цикл, склейка, массовые события
│   ├── canaries.py
│   ├── matching.py           # identity resolution, §9 ТЗ
│   ├── notify/
│   │   ├── policy.py         # дедуп, пороги, тихие часы
│   │   ├── telegram.py
│   │   └── templates/*.j2
│   ├── export/xlsx.py
│   ├── api/                  # FastAPI-роутеры
│   └── scheduler.py
├── tests/
│   ├── fixtures/             # GOLDEN-ФИКСТУРЫ — главный артефакт проекта
│   │   ├── prodoctorov/{available,thin,no_slots,schedule_empty,
│   │   │                 booking_off,card_missing,broken}.json
│   │   ├── napopravku/...
│   │   └── sberhealth/...
│   ├── test_classify.py      # фикстура → ожидаемое состояние, все ветви
│   ├── test_incidents.py     # флап, UNKNOWN-разрыв, BAD→BAD, mute
│   ├── test_notify_policy.py # массовость, дедуп, тихие часы, SUSPECT
│   ├── test_matching.py      # ФИО, однофамильцы, смена фамилии, ё
│   └── test_contracts_live.py # ежедневная сверка структуры ответа (прод)
└── docs/
    ├── runbook.md            # обязательный артефакт, §17.3 ТЗ
    ├── operator-guide.md     # инструкция оператору клиники
    └── connector-passports/  # паспорта коннекторов из Фазы 0
```
