# Carbon Impact — Prospect Demo (New Belgium Brewing)

Prospect-facing demo of the CarbonBetter carbon-credit workspace concept. Static site, no build step; all content is in `js/data.js` (edit that one file to re-skin for another prospect).

- **Live URL:** https://mattcb78702.github.io/carbon-impact-demo/ — push to `main` deploys it
- **Talk track (how to present it):** [TALK_TRACK.md](TALK_TRACK.md)
- **Spec:** `Carbon Credit Product/Carbon-Impact-Demo_DESIGN_2026-08-03.md` (CarbonBetter Claude workspace)
- **Research behind it:** `Carbon Credit Product/Carbon-Credit-Buyer-Experience_MASTER.md`
- **Plan:** [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md)

## Where the content comes from

`js/data.js` is the only content file. Its sources:

- **New Belgium's retirement history** — real public registry records, pulled from `VCM Dashboard/outputs/merged_events_resolved.csv`.
- **Portfolio projects** — CarbonBetter's real June 2026 catalogue for New Belgium (`Carbon Credit Product/New Belgium/`, confidential). Prices appear here as **indicative bands only**; the firm quotes never go on the public URL.
- **Peer comps** — real named retirements from the same registry dataset (`extract/extract_demo_data.py` regenerates the candidate pool).
- **Footprint** — New Belgium's public reporting and commitments.
- **Contracts, approvals, forward records** — sample data, labeled as such in the interface.

## Verification

`extract/` holds the read-only extraction script. Live-site checks were run with Puppeteer (screenshots, click-paths, console errors, link status) — see the browser-verification note in Claude's memory if the browser tooling misbehaves.

All registry projects and peer-comp retirements shown are real public registry data; New Belgium's own records are sample data in realistic format, and pricing is illustrative — labeled as such in the UI.
