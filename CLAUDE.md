# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal portfolio site built with Astro (static output, no UI framework integrations). Also see `AGENTS.md`, which links to the relevant Astro docs guides.

## Commands

- `npm run dev` — dev server. Per `AGENTS.md`, agents should start it in background mode: `npx astro dev --background`, then manage it with `astro dev stop | status | logs`.
- `npm run build` — static build to `dist/`. This is the only check available: there is no test suite, linter, or typecheck script (`npx astro check` works if `@astrojs/check` is installed, but it is not a dependency).
- `npx prettier --write .` — formatting (Prettier with `prettier-plugin-astro`, double quotes, semicolons, 2-space indent). No npm script wraps it.
- Node `>=22.23.4` is required (`engines` in `package.json`).

## Deployment

Pushing to `main` deploys automatically: `.github/workflows/deploy.yml` builds with `withastro/action` and publishes to GitHub Pages. The custom domain is `portfolio.ohshi.dk` (set in both `astro.config.mjs` `site` and `public/CNAME` — keep them in sync).

## Architecture

- **Routing**: file-based under `src/pages/`. Each project gets a hand-written detail page at `src/pages/projects/<slug>/index.astro` plus a card on `src/pages/projects/index.astro`; both must be updated when adding a project. No content collections are used.
- **Layout**: every page wraps its content in `src/layouts/BaseLayout.astro` (props: `title`, `description`), which renders `Header`, `<main>`, and `Footer` and imports the global stylesheet and the DM Sans font.
- **Styling**: all CSS lives in `src/styles/global.css`, organized by commented sections (Hero, Projects page, Project detail page, …) with per-section `@media` breakpoints. Components do not use scoped `<style>` blocks — add new styles to the matching section of the global file. Always use the `--color-*` custom properties rather than literal colors.
- **Theming**: light/dark is driven by `data-theme` on `<html>`. An inline script in `BaseLayout`'s `<head>` sets it before paint (from `localStorage.theme`, falling back to `prefers-color-scheme`) to avoid a flash; `src/scripts/theme-toggle.ts` (loaded by `ThemeToggle.astro`) flips it and persists the choice. Dark values are defined under `:root[data-theme="dark"]` in `global.css`, so any new color token needs both a light and a dark value.
- **Static assets**: `public/` (served from `/`), e.g. `/images/cv_headshot.jpg` used as the header logo.
