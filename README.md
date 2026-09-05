# OopbuyTop

Astro static site for Oopbuy spreadsheet category guides and product discovery.

## Local setup

1. Copy `.env.example` to `.env` and set `MAISONLOOKS_API_KEY` locally. Do not commit the key.
2. Run `npm install`.
3. Refresh the catalog snapshot, then build:

```powershell
$env:MAISONLOOKS_API_KEY = 'your-key'
powershell -ExecutionPolicy Bypass -File scripts/fetch-maisonlooks.ps1
npm run build
```

`scripts/fetch-maisonlooks.mjs` is the cross-platform build fetcher. It preserves the last valid snapshot if the API has a temporary failure. The PowerShell fetcher is provided for local Windows environments where Node's TLS connection is blocked by a network proxy.

## Deployment

Set `MAISONLOOKS_API_KEY` as a server-side build secret in the hosting provider. Do not use a `PUBLIC_` environment variable. The API is queried only during the build, and the published site contains static HTML and the product snapshot rendered into it.

## Daily catalog refresh

The repository includes `.github/workflows/refresh-catalog.yml`. It runs once per day, refreshes only `src/data/`, and commits a change only when the API snapshot has changed. A connected Cloudflare Pages project will then deploy the updated snapshot from GitHub.

Before enabling it, add a GitHub Actions repository secret named `MAISONLOOKS_API_KEY` with the server-side API key. Never put that key in source files, `.env.example`, browser code, or a `PUBLIC_` environment variable. You can also run the workflow manually from the repository's **Actions** tab after adding the secret.

## Optional GA4 conversion reporting

Set `PUBLIC_GA_MEASUREMENT_ID` in the Cloudflare Pages production environment to a valid GA4 Measurement ID (for example, `G-XXXXXXXXXX`) and redeploy. Until that value is set, no Google Analytics script is published. Once enabled, every voluntary outbound link already tagged with `utm_source=oopbuytop` sends one `outbound_click` event. Use the `outbound_placement` event parameter to compare homepage search, product-card, category, QC and navigation clicks.
