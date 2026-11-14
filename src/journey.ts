/**
 * The journey film in the hero, and what the hero says during each chapter.
 *
 * The film is an honest screen recording with no text burned in; the page
 * narrates it. Each chapter has a headline in the hero's two-tone style:
 * `open` is set in dim italic, `close` in upright ink, and the word in
 * [brackets] gets the reader's highlight, drawn as the chapter begins. The
 * first chapter's headline is the page's own h1.
 *
 * Each chapter's `start` is where it begins in the film, in seconds. The film
 * is cut from the raw recordings by scripts/cut-journey.py, which prints these
 * times. The raw clips are not committed; see recordings/raw/SHOTS.md on the
 * machine that has them.
 */

export const FILM = {
  src: "/videos/journey.mp4",
  poster: "/videos/journey-poster.webp",
};

export const CHAPTERS = [
  {
    word: "Curiosity",
    open: "A sanctuary for your [curiosity],",
    close: "and a companion to help you grow from it.",
    start: 0,
  },
  {
    word: "Explore",
    open: "You listen to a podcast",
    close: "and [highlight] a line that stays with you.",
    start: 9.03,
  },
  {
    word: "Learn",
    open: "You ask Samwell how it applies to your life.",
    close: "He answers with your [situation] in mind.",
    start: 23.33,
  },
  {
    word: "Apply",
    open: "You ask Samwell to make it a goal.",
    close: "He sets it up as a [plan] you can follow.",
    start: 37.83,
  },
  {
    word: "Grow",
    open: "Five weeks later, you look back.",
    close: "Samwell [finds] the line that got you started.",
    start: 59.03,
  },
] as const;

/** Splits "a [word] b" into text and highlighted parts, for rendering. */
export function marked(text: string) {
  return text
    .split(/(\[[^\]]+\])/)
    .filter(Boolean)
    .map((part) =>
      part.startsWith("[")
        ? { text: part.slice(1, -1), hl: true }
        : { text: part, hl: false },
    );
}
