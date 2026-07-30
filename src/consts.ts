/**
 * Shared links and identity.
 *
 * PLAY_STORE_URL is a placeholder until the Google Play listing is live.
 * TODO(launch): replace with the real
 * https://play.google.com/store/apps/details?id=... URL. Every CTA on the site
 * reads from this one constant, so it is a single-line change.
 */
export const PLAY_STORE_URL = "#";

/** True once PLAY_STORE_URL points at a real listing. Drives link targets. */
export const PLAY_STORE_LIVE = PLAY_STORE_URL !== "#";

export const GITHUB_URL = "https://github.com/dr-33-m/open-citadel";

export const CONTACT_EMAIL = "thamsanqa.dev@gmail.com";

/**
 * iOS notify path. Apple approval is expected about a week after Google.
 * TODO(launch): swap for the App Store URL once the app is approved.
 */
export const IOS_NOTIFY_URL =
  `mailto:${CONTACT_EMAIL}` +
  "?subject=iOS%20Waitlist%20-%20Notify%20Me" +
  "&body=Hi%2C%20I%27d%20like%20to%20be%20notified%20when%20Open%20Citadel%20is%20available%20on%20iOS.";

/** The author's public name. The legal name is used on the privacy page. */
export const AUTHOR_NAME = "Thamsanqa Dreem";

/** The leaves of the book, in order. Drives the desktop tabs and mobile pager. */
export const LEAVES = [
  { id: "front", tab: "Frontispiece", leaf: "Frontispiece" },
  { id: "becoming", tab: "Becoming", leaf: "I · Becoming" },
  { id: "loop", tab: "How", leaf: "II · How It Works" },
  { id: "samwell", tab: "Samwell", leaf: "III · Samwell" },
  { id: "acquire", tab: "Begin", leaf: "IV · Begin" },
] as const;
