# Screenshots

The `.png` files are the originals captured from the device. The `.webp` files
are what the site actually ships, and are what the components import.

The originals are ~1380x2956 and about 13 MB in total, but no plate on the site
is ever displayed wider than ~264 CSS px. Serving them unresized was the single
biggest weight on the page, so they are downscaled to 520 px wide, which still
covers the largest use at 2x.

Regenerate after replacing an original (needs ImageMagick):

```sh
cd src/assets/screenshots
for f in light/*.png dark/*.png; do
  convert "$f" -resize 520x -quality 80 -define webp:method=6 "${f%.png}.webp"
done
```

That keeps the set at roughly 400 KB total. We deliberately avoid `astro:assets`
`<Image>` here so the build does not need Sharp; the components read `.src`,
`.width`, and `.height` off the imported metadata instead.

Light and dark are paired on purpose: the site shows the light screenshot on the
dark ground and the dark screenshot on the light ground, so a plate always
contrasts the page it sits on. See `.shot-on-dark` / `.shot-on-light` in
`src/styles/global.css`.
