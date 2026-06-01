#!/usr/bin/env bash
set -euo pipefail

if ! command -v cwebp >/dev/null 2>&1; then
  echo "Error: cwebp is required. Install libwebp-tools." >&2
  exit 1
fi

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIR="$ROOT/public/projects"

shopt -s nullglob
files=("$DIR"/*-preview.png)

if [ ${#files[@]} -eq 0 ]; then
  echo "No *-preview.png files in $DIR"
  exit 0
fi

for png in "${files[@]}"; do
  webp="${png%.png}.webp"
  echo "Converting $(basename "$png") -> $(basename "$webp")"
  cwebp -lossless "$png" -o "$webp"
done

echo "Done. ${#files[@]} file(s) converted."
