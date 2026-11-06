# OopbuyTop

Astro static site for Oopbuy spreadsheet category guides and product discovery.

**Live resource:** [oopbuytop.net](https://oopbuytop.net/)

The site's primary discovery resource is the searchable [Oopbuy spreadsheet](https://oopbuytop.net/), supported by a focused [QC-reference finds directory](https://oopbuytop.net/finds/) and the [how-to guide](https://oopbuytop.net/oopbuy-spreadsheet/). The catalog build generates individual research pages only for entries that have current descriptive data, an image and a non-zero warehouse QC-photo count. This repository contains the static-site source, catalogue-refresh workflow and deployment configuration for those public resources.

## Search indexing

All local product detail pages (`/finds/<slug>/`) use `noindex,follow` and are excluded from the XML sitemap. Crawling stays allowed so search engines can read the directive. The `/finds/` directory, homepage, category pages and guides retain their existing indexing settings. This policy applies only to OopbuyTop and does not change Maisonlooks.

## Editorial scope

OopbuyTop is an independent discovery resource. It does not sell products, verify authenticity, guarantee stock or publish invented reviews. Catalogue cards are build-time snapshots; visitors must verify the current live listing, selected option, price and delivery terms themselves. See the site's [editorial disclosure](https://oopbuytop.net/about/) for the full methodology and update boundaries.

## Fixed catalog snapshot

Product data comes from the MaisonLooks general API (official and PK shops only) and is committed to Git in `src/data/`. Builds, dev-server restarts and site edits never call the API, so the product set stays fixed until someone deliberately runs a sync.

## Local setup

1. Put the private `.env.general` (contains `MATRIX_API_KEY`) in the project root. It is git-ignored; never commit it or expose it through a `PUBLIC_` variable.
2. Run `npm install`, then `npm run build`. No API key is needed to build.

## Refreshing products (manual only)

Smoke-test with two products first (writes nothing):

```powershell
node --env-file=.env.general scripts/sync-maisonlooks.mjs --seed=oopbuytop.net --max-products=2
```

Then run the full sync (up to 15 products per category, roughly 11 minutes):

```powershell
npm run sync:maisonlooks
```

The script sends one request at a time, at least 1.1 s apart (API limit 120/min; every product detail counts as one request). On HTTP 429 it waits once for `Retry-After`, then stops. Any failure leaves `src/data/` unchanged. Never run two syncs at once. Review the diff and commit `src/data/` to publish the new set.

## Deployment

Cloudflare Pages builds the committed snapshot with `npm run build`. The hosting provider does not need an API secret.

## Optional GA4 conversion reporting

Set `PUBLIC_GA_MEASUREMENT_ID` in the Cloudflare Pages production environment to a valid GA4 Measurement ID (for example, `G-XXXXXXXXXX`) and redeploy. Until that value is set, no Google Analytics script is published. Once enabled, every voluntary outbound link already tagged with `utm_source=oopbuytop` sends one `outbound_click` event. Use the `outbound_placement` event parameter to compare homepage search, product-card, category, QC and navigation clicks.
