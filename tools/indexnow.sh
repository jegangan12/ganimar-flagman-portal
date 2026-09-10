#!/usr/bin/env bash
# Пинг IndexNow: мгновенно сообщает Яндексу и Bing о новых или обновлённых страницах.
# Использование: tools/indexnow.sh https://ganimar.ru/blog/novaya-statya [ещё-url ...]
# Без аргументов отправляет все URL из sitemap.xml.
set -euo pipefail

HOST="ganimar.ru"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
KEY_FILE="$(cd "$ROOT" && ls -1 [0-9a-f]*.txt 2>/dev/null | head -n1 || true)"

if [ -z "${KEY_FILE:-}" ]; then
  echo "Не найден ключ IndexNow (файл вида <ключ>.txt в корне)" >&2
  exit 1
fi
KEY="${KEY_FILE%.txt}"

if [ "$#" -gt 0 ]; then
  URLS=("$@")
else
  URLS=()
  while IFS= read -r line; do
    [ -n "$line" ] && URLS+=("$line")
  done < <(grep -o '<loc>[^<]*' "$ROOT/sitemap.xml" | sed 's/<loc>//')
fi

LIST=$(printf '"%s",' "${URLS[@]}" | sed 's/,$//')
PAYLOAD=$(printf '{"host":"%s","key":"%s","keyLocation":"https://%s/%s","urlList":[%s]}' \
  "$HOST" "$KEY" "$HOST" "$KEY_FILE" "$LIST")

echo "Отправляю ${#URLS[@]} URL в IndexNow..."
curl -sS -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "$PAYLOAD" -w "\nHTTP %{http_code}\n"
