# Carbon Impact — Prospect Demo (New Belgium Brewing)

Prospect-facing demo of the CarbonBetter carbon-credit platform concept. Static site, no build step, no dependencies.

- **Live URL:** https://mattcb78702.github.io/carbon-impact-demo/ — push to `main` deploys it
- **Talk track (how to present it):** [TALK_TRACK.md](TALK_TRACK.md)
- **Spec and decisions:** `Carbon Credit Product/Carbon-Impact-Demo_DESIGN_2026-08-03.md` (CarbonBetter Claude workspace)
- **Research behind it:** `Carbon Credit Product/Carbon-Credit-Buyer-Experience_MASTER.md`

## What it is

Six tabs, built around four jobs: educate, select, benchmark, communicate. It is a tool to **understand and communicate**, not to manage the procurement process. CarbonBetter does the diligence; this makes that diligence legible, defensible, and shareable.

Your Footprint · Quality and Co-benefits · Explore Credits · Your Portfolio · Benchmark · Share (pre-sale and post-sale)

## Files

| File | Holds |
|---|---|
| `js/data.js` | All company-specific content. Edit this to re-skin for another prospect. |
| `js/catalogue.js` | The 26 catalogue projects powering Explore. **Generated** — do not hand-edit. |
| `js/prices.local.js` | Real quoted prices. **Gitignored, never deployed.** |
| `js/app.js` | Shell, router, and view renderers. |
| `extract/` | Read-only scripts that build the generated files from source data. |

Regenerate the catalogue after any change to the source deck:

```
python extract/extract_catalogue.py     # deck -> catalogue_projects.json
python extract/build_catalogue_js.py    # -> js/catalogue.js + js/prices.local.js
```

Three typos in the source deck's slide titles are corrected in a `NAME_FIXES` map in `build_catalogue_js.py`, so regenerating does not reintroduce them.

## Pricing and confidentiality

The client catalogue carries real negotiated per-tonne prices, and this demo is served from a public URL where anyone can read the source. So:

- The **public build shows indicative bands only** and never requests the price file, meaning there is no 404 in a prospect's network tab hinting that one exists.
- A **local session shows the real prices** and flags itself "Internal — real prices" in the header. `app.js` requests `js/prices.local.js` only when the hostname is localhost.

An automated check asserts that no real catalogue price appears anywhere in the deployed build. Never commit `js/prices.local.js`.

## Data provenance

Every block in the interface names its own source in the left rail. What that means:

- **Registry record** — real public retirements. New Belgium's three actual retirements (15,597 tonnes, 2021 to 2025) and the named peer retirements are genuine registry data from `VCM Dashboard/outputs/merged_events_resolved.csv`. Nothing here is fabricated.
- **Your catalogue** — CarbonBetter's real June 2026 catalogue (`Carbon Credit Product/New Belgium/`, confidential).
- **Public reporting** — New Belgium's published footprint and commitments.
- **Market data** — derived from the merged five-registry dataset (207,881 retirements).

Forward-looking retirements are labelled "Proposed" and never shown as completed.

## Verification

Two gates, both scripted:

1. **Content gate** (jsdom): renders every route, fails on a JavaScript error, missing load-bearing text, or a leaked price.
2. **Live gate** (Puppeteer): the same routes on the deployed URL, plus screenshots, in-app click paths, filter interaction, and mobile.

If the browser tooling misbehaves, see the browser-verification note in Claude's memory. One gotcha: Chrome's `innerText` applies CSS `text-transform`, so assert case-insensitively.
