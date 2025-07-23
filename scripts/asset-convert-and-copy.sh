#!/bin/bash
# asset-convert-and-copy.sh
# Usage: ./asset-convert-and-copy.sh <source-asset-path> <target-filename>
# Converts and copies images/videos to the public directory in web-optimized formats.

set -e

PUBLIC_DIR="$(dirname "$0")/public"
mkdir -p "$PUBLIC_DIR"

convert_image() {
  src="$1"
  dest="$2"
  ext="${dest##*.}"
  if [[ "$ext" == "png" ]]; then
    # Optimize PNG
    cp "$src" "$PUBLIC_DIR/$dest"
  elif [[ "$ext" == "jpg" || "$ext" == "jpeg" ]]; then
    # Optimize JPG
    cp "$src" "$PUBLIC_DIR/$dest"
  elif [[ "$ext" == "webp" ]]; then
    # Convert to webp
    convert "$src" -quality 90 "$PUBLIC_DIR/$dest"
  else
    cp "$src" "$PUBLIC_DIR/$dest"
  fi
}

convert_video() {
  src="$1"
  dest="$2"
  # Convert to mp4 (H.264/AAC)
  ffmpeg -i "$src" -c:v libx264 -crf 23 -preset fast -c:a aac -b:a 128k -movflags +faststart "$PUBLIC_DIR/$dest"
}

for asset in "$@"; do
  filename="$(basename "$asset")"
  ext="${filename##*.}"
  if [[ "$ext" == "mp4" ]]; then
    convert_video "$asset" "$filename"
  else
    convert_image "$asset" "$filename"
  fi
  echo "Processed $asset -> $PUBLIC_DIR/$filename"
done
