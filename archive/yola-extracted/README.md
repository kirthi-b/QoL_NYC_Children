# Urban Mobility Index Yola Preservation Notes

Source URL: https://urban-mobility-index.yolasite.com/
Capture date (UTC): 2026-04-06

## What was preserved

- Full text structure and body copy from the Yola page was transcribed into `content/presentation.md`.
- A complete placeholder list for image slots `[Image 0]` through `[Image 58]` was preserved in order so content references are not lost.
- **All 59 image source URLs** were extracted with a virtual browser viewer and recorded in `content/image-source-map.csv`.

## Extraction method used

Because direct shell HTTP(S) access to yolasite.com is blocked in this environment by proxy `403 Forbidden`, we used a virtual browser viewer workflow (clicking each rendered image element in the page) to retrieve source asset URLs.

## Environment limitation encountered (shell networking)

Direct binary mirroring with `wget --mirror` could not be completed in this environment.

### Commands attempted

```bash
wget --mirror --convert-links --adjust-extension --page-requisites --no-parent --domains urban-mobility-index.yolasite.com -P archive/yola-raw/<timestamp> https://urban-mobility-index.yolasite.com/
wget --mirror --convert-links --adjust-extension --page-requisites --no-parent --domains urban-mobility-index.yolasite.com -P archive/yola-raw/<timestamp> http://urban-mobility-index.yolasite.com/
curl -I --max-time 20 https://urban-mobility-index.yolasite.com/
curl -I --max-time 20 'https://urban-mobility-index.yolasite.com/ws/media-library/0328b5f12940492c8e48859fcddad214/why-mobility.png'
```

## Next step to fully vendor assets into repo

Run this from a machine with direct internet access, then move files into `content/assets/images/`:

```bash
wget --input-file <(cut -d, -f2 content/image-source-map.csv | tail -n +2) \
  --directory-prefix content/assets/images \
  --content-disposition
```
