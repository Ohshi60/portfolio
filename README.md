# portfolio.ohshi.dk

My personal site: projects, a bit about me, and (eventually) writing. Live at **[portfolio.ohshi.dk](https://portfolio.ohshi.dk)**.

## What's on it

- **Projects** — [Incidetective](https://github.com/Ohshi60/Incidetective), a self-hosted tool for investigating backend failures with log clustering and a local LLM, and the [Night City dashboard](https://github.com/Ohshi60/night-city-dashboard), a Home Assistant dashboard built to run on a 2012 iPad mini.
- **About** — my homelab, the split keyboards I've built, and records.
- **Writing** — Markdown posts; the section appears once the first one is published.

## Stack

- [Astro](https://astro.build), fully static, no client-side framework
- Plain CSS with custom properties for light and dark themes
- DM Sans and JetBrains Mono via Fontsource
- Images optimized at build time with `astro:assets`
- View transitions, sitemap and Open Graph previews
- Deployed to GitHub Pages by GitHub Actions on every push to `main`

## Running it locally

Requires Node.js 22 or later.

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # static output in dist/
npm run preview   # serve the production build
```

## Structure

```text
src/
├── pages/            # one file per route; projects/<slug>/ for project pages
├── components/       # header, footer, hero terminal, featured project, …
├── layouts/          # BaseLayout: meta tags, theme, view transitions
├── content/writing/  # blog posts (Markdown); `draft: true` shows only in dev
├── assets/           # screenshots and photos, optimized at build time
└── styles/global.css # all styles, light and dark tokens
public/               # served as-is: favicon, og.png, CNAME
```

Photos added to `src/assets/` should have their location metadata stripped first, since this repository is public.
