# ganimar.ru - личный сайт Евгения Ганимара

Статический сайт: главная + блог. Прод - https://ganimar.ru (Vercel, проект
`ganimar-flagman-antigravity-20260909`). Единственная рабочая база сайта - этот репозиторий,
альтернативная версия отклонена владельцем 09.09.2026.

## Карта проекта

| Что | Где |
|---|---|
| Проверенное состояние, следующий шаг, открытые вопросы | `CURRENT_STATE.md` |
| Решения по сайту с датами | `decisions.md` |
| Бэклог и идеи | `ideas.md` |
| Итоги аудитов и вопросы владельцу | `docs/AUDIT-2026-09-10.md` |
| Главная | `index.html` + `js/data.js` (карточки) + `js/app.js` (рендер) + `css/styles.css` |
| Блог | `blog/*.html` статикой ради индексации, стили `css/blog.css` |
| Обложки и превью | `assets/previews/` - только реальные экраны продуктов или отрисованные обложки фактов |
| Контентное ядро блога (36 тем) | `content/Ядро-статей-ganimar.ru-2026-09-03.md` |
| Материалы для VC.ru | `content/vc-ru/` |
| Сборка sitemap и feed | `python3 tools/seo_build.py` |
| IndexNow-пинг | `bash tools/indexnow.sh` (без аргументов - все URL из sitemap) |
| Скриншоты приёмки | `screenshots/` |
| Историческое ТЗ Antigravity | `docs/SPEC.md` - не источник актуального состояния |

## Правила, которые здесь действуют

- Цифры и регалии - только из `~/ai-clone-workspace/ai-clone/identity/facts.md`. Нет там - на сайт не идёт
- Без точек в конце одиночных фраз интерфейса, без длинных тире - только дефис
- В русском тексте «ИИ», «AI» только внутри имён собственных
- Превью продуктов - реальные экраны. Картинки с устаревшими цифрами не возвращать
- Год в подвале - скриптом `js/year.js`, не руками
- Content-Security-Policy без `unsafe-inline`: стили в CSS-классах, скрипты в файлах, `onclick` не используется
- На прод не едут `docs/`, `content/`, `seo-kit/`, `tools/`, `screenshots/`, `CURRENT_STATE.md`, `README.md` - см. `.vercelignore`

## Запуск и проверка

```bash
python3 -m http.server 8099 --bind 127.0.0.1      # локально: http://127.0.0.1:8099/
node --check js/app.js && node --check js/data.js   # синтаксис
python3 tools/seo_build.py                          # пересобрать sitemap.xml и feed.xml
```

Приёмка перед выкатом - рендер в headless Chrome на 390, 768, 1280, 1680: горизонтального
переполнения нет, консоль чистая, картинки грузятся. Порядок в `CURRENT_STATE.md`.

## Выкат

```bash
git push origin master
vercel deploy --prod --yes
bash tools/indexnow.sh
```

Свойство прода: после ~35 быстрых запросов с одного IP Vercel отдаёт 403
`x-vercel-mitigated: challenge` на все проекты аккаунта. Для посетителей сайт открыт; автоматические
проверки делать редко или с другого адреса.
