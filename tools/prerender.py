#!/usr/bin/env python3
"""Вшивает в index.html то, что рисует app.js из data.js.

Зачем: шесть секций главной (экосистема, поддомены, цифры, кейсы, продукты,
соцсети) собирались только в браузере. Робот поисковика видел пустые
контейнеры - около 40% содержимого страницы не существовало для поиска.

Как: поднимаем локальный сервер, открываем главную в Chrome, ждём отрисовку,
забираем innerHTML каждого контейнера и кладём его в тот же контейнер в файле.
JS при загрузке перезапишет их тем же самым - для человека ничего не меняется.

Запускать после каждой правки js/data.js, до деплоя:
    python3 tools/prerender.py

Требуется: pip install playwright && playwright install chromium
"""
import asyncio
import http.server
import re
import socket
import socketserver
import threading
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
INDEX = ROOT / "index.html"

# Контейнеры, которые наполняет app.js. Порядок не важен.
CONTAINERS = [
    "branches-grid",
    "subdomains-grid",
    "stats-grid",
    "cases-grid",
    "products-grid",
    "eco-extra",
    "socials-row",
]


def free_port():
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


def serve(port):
    handler = lambda *a, **kw: http.server.SimpleHTTPRequestHandler(
        *a, directory=str(ROOT), **kw
    )
    httpd = socketserver.TCPServer(("127.0.0.1", port), handler)
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd


async def grab(port):
    from playwright.async_api import async_playwright

    async with async_playwright() as p:
        browser = await p.chromium.launch(channel="chrome")
        page = await browser.new_page(viewport={"width": 1280, "height": 900})
        await page.goto(f"http://127.0.0.1:{port}/", wait_until="networkidle")
        await page.wait_for_timeout(1500)
        result = {}
        for cid in CONTAINERS:
            html = await page.evaluate(
                "id => { const e = document.getElementById(id); return e ? e.innerHTML : null }",
                cid,
            )
            result[cid] = html
        await browser.close()
        return result


def inject(html, cid, inner):
    """Заменяет содержимое <... id="cid" ...>СТАРОЕ</...> на inner.

    Идём по символам от открывающего тега и считаем вложенность div,
    чтобы не оборваться на первом же </div> внутри содержимого.
    """
    m = re.search(r'<(\w+)([^>]*\sid="' + re.escape(cid) + r'")[^>]*>', html)
    if not m:
        return html, False
    tag = m.group(1)
    start = m.end()
    depth = 1
    pos = start
    pattern = re.compile(r"</?" + tag + r"\b", re.I)
    while depth and pos < len(html):
        t = pattern.search(html, pos)
        if not t:
            return html, False
        depth += -1 if html[t.start() + 1] == "/" else 1
        pos = t.end()
    end = html.rfind("</" + tag, start, pos)
    return html[:start] + inner + html[end:], True


def main():
    port = free_port()
    httpd = serve(port)
    try:
        grabbed = asyncio.run(grab(port))
    finally:
        httpd.shutdown()

    html = INDEX.read_text(encoding="utf-8")
    before = len(html)
    for cid, inner in grabbed.items():
        if not inner or not inner.strip():
            print(f"  {cid}: пусто в браузере - пропускаю")
            continue
        html, ok = inject(html, cid, "\n" + inner + "\n")
        print(f"  {cid}: {'вшито' if ok else 'КОНТЕЙНЕР НЕ НАЙДЕН'} ({len(inner)} знаков)")
    INDEX.write_text(html, encoding="utf-8")
    print(f"index.html: {before} -> {len(html)} байт")


if __name__ == "__main__":
    main()
