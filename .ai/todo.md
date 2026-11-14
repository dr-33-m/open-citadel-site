# Landing page: two sections, narrated by the film

## Concept
One idea: the app's reader highlight. The hero highlights "curiosity" as you
arrive, the film shows a line highlighted in a podcast coming back five weeks
later, and the close highlights "make it real". Gold means one thing: how far
into the journey the film is.

- **Hero** (`src/components/landing/Hero.astro`): text left, phone right. The
  headline narrates the film, one plain-English line per chapter
  (Curiosity, Explore, Learn, Apply, Grow), with story bars under the subtext.
- **Phones**: the same hero, plus a full-screen story viewer
  (`StoryViewer.astro`) where the film plays at true size; tap, hold and
  swipe like stories, ending on the close.
- **Close** (`Close.astro`): "Expand what is possible. Then make it real." and
  the two stores.

Chapter copy and timings live in `src/journey.ts`. The film is cut from the
raw recordings by `scripts/cut-journey.py` (raw clips are not committed).

## Done
- [x] Record the journey on the emulator (light mode, staged demo persona)
- [x] Cut the film, timings in `src/journey.ts`
- [x] Hero, story viewer, close; light by default
- [x] Remove the book-mode page and its CSS; inner pages verified unchanged
- [x] Privacy policy updated for the November release (`PRIVACY-UPDATE.md`
      in the app repo)

## Open
- [ ] App bug seen in the footage: a raw `[[ref highlight …]]` token streams
      into Samwell's reply before the highlight card replaces it
- [ ] Optional ending shot: Samwell's memory portrait, once his journal has
      caught up
- [ ] Store privacy forms (App Store, Play) to match the new policy
- [ ] Confirm whether Logto is self-hosted, and say so in the policy
