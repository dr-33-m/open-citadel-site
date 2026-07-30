# Landing page rebuild: "the page is a book"

Approved design: https://claude.ai/code/artifact/702b7898-3605-462e-8ccb-f8290f58f112

## Concept
The page is a short book wearing the app's own chrome. Desktop: one vertical
scroll with a running head (`PROGRESS %`, quoting the app's book cards) and a
bottom tab bar with the app's gold active underline. Mobile: five swipeable
leaves with a running foot. Body copy is serif at book measure; Manrope is
demoted to a utility layer (labels, tabs, meta).

## Tasks
- [x] Read existing site structure, confirm inner pages must not inherit book mode
- [x] `src/consts.ts` with PLAY_STORE_URL placeholder + shared links
- [x] `global.css`: alias mockup token names to existing `--color-*` tokens so the
      light theme keeps working; add plate / letter / steps / pager / book-mode CSS
- [x] `Layout.astro`: `bookMode` prop, adds `class="book"` on `<html>` (home only)
- [x] `Nav.astro` -> running head (brand, progress meter, theme, CTA, menu)
- [x] `Frontispiece.astro` (replaces Hero) with name field + frontispiece plate
- [x] `Becoming.astro` (replaces Quote) with interactive highlights + timeline rail
- [x] `HowItWorks.astro` + `Samwell.astro` (replace Features)
- [x] `Begin.astro` (replaces CrossPlatform) + `Imprint.astro`
- [x] `Footer.astro` -> wraps Imprint, for inner pages only
- [x] `BookChrome.astro`: desktop tabs, mobile pager, page turning, reveals
- [x] Update `index.astro`; delete Hero/Features/CrossPlatform/Quote
- [x] Verify: build, both themes, book paging, name field, privacy/support intact

## Key constraint
Book mode is scoped under `html.book`. `privacy.astro` and `support.astro` must
keep normal vertical scrolling, so they never receive the class.

## Review
Ported the approved artifact into Astro components. Book mode is opt-in per page
via `Layout`'s `bookMode` prop, so only the home page becomes a swipeable book;
privacy and support keep normal vertical scroll and were verified unchanged.
Token aliases (`--bg`, `--text`, `--gold`, ...) point at the existing
`--color-*` Tailwind theme tokens, so the established `data-theme="light"`
override drives the new CSS with no duplicated palette. `PLAY_STORE_URL` is a
single placeholder constant in `src/consts.ts`, referenced by every CTA.

Verified with a headless browser against the production build: 5 leaves each
exactly one viewport wide, paging correct both directions, name field never
clips across 5 viewports x 4 name lengths, desktop three-column ascent intact,
zero horizontal overflow on any page, and privacy/support still scroll normally
with no pager.
