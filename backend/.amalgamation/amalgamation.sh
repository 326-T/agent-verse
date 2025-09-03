#!/bin/sh

# ファイル名の一覧を出力
find . \
  \( \
    -path "./.venv" \
    -o -path "./__pycache__" \
    -o -path "./amalgamation" \
  \) -prune -o \
  -type f -name "*.py" -print \
  | sort > amalgamation/filelist.txt

# 全ファイルを結合
limit=100
count=0

while IFS= read -r f; do
  count=$((count + 1))
  [ "$count" -gt "$limit" ] && break

  echo "# ===== File: $f ====="
  cat "$f"
  echo
done < amalgamation/filelist.txt > amalgamation/all_in_one.py
