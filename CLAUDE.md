# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal portfolio site built with Astro (static output, no UI framework integrations). Also see `AGENTS.md`, which links to the relevant Astro docs guides.

## Commands

- `npm run dev` — dev server. Per `AGENTS.md`, agents should start it in background mode: `npx astro dev --background`, then manage it with `astro dev stop | status | logs`. Restart it after adding or changing `src/content.config.ts`.
- `npm run build` — static build to `dist/`. This is the only check available: there is no test suite, linter, or typecheck script (`npx astro check` works if `@astrojs/check` is installed, but it is not a dependency).
- `npx prettier --write .` — formatting (Prettier with `prettier-plugin-astro`, double quotes, semicolons, 2-space indent). No npm script wraps it.
- Node `>=22.23.4` is required (`engines` in `package.json`).

## Deployment

Pushing to `main` deploys automatically: `.github/workflows/deploy.yml` builds with `withastro/action` and publishes to GitHub Pages. The custom domain is `portfolio.ohshi.dk` (set in both `astro.config.mjs` `site` and `public/CNAME` — keep them in sync). GitHub Pages serves `src/pages/404.astro` (built as `404.html`) for unknown paths.

## Architecture

- **Routing**: file-based under `src/pages/`. Each project has a hand-written detail page at `src/pages/projects/<slug>/index.astro` and an entry in the `projects` array in `src/pages/projects/index.astro`. The home page features Incidetective (`src/components/FeaturedProject.astro`) and links the second project in its "Also built" section.
- **Layout**: every page wraps its content in `src/layouts/BaseLayout.astro` (props: `title`, `description`, `image`). It renders `Header`, `<main>` and `Footer`, imports the global stylesheet and fonts (DM Sans, JetBrains Mono via `--font-mono`), sets canonical and Open Graph tags (default preview image `public/og.png`, 1200×630), and enables view transitions with `<ClientRouter />`. Page titles use the form `Page | Michael Søby`.
- **View transitions**: navigation swaps pages client-side. Bundled `<script>`s run only once per session, so per-page setup must listen for `astro:page-load`, and click handlers on swapped elements should be delegated from `document`.
- **Theming**: light/dark is driven by `data-theme` on `<html>`. An inline script in `BaseLayout`'s `<head>` sets it before paint (from `window.__theme`, then `localStorage.theme`, then `prefers-color-scheme`) and reruns on `astro:after-swap`, because a transition replaces the `<html>` attributes. `src/scripts/theme-toggle.ts` flips the theme and persists it, tolerating blocked storage. Dark values are defined under `:root[data-theme="dark"]` in `global.css`, so any new color token needs both a light and a dark value. Terminal and code panels use the `--color-term-*` tokens and stay dark in both themes.
- **Styling**: all CSS lives in `src/styles/global.css`, organized by commented sections (Hero, Featured project, Projects page, About page, Writing, …) with per-section `@media` breakpoints. Components do not use scoped `<style>` blocks — add new styles to the matching section of the global file. Always use the `--color-*` custom properties rather than literal colors. Animations must be disabled under `prefers-reduced-motion`.
- **Writing**: Markdown posts live in `src/content/writing/` (collection defined in `src/content.config.ts`; helpers in `src/lib/writing.ts`). Posts with `draft: true` appear only in `astro dev`. The header's "Writing" link, and `/writing/` in the sitemap (`astro.config.mjs`), appear only once a non-draft post exists.
- **About page**: content is plain data at the top of `src/pages/about.astro`. Any value containing `TODO:` renders as a visible dashed placeholder (`src/components/Todo.astro`), so the remaining TODOs must be filled in before merging to `main`.
- **Images**: screenshots and photos go in `src/assets/` and are rendered with `astro:assets` `<Image>` (optimized to WebP at build time). Project screenshots come from the projects themselves; Night City's come from its demo mode, so no real home data appears. The headshot (`src/assets/headshot.jpg`) is used in the header and on the About page. `public/` holds files served as-is (favicon, `og.png`, `CNAME`). CSS is inlined into each page (`build.inlineStylesheets` in `astro.config.mjs`) to avoid a render-blocking request; keep the stylesheet lean.
