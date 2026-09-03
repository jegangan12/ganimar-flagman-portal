#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Генератор sitemap.xml и feed.xml для статического сайта.

Как работает: обходит все .html в корне проекта (кроме служебных),
вытаскивает canonical / title / description / дату публикации
и собирает из этого карту сайта и RSS-фид.

Запуск:  python3 tools/seo_build.py
Настройка: блок CONFIG ниже — единственное, что меняется под другой домен.
"""

import os
import re
import sys
import html
from datetime import datetime, timezone

# ----------------------------- CONFIG ---------------------------------------
SITE_URL = "https://ganimar.ru"
SITE_TITLE = "Блог GANIMAR"
SITE_DESC = ("Практические разборы по системному маркетингу, сквозной аналитике, "
             "мультиагентным AI-системам и автоматизации продаж")
BLOG_DIR = "blog"          # папка со статьями (попадают в RSS)
EXCLUDE = {"404.html"}     # файлы, которые не индексируются
# ----------------------------------------------------------------------------

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# приоритеты и частота обхода по типу страницы
RULES = [
    (lambda u: u == SITE_URL + "/", "1.0", "weekly"),
    (lambda u: u == SITE_URL + "/blog", "0.9", "weekly"),
    (lambda u: "/blog/" in u, "0.8", "monthly"),
]


def meta(pattern, source):
    m = re.search(pattern, source, re.I | re.S)
    return html.unescape(m.group(1).strip()) if m else ""


def collect():
    pages = []
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames
                       if d not in {".git", "node_modules", "assets", "css", "js", "tools", "seo-kit", "docs"}]
        for name in sorted(filenames):
            if not name.endswith(".html") or name in EXCLUDE:
                continue
            path = os.path.join(dirpath, name)
            rel = os.path.relpath(path, ROOT).replace(os.sep, "/")
            src = open(path, encoding="utf-8").read()

            if re.search(r'<meta[^>]+name=["\']robots["\'][^>]*noindex', src, re.I):
                continue

            canonical = meta(r'<link[^>]+rel=["\']canonical["\'][^>]+href=["\']([^"\']+)', src)
            if not canonical:
                slug = "" if rel == "index.html" else rel[:-len(".html")]
                slug = slug[:-len("/index")] if slug.endswith("/index") else slug
                canonical = SITE_URL + "/" + slug if slug else SITE_URL + "/"

            published = meta(r'<meta[^>]+property=["\']article:published_time["\'][^>]+content=["\']([^"\']+)', src)
            mtime = datetime.fromtimestamp(os.path.getmtime(path), tz=timezone.utc)
            lastmod = published or mtime.strftime("%Y-%m-%d")

            pages.append({
                "rel": rel,
                "url": canonical,
                "title": meta(r"<title>(.*?)</title>", src),
                "desc": meta(r'<meta[^>]+name=["\']description["\'][^>]+content=["\']([^"\']+)', src),
                "lastmod": lastmod,
                "published": published,
                "is_post": rel.startswith(BLOG_DIR + "/") and not rel.endswith("index.html"),
            })
    return pages


def esc(text):
    return html.escape(text, quote=False)


def rfc822(date_str):
    try:
        dt = datetime.strptime(date_str[:10], "%Y-%m-%d").replace(tzinfo=timezone.utc)
    except ValueError:
        dt = datetime.now(timezone.utc)
    days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
              "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return "%s, %02d %s %d 00:00:00 +0000" % (
        days[dt.weekday()], dt.day, months[dt.month - 1], dt.year)


def write_sitemap(pages):
    lines = ['<?xml version="1.0" encoding="UTF-8"?>',
             '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for p in sorted(pages, key=lambda x: x["url"]):
        priority, freq = "0.5", "monthly"
        for match, pr, fr in RULES:
            if match(p["url"]):
                priority, freq = pr, fr
                break
        lines += ["  <url>",
                  "    <loc>%s</loc>" % esc(p["url"]),
                  "    <lastmod>%s</lastmod>" % p["lastmod"][:10],
                  "    <changefreq>%s</changefreq>" % freq,
                  "    <priority>%s</priority>" % priority,
                  "  </url>"]
    lines.append("</urlset>")
    out = "\n".join(lines) + "\n"
    open(os.path.join(ROOT, "sitemap.xml"), "w", encoding="utf-8").write(out)
    return out


def write_feed(pages):
    posts = sorted([p for p in pages if p["is_post"]],
                   key=lambda x: x["lastmod"], reverse=True)
    now = rfc822(datetime.now(timezone.utc).strftime("%Y-%m-%d"))
    lines = ['<?xml version="1.0" encoding="UTF-8"?>',
             '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
             "  <channel>",
             "    <title>%s</title>" % esc(SITE_TITLE),
             "    <link>%s/blog</link>" % SITE_URL,
             "    <description>%s</description>" % esc(SITE_DESC),
             "    <language>ru</language>",
             "    <lastBuildDate>%s</lastBuildDate>" % now,
             '    <atom:link href="%s/feed.xml" rel="self" type="application/rss+xml" />' % SITE_URL]
    for p in posts:
        lines += ["    <item>",
                  "      <title>%s</title>" % esc(p["title"].split(" | ")[0]),
                  "      <link>%s</link>" % esc(p["url"]),
                  "      <guid isPermaLink=\"true\">%s</guid>" % esc(p["url"]),
                  "      <description>%s</description>" % esc(p["desc"]),
                  "      <pubDate>%s</pubDate>" % rfc822(p["lastmod"]),
                  "    </item>"]
    lines += ["  </channel>", "</rss>"]
    out = "\n".join(lines) + "\n"
    open(os.path.join(ROOT, "feed.xml"), "w", encoding="utf-8").write(out)
    return posts


def main():
    pages = collect()
    if not pages:
        print("Не найдено ни одной страницы — проверь путь запуска")
        return 1
    write_sitemap(pages)
    posts = write_feed(pages)
    print("sitemap.xml: %d URL" % len(pages))
    print("feed.xml: %d публикаций" % len(posts))
    for p in sorted(pages, key=lambda x: x["url"]):
        print("  ", p["url"])
    return 0


if __name__ == "__main__":
    sys.exit(main())
