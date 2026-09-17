# Screenshots

The `.webp` files here are what the site ships and what the components import.
They are made from the unframed captures in the `store-screenshots` project
(`raw/android/*.png`: Android, 1080x2400, light theme). The originals
live there, not here. The framed `out/` images already carry a parchment canvas
and a caption, which would double up with the site's own plates and headings.

No plate on the site is ever displayed wider than ~264 CSS px, so each shot is
downscaled to 520 px wide, which still covers the largest use at 2x.

Regenerate after replacing an original (needs `cwebp`, from `brew install webp`):

```sh
cd src/assets/screenshots
for n in 01-reader 02-plan 04-log-deck 05-planner 06-checkin 07-insights 10-takeaway; do
  cwebp -q 80 -m 6 -resize 520 0 \
    ~/Self-Improvement-Garage/store-screenshots/raw/android/$n.png -o light/$n.webp
done
```

That keeps the set under 300 KB. We deliberately avoid `astro:assets` `<Image>`
here so the build does not need Sharp; the components read `.src`, `.width`,
and `.height` off the imported metadata instead.

The shots show staged demo data (the "Marcus" persona), not a real person's
account. Copy that quotes them must not claim otherwise.

## Light and dark

The site used to pair shots on purpose: the light screenshot on the dark ground
and the dark screenshot on the light ground, so a plate always contrasts the
page it sits on (`.shot-on-dark` / `.shot-on-light` in
`src/styles/global.css`).

Only light captures exist for the current set, so each plate shows its light
shot in both themes. To restore the pairing, capture the same screens in dark
mode, convert them into `dark/` with the same names, and render both `<img>`
elements with those two classes again.
