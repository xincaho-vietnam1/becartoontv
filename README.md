# BeCartoon World

Current revision: the pause button is removed at the owner's request. The coral ticker now uses an independent, continuously looping CSS animation, so GSAP cleanup or reduced-motion settings cannot leave it frozen. Other GSAP decorative animations still respect reduced-motion. “Read our world story” expands/collapses a complete illustrated story inline, in the selected EN/VI language, rather than downloading a Markdown file. See `src/WorldStory.jsx` and `src/story-marquee.css`.

Latest revision: the live hero is a new static picnic/playtime illustration, separate from the island exploration artwork. Mobile displays the complete image in normal layout; desktop uses the image directly rather than a compressed video. The coral ticker uses GSAP for seamless continuous scrolling and honours pause/reduced-motion controls. Older Remotion MP4/GIF exports remain optional, not displayed in the hero.

Complete bilingual English/Vietnamese React/Vite/GSAP brand website for BeCartoonTV. Includes original generated environmental artwork, original supplied character sheets, Full HD wallpaper, a ten-second Full HD silent Remotion banner plus a GIF export, character profiles, a connected fictional world, YouTube video embeds, LANU partner links and downloadable brand documents. EN/VI buttons persist the selected language locally. Public video titles remain as published on YouTube.

## Local development
Requires Node.js 22+.

```sh
npm ci
npm run dev
npm test
npm run build
```

To re-render the decorative video with Remotion: `npm exec -- remotion render video/WorldLoop.tsx BeCartoonWorldLoop public/art/world-loop.mp4`. On this Windows workstation `render-loop.ps1` uses the installed Chrome executable and E-drive temporary storage. The existing loop is already included; no rendering is needed to deploy the website.

The revised banner uses `video/Banner.tsx`: run `render-banner.ps1` on this Windows workstation, or `npm exec -- remotion render video/Banner.tsx BeCartoonBanner public/art/banner-remotion.mp4` on another workstation. The script also exports the poster and GIF with FFmpeg. The website serves the smaller MP4, not the large GIF. GSAP ScrollSmoother runs on desktop only; touch devices use native scrolling. Reduced-motion or pause disables smoothing and decorative animation. ScrollToPlugin handles section links.

## Upload to GitHub and publish
1. Put the CONTENTS of this folder at your new repository root; do not upload node_modules.
2. Push to branch `main`.
3. In Settings → Pages → Build and deployment, select **GitHub Actions**.
4. Run the `Build and publish BeCartoon World` workflow once. It builds and deploys the site.
5. The workflow refreshes channel data approximately every six hours. GitHub scheduled runs can be delayed and are disabled after prolonged inactivity on public repositories; re-enable or run manually when needed.

For a custom domain, configure it in GitHub Pages, add a `public/CNAME` file containing the verified domain and set repository variable `CUSTOM_DOMAIN` to that domain. The workflow sets the correct root base path. Without a custom domain it automatically uses `/repository-name/`. For other static hosts set `BASE_PATH=/` and publish `dist`.

## Automatic videos
The sync script fetches the official channel's Atom feed during builds, writes `public/data/videos.json`, and the browser reads that same-origin file. No browser RSS CORS workaround, scraping proxy or exposed API key.

The free feed normally contains the latest 15 uploads. Optional repository secret `YOUTUBE_API_KEY` enables the official YouTube Data API instead and filters to public, embeddable videos. Enable YouTube Data API v3 for the key. Keep it in GitHub Secrets; NEVER add it to VITE variables or source files. Restrict the key to that API.

Optional repository variable `VIDEOS_PUBLISHED_AFTER` accepts an ISO date to feature only newer work, e.g. the date of your 2D relaunch. This only changes website selection; it does not hide/delete channel videos. The website does not infer Shorts from duration.

The workflow caches the last successful snapshot. On a network failure it preserves that data and displays its date. With no available data, visitors get the real official channel link. Cached private/deleted videos disappear after the next successful refresh; they can remain during an outage. A feed entry can still be unembeddable, so every player has a direct YouTube link. Set `REQUIRE_VIDEO_SYNC=true` locally to make sync failure a failing exit code.

## Edit brand content
- `src/cast.js`: profile text and original fictional place concepts. Names/designs are fixed by the supplied reference sheets.
- `public/brand-story.md`: story-world concept and future episode seeds.
- `public/media-kit.md`: truthful collaboration overview, no fabricated stats.
- `src/main.jsx`: official social links and separate LANU partner links.
- `ANTIGRAVITY_PROMPT.md`: detailed continuation prompt.
- `ARTWORK_PROMPTS.md`: image generation prompts and provenance.
- `video/`: editable Remotion source for the decorative silent hero loop.

## Accessibility and privacy
Keyboard-operable character/place selectors, labelled modal player with native focus containment, Escape close, visible focus indicators, mobile menu, reduced-motion support and manual pause. Video players load only on click and use youtube-nocookie.com; YouTube thumbnails still make third-party requests. Baloo 2 is self-hosted with its OFL license. No account form, fabricated contact email, tracking or donation flow.

## Ownership and launch checks
LANU is an independent partner link. No fake business milestones or claims that the learning app belongs to this channel. Character images are original user-supplied files. Artwork is generated with the built-in image tool from those references. Do not promise guaranteed monetization, copyright exclusivity or viral growth.

This package is locally built and reviewed; automatic live refresh becomes active after you enable and deploy the GitHub workflow. Verify your final domain, partner permission, privacy wording and current video selection before public launch.
