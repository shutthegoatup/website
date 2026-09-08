#!/usr/bin/env bash
# Screenshots the built site with entrance animations neutralised, so captures
# show the settled page rather than whatever frame the renderer caught.
set -euo pipefail

root=$(cd "$(dirname "$0")/.." && pwd)
page=${1:-index}
width=${2:-1440}
height=${3:-7400}
out=${4:-$root/capture.png}
port=${CAPTURE_PORT:-4399}

src="$root/dist/$page.html"
tmp="$root/dist/__capture.html"

kill_motion='<style>*,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important;transition:none!important}.reveal{opacity:1!important;transform:none!important}.redact__bar{transform:scaleX(1)!important}</style></head>'
sed "s#</head>#${kill_motion}#" "$src" > "$tmp"

python3 -m http.server "$port" --directory "$root/dist" --bind 127.0.0.1 >/dev/null 2>&1 &
server=$!
cleanup() {
  kill "$server" 2>/dev/null || true
  rm -f "$tmp"
}
trap cleanup EXIT

for _ in $(seq 1 40); do
  curl -sf -o /dev/null "http://127.0.0.1:$port/__capture.html" && break
  sleep 0.15
done

chromium --headless --no-sandbox --disable-gpu --hide-scrollbars \
  --virtual-time-budget=8000 \
  --window-size="$width,$height" \
  --screenshot="$out" "http://127.0.0.1:$port/__capture.html" 2>/dev/null

echo "$out"
