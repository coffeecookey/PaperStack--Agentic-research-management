# Paper Stack — Hero 3D Animation Prompt

## Context

The homepage hero (`frontend/app/components/Hero.js`) is currently a single centered text column: headline, subhead, two CTAs, a stat readout row. No image or visual asset since the last rebuild (`UI.md`) explicitly stripped the hero illustration to keep things mobile-first and low-graphics.

This prompt adds one focal visual back in, on the **left side** of the hero, but as a genuinely dynamic 3D piece rather than a static illustration, restrained enough to stay inside Paper Stack's existing design system (cream/near-black + terracotta, hard-edged bordered panels, monospace micro-labels, Fraunces display type) and disciplined enough to be Awwwards-worthy rather than a generic Three.js demo bolted onto a page.

## 1. Layout

Restructure `Hero.js` into a two-column split on desktop:

```
[ 3D VISUAL — ~40-45% width, left ] [ existing text content — right, unchanged ]
```

This is the **Asymmetric Split** architecture (`awwwards-hero` skill, Architecture B), mirrored so the visual sits left and text sits right. Do not center the visual or blend it with another architecture. On mobile (`< 768px`), drop back to a single column exactly as it is today: the 3D visual either doesn't render at all, or degrades to a static frame (see §4). The text content, its copy, and its CTAs stay word-for-word what they are today. Do not add, remove, or reword any copy.

## 2. Concept — pick ONE, do not blend

The visual must be recognizably "Paper Stack," not a generic abstract 3D shape. Pick one direction and commit:

- **Depth-stacked cards (recommended).** 4-6 bordered rectangles styled like the site's existing index-card/panel aesthetic (hard edges, thin `--line-strong` border, tiny monospace micro-labels like a reference ID or a tabular timestamp in one corner), arranged receding into Z-space per `awwwards-hero` Architecture F: one sharp, full-opacity card in front, others receding smaller/dimmer behind it. Slow ambient drift using Lissajous orbital motion (`awwwards-motion`, Layer 7) so the stack never sits still, plus a cursor-driven parallax tilt (`rotateX`/`rotateY`, clamped to roughly ±8°) so it reacts to the pointer without ever going gimmicky. This is the literal product metaphor (a stack of papers) and is buildable in pure CSS 3D — no new dependency.
- **Citation graph.** A handful of small bordered "paper" nodes floating at different depths, connected by thin dashed lines that update as the scene rotates, one node picked out in terracotta as the "focal" paper. More faithful to the citation-threading pitch, but correct perspective on the connecting lines as depth changes is hard to fake in CSS — this direction effectively requires a real WebGL scene (see §3).
- **Turning manuscript.** A single stack/book rendered as a few layered "page" cards that gently lift and resettle, like pages being riffled. Quieter, more literal, less kinetic than the other two.

## 3. Technical approach

Two real options, pick based on how much visual fidelity is worth the weight:

- **CSS 3D transforms (recommended default).** `perspective` + `transform-style: preserve-3d` on a small DOM tree, animated via `transform`/`opacity` only. Zero new dependencies, matches the project's established "lightweight" constraint from `UI.md`, and is what the `awwwards-hero` Architecture F blueprint is built on. Strongly preferred for the "Depth-stacked cards" and "Turning manuscript" concepts.
- **React Three Fiber / WebGL.** True 3D rendering — real lighting, materials, camera. Needed if going with "Citation graph" or if the depth-stacked cards should look physically lit rather than flat-card-with-shadow. This adds a meaningful dependency (`three` + `@react-three/fiber`, roughly 150kb+) and real GPU cost, which cuts against the mobile-first/low-graphics rule already established for this homepage — if picked, it must still be gated to desktop-only per §4, never shipped to mobile.

If unsure which to use, default to CSS 3D transforms. It's the one that can't accidentally violate the project's existing performance rules.

## 4. Gating and performance (non-negotiable)

This codebase already has an established pattern for exactly this situation — reuse it, don't reinvent it. `CustomCursor.js` and `SmoothScroll.js` (and, historically, the deleted `HeroVisual.js`) all follow the same shape:

- A `matchMedia("(pointer: fine)")` + `matchMedia("(prefers-reduced-motion: reduce)")` check gates whether the effect mounts at all. Mobile/touch and reduced-motion users get nothing extra, not a degraded version — the hero looks exactly like it does today.
- Re-evaluate on media query change, not just once on mount.
- Only initialize the animation loop once the hero is actually in view (reuse `ScrollReveal.js`'s `IntersectionObserver` pattern, or a local one) — don't run a `requestAnimationFrame` loop for an element that's scrolled out of view.
- Clean up all listeners and cancel any animation frame on unmount.
- Animate only `transform` and `opacity`. No `top`/`left`/`width`/`height` animation.
- If WebGL is chosen, lazy-load the Three.js/R3F bundle (`next/dynamic` with `ssr: false`) so it never ships in the initial bundle for users who never see it (mobile, reduced-motion).

## 5. Visual system constraints

- Palette: reuse the existing CSS variables only (`--accent`, `--ink`, `--line-strong`, etc.) — no new colors introduced for this feature.
- Typography on any in-scene labels: IBM Plex Mono, uppercase, tracked, matching the stat-readout style already in `Hero.js`.
- No em dashes anywhere (labels, comments, this prompt's own future edits).
- No invented copy. If the visual needs a label (a fake citation ID, a timestamp), either reuse a pattern already established in the codebase (e.g. the `Papers indexed` / `1,204` style) or leave it as a clearly marked placeholder and ask for approval — do not invent new marketing-sounding text.

## 6. Implementation notes

- Use `awwwards-hero` (Architecture B for the split, Architecture F's blueprint for the depth-card treatment) and `awwwards-motion` (Layer 7 ambient/orbital motion, Layer 3 cursor-tilt) skills during the build.
- Entry animation: the visual should animate in on load using the same `enter-scale`/`enter-up` stagger utilities already in `globals.css`, not a new one-off entrance system.
- Test at 1440px desktop and 375px mobile before calling it done, same as the last two homepage changes — confirm the mobile layout is byte-for-byte unaffected and no extra JS/GPU work happens there.
