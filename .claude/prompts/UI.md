# Paper Stack — Homepage Rebuild Prompt

## 1. Remove the current homepage

The existing homepage build (in `frontend/app/page.js` and its supporting components) is being replaced, not iterated on. Delete/retire:

- `Marquee.js`
- `WhyStack.js`
- `FlowDiagram.js`
- `StatCards.js`
- `HeroVisual.js`
- `ScrollReveal.js`
- `Eyebrow.js`

Only keep and rebuild `Navbar.js`, `Hero.js`, and `Footer.js`. If any of the deleted components are unused elsewhere in the app after this change, remove the files entirely rather than leaving dead code.

## 2. Redesign reference: pxpush.com

Use [pxpush.com](https://pxpush.com/) as the structural and tonal reference, not a literal skin to copy:

- Minimal top navigation, sparse and confident, no clutter.
- High-contrast, largely monochromatic palette. Keep Paper Stack's existing CSS variables (`--bg`, `--ink`, `--accent`, `--line`, etc. from `globals.css`) but lean into restraint over decoration.
- Numbered/bulleted micro-markers (their `Nº001`, `●` bullet style) used sparingly as structural anchors, not as flourish.
- Content organized into clear, distinct sections with generous vertical whitespace between them, no gradients or drop shadows doing the visual work.
- Typography-led hierarchy: the headline carries the page, everything else is quiet and legible.
- Prioritize clarity and scanability over spectacle.

## 3. Mobile-first, lightweight build

- Design and build mobile-first; verify the small-screen layout before the desktop one.
- No heavy graphics: no WebGL, no canvas, no custom cursor-tracking effects, no large illustrated hero art, no autoplay video.
- Any motion must be simple, CSS-based, and minimal (e.g. a basic fade/slide on scroll at most). Prefer no motion over motion that doesn't clearly earn its cost on a mobile connection.
- Keep image and JS payload small. If an image is used at all, it should be small, compressed, and optional (page must look complete without it).
- Respect `prefers-reduced-motion`.

## 4. Navigation and buttons: exact scope

The homepage must contain **only** these five interactive nav items, and nothing else:

1. Home
2. About
3. Contact
4. Login
5. Signup

No dashboard links, no social icons, no footer link farms, no extra CTAs, no secondary buttons. The `Footer.js` component should not introduce additional navigation beyond what's listed above (e.g. no separate footer sitemap). If a footer is kept at all, it should be minimal (copyright/attribution only, no new links).

## 5. Content and copy rules

- **Do not invent marketing copy, headlines, or body text.** No placeholder lorem ipsum, no invented taglines, no fabricated stats or claims.
- If a headline, subheading, or button label is needed and hasn't been explicitly provided, stop and ask for approval rather than guessing. It's fine to leave a clearly marked placeholder (e.g. `[HEADLINE — NEEDS COPY]`) and flag it for review instead of writing filler.
- Only use copy that already exists in the current codebase (if reusable) or that the user has explicitly approved.
- **No em dashes anywhere** (in code comments, UI copy, or this prompt's own output when referenced). Use commas, periods, or parentheses instead.

## 6. Implementation notes

- Use the `visual-redesign` skill for the CSS/structural surgery on `Navbar.js` and `Footer.js` since they're existing components being simplified, not rebuilt from scratch.
- Do not use `awwwards-hero` or `awwwards-motion` for this pass. This is explicitly a restrained, low-graphics, mobile-first rebuild, not an awwwards-tier showcase. Ignore any prior instruction in this repo's history pushing toward "cinematic" or "site-of-the-day" treatments.
- Keep the existing font system (Fraunces for display, IBM Plex Mono for everything else) and existing CSS custom properties in `globals.css`. Don't introduce a new palette or type system.
- After implementation, test the layout at mobile width (375px) and desktop width before calling it done.

---
*This file replaces the previous UI.md prompt (retro-futuristic terminal / rig.ai scroll-choreography direction), which is no longer the target design direction.*
