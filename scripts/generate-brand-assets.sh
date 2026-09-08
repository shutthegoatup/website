#!/usr/bin/env bash
# Rasterises the brand masters into the favicon / avatar / social pack.
# Requires: rsvg-convert (librsvg), magick (ImageMagick 7), chromium.
set -euo pipefail

root=$(cd "$(dirname "$0")/.." && pwd)
brand="$root/brand"
out="$root/public"
kit="$out/brand"
work=$(mktemp -d)
trap 'rm -rf "$work"' EXIT

mkdir -p "$kit"

png() { rsvg-convert -w "$2" -h "$2" "$1" -o "$3"; }

shot() {
  chromium --headless --no-sandbox --disable-gpu --hide-scrollbars \
    --force-device-scale-factor="${4:-1}" \
    --default-background-color=00000000 \
    --virtual-time-budget=4000 \
    --window-size="$2,$3" \
    --screenshot="$5" "file://$1" 2>/dev/null
}

# --- Favicons ---------------------------------------------------------------
# The badge (solid ground) holds up far better than the bare mark below 48px.
cp "$brand/mark.svg" "$out/icon.svg"
png "$brand/badge.svg" 16 "$work/icon-16.png"
png "$brand/badge.svg" 32 "$work/icon-32.png"
png "$brand/badge.svg" 48 "$work/icon-48.png"
magick "$work/icon-16.png" "$work/icon-32.png" "$work/icon-48.png" "$out/favicon.ico"
png "$brand/badge.svg" 180 "$out/apple-touch-icon.png"
png "$brand/badge.svg" 192 "$out/icon-192.png"
png "$brand/badge.svg" 512 "$out/icon-512.png"

# Android masks icons to a circle: keep the mark inside a 60% safe zone.
rsvg-convert -w 300 -h 300 "$brand/mark-bone.svg" -o "$work/maskable.png"
magick "$work/maskable.png" -background "#0F0E0C" -gravity center \
  -extent 512x512 "$out/icon-maskable-512.png"

# --- Avatars for GitHub / GitLab / LinkedIn ---------------------------------
png "$brand/badge.svg" 400 "$kit/avatar-400.png"
png "$brand/badge.svg" 1000 "$kit/avatar-1000.png"

# --- Vector masters for designers ------------------------------------------
for f in mark mark-bone mark-simple badge; do
  cp "$brand/$f.svg" "$kit/$f.svg"
done

# --- Lockups and social card (webfont text, so rendered in Chromium) -------
shot "$brand/render/lockup.html" 1400 340 3 "$work/lockup.png"
magick "$work/lockup.png" -trim +repage -bordercolor none -border 40 \
  "$kit/lockup-ink.png"
magick "$kit/lockup-ink.png" -resize 1200x "$kit/lockup-ink-1200.png"

shot "$brand/render/og.html" 1200 630 2 "$work/og.png"
magick "$work/og.png" -resize 1200x630 "$out/og.png"

echo "Brand pack written:"
echo "  $out  — favicon.ico, icon.svg, icon-*.png, apple-touch-icon.png, og.png"
echo "  $kit  — avatars, lockups, vector masters"
