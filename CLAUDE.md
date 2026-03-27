# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

## Project Overview

Personal blog of Kai Gittens (`kaidez.com`), built with [Eleventy (11ty)](https://www.11ty.dev/) as a static site generator. TypeScript is compiled via esbuild. The site is deployed to GitHub Pages via GitHub Actions.

## Key Architecture

- **Static site generator**: Eleventy v3 (`@11ty/eleventy`) — config in `.eleventy.js` (CommonJS, `"type": "commonjs"`)
- **TypeScript source**: `ts_src/` — compiled by esbuild, not `tsc`
- **Compiled JS output**: `src/assets/js/main.js` — gitignored; must be compiled before Eleventy runs
- **Production build**: `npm run build:prod` — order matters: `compile-main` → `eleventy` → `purge-css` → `minify-js`
- **Tests**: Jest + ts-jest, test files in `tests/`
- **Deployment**: GitHub Actions triggers on push to `main`; development work happens on `dev-branch`

## Important Constraints

### TypeScript version
`typescript` is pinned to `5.9.3` (no caret) in `package.json`. Do **not** upgrade it. `ts-jest@29` requires `typescript >=4.3 <6` and will break `npm ci` on GitHub Actions if TypeScript 6+ is installed.

### eleventy-plugin-rss
`@11ty/eleventy-plugin-rss` is pinned to `^2.0.0`. v3 is ESM-only and incompatible with this CommonJS config. The import in `.eleventy.js` uses the default export (`const pluginRss = require(...)`), not the named `rssPlugin` export.

### src/assets/js/main.js is gitignored
This file is excluded from the repo. On CI, `compile-main` must run before `eleventy` or the build will fail with `Could not resolve '_site/assets/js/main.js'`.

### Module system
The project uses CommonJS (`"type": "commonjs"` in `package.json`). Do not introduce ESM-only packages or `import`/`export` syntax in config files.

## Branch Strategy

```
dev-branch  →  (merge when ready)  →  main  →  (GitHub Actions)  →  GitHub Pages
```

- Always work on `dev-branch`
- Deploy with `npm run deploy:full` (merges dev-branch → main, pushes main)
- Never push directly to `main` or `gh-pages`

## NPM Scripts Reference

| Script | Purpose |
|--------|---------|
| `npm start` | Local dev server (esbuild + eleventy --serve) |
| `npm run build` | Dev build |
| `npm run build:prod` | Production build (compile → eleventy → purge CSS → minify JS) |
| `npm run deploy:full` | Merge dev-branch → main and push (triggers CI) |
| `npm test` | Run Jest tests |

## Blog Post Guidelines

When reviewing or editing posts in `src/posts/`:
- Always check: clarity, accuracy, SEO optimization, and Flesch-Kincaid readability
- Flag sentences over 20 words as potentially hard to read; always include a specific rewrite suggestion
- Target audience: technical blog readers — provide structured, sentence-level feedback
- Do not flag lines 16, 296, or 423 for sentence length
- Do not flag line 421 for "for if" construction
- Do not suggest changes to line 318 (`disposable is the function being executed when right-clicking on selected text`) — user has explicitly accepted this wording

## TypeScript Projects
When working on TypeScript repos, do not rename .js files to .ts without explicit permission. Always check tsconfig.json validity after edits.