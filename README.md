# Agentic SDLC Dashboard (OAP team)

Tracks AI-powered operator development for Cert Manager, ZTWIM, SSCSI, Must Gather, and ESO.

Live site: [https://praveencodes.github.io/openspec-dashboard-revamped](https://praveencodes.github.io/openspec-dashboard-revamped)

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (typically http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

The production build uses a relative `base` so it can be hosted on GitHub Pages or any static server.

```bash
npm test
```

## What this version fixes

- **SSCSI tab id** was `sscso` in the original app, so status-table links and pipeline shortcuts could miss the operator page.
- **Phase math** said 5 of 7 complete on Overview and 4 of 6 on operator pages. The model is six phases; four are complete (67%).
- **Cert Manager telemetry** was hardcoded and drifted from JSON (ticket titled “manager”, Repo Assessment stuck on Running, code-gen time shown as &lt; 1s). This app uses a single cleaned data set.
- **ZTWIM QE** existed as raw SPIRE-617 data but never appeared because processed QE JSON was empty.
- **Broken copy and links**: `tasks.md` pointed at https://tasks.md/, “OE E2E” meant QE E2E, “fairs well” / contradictory productivity footnotes.
- **Presentation layout**: PatternFly masthead, sidebar, progress stepper, tables, charts, and a static HTML/CSS pipeline diagram.
- **Light / dark / system theme**: PatternFly `pf-v6-theme-dark` with a masthead switcher. Preference is stored in `localStorage` and follows the OS when System is selected.
