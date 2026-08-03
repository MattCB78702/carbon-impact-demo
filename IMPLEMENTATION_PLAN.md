# Carbon Impact Demo — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A hosted, clickable, New Belgium-personalized demo of the Carbon Impact workspace (Share + Evidence Vault deep) live on GitHub Pages by 2026-08-04 EOD.

**Spec:** [Carbon-Impact-Demo_DESIGN_2026-08-03.md](../Carbon%20Credit%20Product/Carbon-Impact-Demo_DESIGN_2026-08-03.md)

**Architecture:** Static single-page app — one `index.html` shell, one `css/app.css`, one `js/app.js` (hash-based view router + renderers), one `js/data.js` (ALL content: company config, portfolio, retirement records, role views, peer comps). No build step, no dependencies except Google Fonts. Views render client-side from `data.js`, so re-skinning for another prospect = editing one file.

**Tech Stack:** Vanilla HTML/CSS/JS · GitHub Pages (repo `MattCB78702/carbon-impact-demo`) · Python (one read-only extraction script) · chrome-devtools MCP for verification.

## Global Constraints

- Working product name: **"Carbon Impact"** (config line `productName` in data.js — nowhere else hard-coded).
- New Belgium appears as styled text only — never their logo asset.
- All registry projects, serials formats, methodologies, and peer-comp buyers are REAL (from `VCM Dashboard/outputs/merged_events_resolved.csv`). New Belgium's own retirement records are SAMPLE records in realistic format, labeled "Sample data for demonstration" in the UI footer of every screen.
- Prices/spend are illustrative ranges, always labeled "illustrative."
- New Belgium facts from public sources only.
- Style: CarbonBetter style guide (`Context/CarbonBetter/STYLE_GUIDE.md`) — Nunito Sans / IBM Plex Mono, Electric Blue `#3347FF`, Dark Navy `#1B2A6B`, off-white `#F5F5F5`, blue=focus / gray=baseline, no pie charts, sentence-case headlines.
- The extraction script READS the VCM outputs; it writes ONLY into `Carbon Impact Demo/extract/`.
- Depth tiers per spec: Share (5 views) + Evidence Vault deep; Portfolio home light; Plan & Decide teaser.

---

### Task 1: Repo + scaffold

**Files:** Create `Carbon Impact Demo/` → `index.html`, `css/app.css`, `js/app.js`, `js/data.js`, `README.md`, `.gitignore`, `.nojekyll`

- [ ] Scaffold files with empty-but-valid structure (shell renders "Carbon Impact" header + left nav with 4 areas).
- [ ] `git init`, first commit.
- [ ] `gh repo create MattCB78702/carbon-impact-demo --public --source . --push`
- [ ] Enable GitHub Pages (branch `main`, root) via `gh api`. Record the live URL in README.
- [ ] Verify: live URL serves the shell (fetch returns 200 + expected title). GitHub Pages first deploy can take a few minutes — poll.

### Task 2: Extract real data

**Files:** Create `extract/extract_demo_data.py`, outputs `extract/candidate_projects.json`, `extract/peer_comps.json`

**Interfaces — Produces:** curated content pasted into `js/data.js` (`portfolio.projects[]`, `peerComps[]`).

- [ ] Script reads `VCM Dashboard/outputs/merged_events_resolved.csv` (utf-8-sig).
- [ ] Candidate projects: aggregate by (registry, project_id, project_name, project_type, methodology, country); filter to themes — regenerative agriculture/soil, forestry/ARR/watershed, community energy (cookstoves/water) — prefer US/Americas, recent retirement activity, meaningful volumes. Emit top ~25 with total retired tonnes, sample serial, sample retirement reason.
- [ ] Peer comps: filter `buyer_canonical`/`beneficiary_clean` against a brewery/beverage/consumer list (New Belgium, Sierra Nevada, Lagunitas, Athletic Brewing, Allagash, Molson Coors, Heineken, AB InBev, Constellation, Boston Beer, Diageo, PepsiCo, Coca-Cola, Keurig, Danone…) + any `BREW` substring. Emit buyer, years active, total tonnes, project types bought, example projects.
- [ ] Print row counts in/out (sanity-check rule). Script never writes outside `extract/`.
- [ ] I curate: pick 4–5 projects + 5–8 peer comps → hand-write into `js/data.js` with real fields; mark price fields illustrative.
- [ ] Commit.

