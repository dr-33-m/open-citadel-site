/**
 * Shared links and identity.
 */

/** The Play Store package name. */
export const ANDROID_PACKAGE = "com.dr33m.opencitadel";

/**
 * Attribution for installs that start on this site.
 *
 * Note this is `referrer`, not the `pcampaignid=web_share` that Play's share
 * sheet appends. `pcampaignid` is Google's own internal parameter and only
 * recognises values Google issues, so a custom string there is silently
 * dropped. `referrer` is the documented hook for third party sites: Play
 * Console parses these utm_* keys into its acquisition reports, and the Install
 * Referrer API hands the same string to the app on first launch.
 *
 * The whole value is one encoded query string, so its own separators are
 * escaped (%3D for `=`, %26 for `&`).
 */
const PLAY_REFERRER = encodeURIComponent(
  "utm_source=open-citadel-site&utm_medium=web&utm_campaign=launch",
);

/** Every Android CTA on the site reads from this one constant. */
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details" +
  `?id=${ANDROID_PACKAGE}` +
  `&referrer=${PLAY_REFERRER}`;

/** True once PLAY_STORE_URL points at a real listing. Drives link targets. */
export const PLAY_STORE_LIVE = PLAY_STORE_URL !== "#";

export const GITHUB_URL = "https://github.com/dr-33-m/open-citadel";

export const CONTACT_EMAIL = "thamsanqa.dev@gmail.com";

/**
 * The App Store listing.
 *
 * TODO(ios): paste the https://apps.apple.com/... URL here, and that is the
 * whole job. Everything the iOS state touches switches off IOS_LIVE below: the
 * Begin chapter's sentence, the row's label, and its tag all swap from waitlist
 * wording to download wording. Nothing else needs editing.
 */
export const APP_STORE_URL = "#";

/** True once APP_STORE_URL points at a real listing. */
export const IOS_LIVE = APP_STORE_URL !== "#";

/**
 * Where the iOS row points until the listing appears. Apple has approved the
 * release, so this is a short gap rather than an open ended one.
 */
export const IOS_WAITLIST_URL =
  `mailto:${CONTACT_EMAIL}` +
  "?subject=Join%20the%20iOS%20waitlist" +
  "&body=Hi%2C%20please%20add%20me%20to%20the%20waitlist%20and%20let%20me%20know%20when%20Open%20Citadel%20is%20available%20on%20iOS.";

/** The author's public name. The legal name is used on the privacy page. */
export const AUTHOR_NAME = "Thamsanqa Dreem";

/** The author's own site, linked from the imprint. */
export const AUTHOR_URL = "https://www.thamsanqa.africa/";

/** The leaves of the book, in order. Drives the desktop tabs and mobile pager. */
export const LEAVES = [
  { id: "front", tab: "Frontispiece", leaf: "Frontispiece" },
  { id: "becoming", tab: "Becoming", leaf: "I · Becoming" },
  { id: "loop", tab: "How", leaf: "II · How It Works" },
  { id: "samwell", tab: "Samwell", leaf: "III · Samwell" },
  { id: "acquire", tab: "Begin", leaf: "IV · Begin" },
] as const;
