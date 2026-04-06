#!/usr/bin/env python3
"""Download Yola image assets listed in content/image-source-map.csv.

Usage:
  python scripts/download_yola_assets.py
  python scripts/download_yola_assets.py --csv content/image-source-map.csv --out content/assets/images
"""

from __future__ import annotations

import argparse
import csv
import pathlib
import urllib.parse
import urllib.request


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--csv", default="content/image-source-map.csv", dest="csv_path")
    parser.add_argument("--out", default="content/assets/images", dest="out_dir")
    parser.add_argument("--timeout", type=float, default=30.0)
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    csv_path = pathlib.Path(args.csv_path)
    out_dir = pathlib.Path(args.out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    with csv_path.open(newline="", encoding="utf-8") as f:
        rows = list(csv.DictReader(f))

    for row in rows:
        image_id = row["image_id"]
        url = row["source_url"]
        if not url:
            print(f"skip {image_id}: missing URL")
            continue

        file_name = pathlib.Path(urllib.parse.urlparse(url).path).name
        if not file_name:
            file_name = f"image_{image_id}"
        destination = out_dir / f"{int(image_id):02d}_{file_name}"

        try:
            urllib.request.urlretrieve(url, destination)
            print(f"ok   {image_id}: {destination}")
        except Exception as exc:  # noqa: BLE001
            print(f"fail {image_id}: {url} ({exc})")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
