# Промпт: репозиторий → интерактивная изометрическая карта

Оригинальный промпт, который разошёлся по X, выглядит так:

> Analyze [repo] at latest main. Create an isometric system map with legend and explainer panel.
> Show infrastructure as varied 3D buildings on a grid, with dependencies and payloads tracing
> real control/data paths. Cite files.

Он работает, но на большом репозитории даёт красивую картинку с выдуманными подписями.
Ниже — расширенная версия, которая заставляет модель сначала прочитать код, а рисовать потом.
Ей собрана карта в этой же папке (`docs/repo-map/index.html`).

---

## Промпт (копировать целиком)

```
Построй интерактивную изометрическую карту репозитория <ВЛАДЕЛЕЦ/РЕПО> на ветке <ВЕТКА>.

ЭТАП 1 — РАЗВЕДКА. Ничего не рисуй, пока не прочитаешь. Собери фактуру:
  · дерево файлов, размеры и количество строк каждого значимого файла;
  · точку входа и порядок загрузки — что и в каком порядке подключается;
  · все зависимости: импорты, глобальные переменные, теги script/link, вызовы API;
  · внешние границы: домены, сторонние сервисы, CDN, базы, очереди;
  · конфиги деплоя и инфраструктуры;
  · мёртвый груз: файлы без единой входящей ссылки, дубли, забытые артефакты;
  · расхождения между документацией (README, docs/, комментарии) и кодом.
Каждый факт держи с адресом «файл:строка». Ничего не додумывай: если связи не видно
в коде — её нет на карте.

ЭТАП 2 — МОДЕЛЬ. Преврати фактуру в узлы и рёбра:
  · узел = файл, модуль, хранилище, внешний сервис или точка монтирования;
  · слой узла = роль в системе (доставка, документ, рантайм, данные, ассеты, внешнее,
    документация, мёртвый груз) — это же станет цветовой шкалой;
  · высота постройки = объём кода, форма = роль (башня, плита, площадка, руина, ворота);
  · ребро = реальный путь управления или данных, с payload'ом («что именно передаётся»)
    и ссылкой на строку, где это происходит;
  · флаг = риск, техдолг или расхождение с документацией, с объяснением последствий;
  · трассировка = именованный путь через граф (холодная загрузка, проход рендера,
    типичный запрос, выход наружу) с пошаговым комментарием.

ЭТАП 3 — СТРАНИЦА. Один самодостаточный HTML-файл, без внешних скриптов:
  · изометрическая проекция SVG: x = (gx − gy)·TW, y = (gx + gy)·TH − z;
    коробка = три полигона (верх светлее, правая грань средняя, передняя темнее);
  · панорама перетаскиванием, зум колесом, кнопка «вписать»;
  · левая панель: легенда слоёв с переключателями, легенда форм, легенда типов связей,
    список трассировок;
  · правая панель-объяснитель: по умолчанию «как читать карту» и главные находки,
    по клику на здание — досье с ролью, метриками, цитатами «файл:строка», флагами
    и списком входящих/исходящих связей;
  · анимированные частицы вдоль рёбер — это и есть payload'ы;
  · трассировка проигрывается по шагам и подсвечивает только свой подграф.

ЭТАП 4 — ПРОВЕРКА. Открой страницу в браузере, сделай скриншот, посмотри на него.
Почини наложения подписей, переполнение по горизонтали и ошибки в консоли. Повтори.

Пиши только то, что подтверждается кодом. Каждое утверждение на карте должно быть
проверяемо по указанной строке.
```

---

## English version

```
Build an interactive isometric map of <OWNER/REPO> at <BRANCH>.

PHASE 1 — SURVEY. Draw nothing until you have read the code. Collect: file tree with
sizes and line counts; the entry point and load order; every dependency (imports,
globals, script/link tags, API calls); external boundaries (domains, third-party
services, CDNs, datastores); deploy and infra config; dead weight (files with zero
inbound references, duplicates, stray artifacts); and every place the docs and the code
disagree. Keep a file:line address for each fact. Invent nothing — if a link is not in
the code, it is not on the map.

PHASE 2 — MODEL. Turn the survey into nodes and edges. A node is a file, module, store,
external service or mount point; its layer is its role (delivery, document, runtime,
data, assets, external, docs, dead weight) and drives the color scale. Building height
is code volume, shape is role (tower, slab, pad, ruin, gate). An edge is a real control
or data path carrying a named payload and a line citation. A flag is a risk, a piece of
debt, or a doc/code drift, with its consequence spelled out. A trace is a named walk
through the graph (cold load, render pass, typical request, exit path) narrated step by
step.

PHASE 3 — PAGE. One self-contained HTML file, no external scripts. Isometric SVG
projection: x = (gx − gy)·TW, y = (gx + gy)·TH − z; each box is three polygons (light
top, mid right face, dark front face). Drag to pan, wheel to zoom, a fit button. Left
rail: layer legend with toggles, shape legend, edge-type legend, trace list. Right rail:
an explainer that defaults to "how to read this map" plus the headline findings, and
switches to a dossier — role, metrics, file:line citations, flags, inbound and outbound
links — when a building is clicked. Animated particles along the edges are the payloads.
A trace plays step by step and lights only its own subgraph.

PHASE 4 — VERIFY. Open the page in a browser, screenshot it, and look at the screenshot.
Fix label collisions, horizontal overflow and console errors. Repeat.

Claim only what the code supports. Every statement on the map must be checkable at the
line you cite.
```

---

## Что ломается чаще всего

Четыре грабли, на которые наступает почти каждая первая попытка — они уже учтены
в `index.html`, но если строишь заново, проверь их отдельно.

| Симптом | Причина | Решение |
|---|---|---|
| Карта — крошечный островок посреди пустого экрана | «Вписать» считает габариты вместе с чертёжной сеткой, которая нарочно шире содержимого | Считать габариты только по слоям построек и связей |
| Подписи нечитаемы при отдалении | Текст масштабируется вместе со сценой | Контрмасштаб `scale(0.92 / k)` вокруг якоря подписи — экранный кегль остаётся постоянным |
| Подписи наезжают друг на друга | Контрмасштаб держит подписи одного размера, а расстояния между зданиями при отдалении сжимаются | Уровень детализации: ранг 1 виден всегда, остальное — только при `k ≥ 0.42`. Плюс тёмный контур (`paint-order: stroke fill`) |
| Горизонтальный скролл на телефоне | У грид-элемента `min-width: auto`, и самый широкий потомок раздувает колонку | `.shell > * { min-width: 0 }` |

Расстояния разносите **в экранных координатах**, а не в координатах сетки: в изометрии
шаг `+1` по `gx` и `+1` по `gy` даёт нулевое смещение по горизонтали, поэтому диагональ
из узлов схлопывается в одну вертикальную колонку.