### Task 3: Design system + shell (invoke frontend-design skill first)

**Files:** `css/app.css`, `index.html`, `js/app.js` (router)

- [ ] Layout: fixed left nav (Portfolio · Plan & Decide · Evidence Vault · Share), top bar with "Carbon Impact" + "Prepared for New Belgium Brewing" + CarbonBetter mark, content area. Hash router (`#/home`, `#/plan`, `#/vault`, `#/share/:view`) with per-view render functions reading `data.js`.
- [ ] Style-guide tokens as CSS variables; Nunito Sans + IBM Plex Mono via Google Fonts.
- [ ] Persistent footer line: "Demonstration workspace — sample data, illustrative pricing."
- [ ] Verify in browser (desktop + narrow), commit.

### Task 4: Evidence Vault (deep)

**Files:** `js/app.js` (renderVault), `js/data.js` (records)

Sections, all from data.js:
- [ ] **Retirement records** table: date, registry, serial (real format, sample-flagged), project, tonnes, status chip; row expands to a certificate-style detail card (registry link, methodology, vintage, retirement reason).
- [ ] **Contracts & delivery** (procurement artifacts): contract records with counterparty, volume, delivery schedule, delivered/retired status.
- [ ] **Diligence evidence** per project: registry record link, methodology, quality signals (ICVCM/CCP status where real, ratings noted as sample), risk flags.
- [ ] **Audit trail**: who approved what when (sample names with roles).
- [ ] **Claims substantiation checklist**: each intended public claim → evidence links → wording status (approved/pending).
- [ ] Verify every expand/collapse and link in browser; commit.

### Task 5: Share — five role views (centerpiece)

**Files:** `js/app.js` (renderShare + one function per view), `js/data.js`

Share landing: five cards, each explicitly "Generated from the portfolio record · updated [date]."
- [ ] **Marketing kit**: approved claims language (approved/banned phrasing pairs), per-project stories with co-benefits, social-ready copy blocks (copy button), do/don't guardrails.
- [ ] **Legal & claims pack**: claim-to-evidence map (mirrors vault checklist), AB 1305-style disclosure checklist with status, registry/methodology/vintage detail per holding, approval history.
- [ ] **Finance & audit pack**: budget vs. actual (illustrative), allocation table with price context ranges, contract/payment schedule, alternatives considered, deep links into vault records.
- [ ] **Employee page**: plain-language narrative ("what we did and why"), project cards with location/co-benefits, FAQ (5–6 Qs a bartender could repeat), no jargon.
- [ ] **Exec one-pager**: spend band, tonnes, mix, risk posture, renewal outlook, **peer comps** (real named beverage-industry retirements: buyer, tonnes, types), **"why we chose these" narration** in the sustainability lead's voice.
- [ ] Any chart obeys dataviz + style guide (bar only, ≤3 colors, direct labels). Verify each view in browser; commit per view or pair.

### Task 6: Portfolio home (light) + Plan & Decide (teaser)

- [ ] Home: KPI band (tonnes retired, projects, mix, claim status), activity timeline, two CTA cards into Vault + Share.
- [ ] Plan & Decide: criteria summary (New Belgium goals/budget/claims/risk, sample), portfolio-recommendation concept card, "next stage of Carbon Impact" framing.
- [ ] Verify, commit.

### Task 7: Polish, deploy, verify live, talk track

- [ ] Full click-path pass on the LIVE GitHub Pages URL via chrome-devtools: every nav item, every Share view, every vault expand, every link (no 404s, no placeholder text).
- [ ] Mobile-width check.
- [ ] Spot-check every registry fact shown against `merged_events_resolved.csv` (derive, don't assert).
- [ ] Write `TALK_TRACK.md` (per screen: what to click, what to say, the one-liner: "this is what your sustainability lead uses daily; Share is what they hand everyone else").
- [ ] Final commit + push; confirm live URL updated; deliver URL + talk track to Matt.
