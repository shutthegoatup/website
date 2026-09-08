#!/usr/bin/env bash
# Renders an SVG at display / 32px / 16px onto the bone ground for legibility checks.
set -euo pipefail

src=$1
out=$2
bg=${3:-#F2EFE6}
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

rsvg-convert -w 512 -h 512 -b "$bg" "$src" -o "$tmp/big.png"
rsvg-convert -w 32 -h 32 -b "$bg" "$src" -o "$tmp/s32.png"
rsvg-convert -w 16 -h 16 -b "$bg" "$src" -o "$tmp/s16.png"
magick "$tmp/s32.png" -scale 512x512 "$tmp/s32b.png"
magick "$tmp/s16.png" -scale 512x512 "$tmp/s16b.png"
magick "$tmp/big.png" "$tmp/s32b.png" "$tmp/s16b.png" +append "$out"
