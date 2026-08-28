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
