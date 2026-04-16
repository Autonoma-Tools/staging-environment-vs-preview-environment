# Staging Environment vs Preview Environment: Which One Do You Actually Need?

Companion code for the Autonoma blog post 'Staging Environment vs Preview Environment: Which One Do You Actually Need?'.

> Companion code for the Autonoma blog post: **[Staging Environment vs Preview Environment: Which One Do You Actually Need?](https://getautonoma.com/blog/staging-environment-vs-preview-environment)**

## Requirements

Node.js 18+, a GitHub repo connected to Vercel with preview deployments enabled, and `@playwright/test` installed. Optional: a Vercel deployment-protection bypass token stored as a GitHub secret (`VERCEL_AUTOMATION_BYPASS_SECRET`).

## Quickstart

```bash
git clone https://github.com/Autonoma-Tools/staging-environment-vs-preview-environment.git
cd staging-environment-vs-preview-environment
# 1. Install dependencies
npm install
# 2. Install Playwright browsers (one-time)
npx playwright install chromium
# 3. Run the suite against any preview URL
BASE_URL=https://your-preview.vercel.app npx playwright test
```

To wire this into CI, copy `.github/workflows/playwright-preview.yml` into your own repo's `.github/workflows/` directory.

## Project structure

```
.
├── .github/
│   └── workflows/
│       └── playwright-preview.yml   # CI: runs Playwright on every Vercel preview
├── tests/
│   └── checkout-flow.spec.ts        # Example DIY end-to-end checkout test
├── examples/
│   └── run-against-preview.sh       # Helper: run the suite against a preview URL
├── playwright.config.ts             # Minimal Playwright config (uses BASE_URL)
├── package.json
├── README.md
├── LICENSE
└── .gitignore
```

- `tests/` — the Playwright test suite the blog post walks through.
- `.github/workflows/` — CI wiring that triggers on Vercel `deployment_status` events.
- `examples/` — a one-line shell helper to run the suite against any preview URL.

## About

This repository is maintained by [Autonoma](https://getautonoma.com) as reference material for the linked blog post. Autonoma builds autonomous AI agents that plan, execute, and maintain end-to-end tests directly from your codebase — so you don't have to write and re-write Playwright suites like the example in `tests/` every time your UI changes.

If something here is wrong, out of date, or unclear, please [open an issue](https://github.com/Autonoma-Tools/staging-environment-vs-preview-environment/issues/new).

## License

Released under the [MIT License](./LICENSE) © 2026 Autonoma Labs.
