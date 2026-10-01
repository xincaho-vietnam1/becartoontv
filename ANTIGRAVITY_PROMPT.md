# Prompt for Antigravity — BeCartoonTV

Current owner overrides: no Pause motion button. The coral text strip runs continuously using the independent CSS marquee, not a GSAP tween that can be disabled with other motion. The world-story button expands the illustrated bilingual story directly in its section and collapses again; preserve `WorldStory.jsx`, its aria-expanded/inert behaviour and responsive layout. These requirements override earlier descriptions of manual pause and story download links.

Latest approved hero direction: sharp STATIC playtime picnic illustration (`public/art/hero-playtime.jpg`), with new playful poses and grounded feet, distinct from the world section's treehouse artwork. No GIF/video hero. Mobile must show the full composition in normal document flow; never independently float the group over its ground. Preserve the infinite GSAP coral-strip marquee, manual pause and reduced-motion fallback.

You are implementing and polishing this existing complete website repository, not creating a generic landing page from scratch. Read README.md, public/brand-story.md, src/cast.js and all supplied character assets first. Use available GSAP skills: gsap-react, gsap-core, gsap-timeline, gsap-scrolltrigger and gsap-performance. If a named skill is unavailable, use the official GSAP documentation and state that limitation.

## Brand and ownership
The website belongs entirely to BeCartoonTV, an original children's cartoon channel. Official YouTube https://www.youtube.com/@becartoontv; Facebook https://www.facebook.com/BeCartoonTV/. BeCartoonShort is the secondary channel name; do not invent its URL. LANU English https://lanuenglish.com and https://app.lanuenglish.com are ONLY independent partner links in the collaboration section. Do not call LANU a BeCartoonTV app or product. Do not invent audience statistics, company history, email, sponsors or testimonials.

## Reference direction
https://dribbble.com/shots/25859928-Peperuney-Website-Meme-token
https://cdn.dribbble.com/userupload/42725347/file/original-f67600161c21622180d71bb4e5f7cb61.mp4

Use the visual language of an immersive illustrated comic website: large original environmental scenes, bold black outlines, expressive chunky type, speech panels, tactile offset shadows, playful red/turquoise/yellow actions and scroll storytelling. Observe the reference if accessible; never claim to have watched an inaccessible reference. Do not copy its frog, crypto/casino content, slogans or layout pixel-for-pixel. Avoid SaaS card grids, stock icons, sterile white pages, photo backgrounds, glassmorphism and generic gradients.

## Exact cast — never redesign or rename
- Ben: black hair, blue shirt with ONE sheep emblem, blue shorts, red-white sneakers.
- Maya: brown skin, two dark hair puffs with turquoise ties, coral orange dress/tunic, turquoise shorts, yellow-white sneakers.
- Tiko: yellow elephant, peach ears, turquoise triangular neck bandana tied behind. Not a bowtie.
- Zip: sky-blue rabbit, white muzzle/belly/paws, pink ears, purple nose, lime-green bowtie. Not a white rabbit.
- Rio: golden lion, brown mane, cream muzzle/chest/paws, red OPEN sleeveless vest, purple star badge. Not a red T-shirt.

Original turnaround files in public/characters govern the appearance. Preserve them. Current portrait components show the front pose directly from these original sheets; fix framing per character if necessary without redesigning assets. New compositions must keep correct faces, limbs, clothing, proportions and exactly one of each intended character.

## Original world and journey
Develop BeCartoon World, a fictional cohesive island. A golden path connects Music Meadow → Curiosity Clubhouse → Rainbow Lagoon via a rainbow bridge. It supports stories about curiosity, kindness, trying again, sharing the stage and teamwork. Build a traversable editorial journey from arrival to friends, world exploration, videos and grown-up collaboration. The story is a creative concept, not real corporate history. Preserve its regional continuity. Expand only with meaningful episode concepts; do not make repetitive filler.

## Required experiences
Preserve the EN/VI language switch and all Vietnamese translations, saved preference and correct UTF-8 encoding. Read/write source as UTF-8 explicitly. Never re-save UTF-8 using PowerShell's default legacy encoding. Keep new copy bilingual. The current revised banner is video/Banner.tsx with MP4/GIF assets. Preserve GSAP ScrollSmoother desktop support, native mobile scroll and reduced-motion behaviour.
1. Cinematic illustrated hero with original cast, quiet decorative background loop, prominent readable headline and watch/meet actions.
2. Interactive character selection: original portraits, personality, catchphrase and favourite activities. Responsive and keyboard usable.
3. Illustrated connected world with three selectable places and distinct story hooks. Use GSAP parallax/reveals and optional desktop horizontal travel only if it improves clarity. Do not trap scrolling or hide content behind animation.
4. Latest public YouTube videos: use existing build-time sync, same-origin JSON and official API/Atom feed. Never expose API keys or scrape private data. Keep working fallback, cached date and direct channel link. Lazy-load youtube-nocookie player only after click.
5. Brand care statement with truthful creative intentions, no unsupported educational/medical guarantees.
6. Adult collaboration section, real Facebook contact and downloadable media kit. Independent LANU partner links separate from channel identity.
7. Wallpaper download and accessible footer/privacy text.

## Motion implementation
Use scoped useGSAP with revertOnUpdate and automatic cleanup. Register ScrollTrigger once. Animate transforms and opacity, use timeline labels for sequenced hero beats. Honour prefers-reduced-motion and the pause control; pause decorative video too. No continuous layout-animation loops, uncontrolled global tweens, autoplay audio or expensive mobile pins. Refresh ScrollTrigger when image/font loading changes layout. Ensure text remains visible on errors and with animation disabled.

## Production quality
English content for international families and potential partners. Desktop, tablet and 375px mobile; no overflow. Visible keyboard focus, semantic headings, 44px tap targets, native dialog focus management, Escape close, usable menu and readable text on illustrated backgrounds. Keep poster fallback if video unavailable or motion disabled. Optimise artwork and loop size; do not silently replace original characters with approximations.

## Delivery
Complete working code and all referenced assets, package lock, build-time feed sync, GitHub Pages workflow, README, editable world story and artwork provenance. Run tests and production build. Inspect desktop and mobile screenshots and every character portrait; test menu, selectors, player close, partner links and reduced-motion. Fix visible defects before handover. Do not publish externally or claim live automatic updates until the user deploys/enables the workflow. Explain any remaining concrete limitation. Continue editing this repository rather than scattering alternate projects.
