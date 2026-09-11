# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Paper Stack** is a research archive application for tracking academic papers, threading citations, and maintaining research notes. The project is built with Next.js 16.2.12 (App Router) and uses modern React 19 with TailwindCSS v4 for styling.

## Development Commands

All commands should be run from the `frontend/` directory:

```bash
# Development server (runs on http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Architecture

### Next.js Version Notice

**CRITICAL**: This project uses Next.js 16.2.12, which has breaking changes from earlier versions. Before writing any Next.js code, consult `frontend/node_modules/next/dist/docs/` for current API conventions. Do not rely on training data for Next.js APIs.

### Project Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── components/        # React components
│   │   ├── Hero.js       # Landing page hero section
│   │   ├── Navbar.js     # Site navigation
│   │   └── Footer.js     # Site footer
│   ├── layout.js         # Root layout with font configuration
│   ├── page.js           # Home page (renders Navbar, Hero, Footer)
│   └── globals.css       # Global styles and CSS variables
├── public/               # Static assets
├── next.config.mjs       # Next.js configuration with Turbopack
└── package.json          # Dependencies and scripts
```

### Styling System

- **Framework**: TailwindCSS v4 (configured via PostCSS)
- **Fonts**:
  - `Fraunces` (Google Font) - Display font for headings
  - `IBM Plex Mono` (Google Font) - Monospace font for body text
- **Color System**: Custom CSS variables defined in `globals.css` with automatic dark mode support via `prefers-color-scheme`
- **Theme Variables**: All colors are defined in CSS custom properties:
  - `--bg`, `--bg-panel`, `--bg-panel-2` - Background colors
  - `--ink`, `--ink-soft`, `--ink-faint` - Text colors
  - `--accent`, `--accent-deep`, `--accent-ink` - Accent colors
  - `--line`, `--line-strong` - Border/divider colors
- **Texture Effects**: The app includes a fixed noise texture overlay (`body::before`) and a grid texture utility class (`.grid-texture`)

### Key Patterns

1. **Component Organization**: Components are stored in `app/components/` as standalone `.js` files
2. **Responsive Design**: Mobile-first approach with extensive use of responsive Tailwind utilities (`sm:`, `md:`)
3. **Font Loading**: Fonts are imported and configured in `layout.js` using Next.js font optimization
4. **Build Tool**: Turbopack is enabled in `next.config.mjs` for faster development builds

## Important Notes

- The application is currently frontend-only with no backend or API routes
- All data in components (e.g., paper counts in Hero) is currently static/placeholder
- The project uses the App Router pattern, not the Pages Router
- Custom spacing values are used throughout (e.g., `mb-5.5`, `gap-3.5`) - maintain consistency with existing patterns
- When adding components, follow the existing pattern of placing them in `app/components/`
- Maintain the monospace, academic aesthetic established by the design system
