// Carbon Impact — ALL demo content lives in this one file.
// Re-skin for another prospect by editing this file only.
//
// Data provenance:
//  - New Belgium retirement history: REAL public registry records (ACR + Verra),
//    verified against CarbonBetter's merged VCM dataset (207,881 retirements).
//  - Proposed portfolio: projects from CarbonBetter's actual New Belgium catalogue
//    (June 2026). Prices shown as indicative BANDS only — firm quotes live in the
//    confidential catalogue, not on this public demo.
//  - Peer comps: REAL named retirements from public registry data.
//  - Contracts, audit trail, and forward-looking records: SAMPLE data, labeled.
window.DATA = {
  productName: "Carbon Impact",
  poweredBy: "CarbonBetter",
  generated: "August 3, 2026",
  company: {
    name: "New Belgium Brewing",
    shortName: "New Belgium",
    context: "Fort Collins, CO · Asheville, NC · Certified B Corp",
  },
  footerNote: "Demonstration workspace. Registry history and peer retirements are real public data; contracts, approvals, and forward records are sample data; pricing is shown as indicative bands only.",
  nav: [
    { id: "home",      label: "Portfolio", icon: "◧" },
    { id: "footprint", label: "Footprint", icon: "◬" },
    { id: "plan",      label: "Plan & Decide", icon: "◇" },
    { id: "vault",     label: "Evidence Vault", icon: "▣" },
    { id: "share",     label: "Share", icon: "➦" },
  ],

  // ---------- Footprint (public reporting + program coverage) ----------
  footprint: {
    total: 286000,
    totalLabel: "≈286,000 t CO₂e",
    year: "2024",
    source: "Public reporting (third-party aggregation of New Belgium disclosures). Replace with your GHG inventory for the live workspace.",
    scopes: [
      { name: "Scope 1 — brewing operations (natural gas, fleet)", tonnes: 21100, share: 7.4 },
      { name: "Scope 2 — purchased electricity", tonnes: 16200, share: 5.7 },
      { name: "Scope 3 — supply chain (packaging, ingredients, logistics, retail)", tonnes: 248700, share: 86.9 },
    ],
    context: "New Belgium has said publicly that roughly 85% of the greenhouse gases in a beer's lifecycle come from the supply chain — glass, aluminum, barley, hops, refrigeration at retail.",
    commitments: [
      { text: "Reduce absolute Scope 1 + 2 emissions 55% by 2030 (2019 baseline)", source: "public target" },
      { text: "Company-wide carbon neutrality by 2030", source: "public commitment" },
      { text: "Fat Tire: PAS 2060 product carbon neutrality, certified by SCS Global Services (Feb 2024)", source: "public certification" },
    ],
    coverage: [
      { label: "Fat Tire + Mountain Time brand program", covered: "Fully covered", detail: "Your 2024–25 retirements (15,000 t) were designated for these brands — the PAS 2060 pathway." },
      { label: "Scope 1 + 2 (≈37,300 t)", covered: "≈27% of one year", detail: "The proposed 10,000 t portfolio equals about a quarter of annual operational emissions." },
      { label: "Total footprint (≈286,000 t)", covered: "≈3.5% of one year", detail: "Credits are the last mile, not the plan. Reduction work carries the 2030 commitment; the credit program grows as the residual shrinks." },
    ],
    trajectory: "The 2030 company-wide carbon-neutral commitment implies a credit program an order of magnitude larger than today's — which is why portfolio design, evidence, and claims discipline matter now.",
  },

  // ---------- REAL registry history (public data) ----------
  history: [
    {
      date: "2025-08-29", registry: "American Carbon Registry", registryShort: "ACR",
      tonnes: 10000, projectId: "ACR992", project: "HT HFC Reclamation Project Champaign 2023",
      type: "Industrial Process Emissions", country: "US",
      reason: "Retired on behalf of New Belgium Brewing Company for CY24 and CY25 Fat Tire Ale and Mountain Time Lager Emissions",
      real: true,
    },
    {
      date: "2024-12-20", registry: "American Carbon Registry", registryShort: "ACR",
      tonnes: 5000, projectId: "ACR847", project: "HT HFC Reclamation Project Champaign 2022",
      type: "Industrial Process Emissions", country: "US",
      reason: "Retired on behalf of New Belgium Brewing Company for CY23 Fat Tire Ale and Mountain Time Lager Emissions",
      real: true,
    },
    {
      date: "2021-03-30", registry: "Verra", registryShort: "VCS",
      tonnes: 597, projectId: "VCS 756", project: "Crow Lake Wind Emissions Reduction Project",
      type: "Renewable energy", country: "United States",
      reason: "Retired on behalf of New Belgium Brewing Company.",
      real: true,
    },
  ],

  // ---------- Purchasing criteria (from the actual CarbonBetter catalogue for New Belgium) ----------
  criteria: [
    { name: "Geography", detail: "USA, Canada, and Mexico only — prioritizing states in New Belgium's value chain: Montana, North Carolina, Michigan, Virginia, Colorado, Idaho, Washington." },
    { name: "Project types", detail: "No renewable-energy credits (wind, solar, hydro). Limited forestry, reflecting historical preference." },
    { name: "Quality bar", detail: "Latest methodologies and ICVCM Core Carbon Principles (CCP) approval prioritized, plus independent ratings (BeZero, Sylvera) where available." },
    { name: "Removals", detail: "A measured share of removal credits included, balanced against price." },
    { name: "Claims", detail: "Every purchase must support the Fat Tire and Mountain Time carbon-neutral program and survive legal review of public claims." },
  ],

  // ---------- Proposed portfolio (real catalogue projects; indicative price bands) ----------
  portfolio: {
    year: "2026–27",
    totalTonnes: 10000,
    spendBand: "$120k–$160k",
    projects: [
      {
        id: "VCS 1960", registry: "Verra", registryShort: "VCS",
        registryUrl: "https://registry.verra.org/app/projectDetail/VCS/1960",
        name: "Northern Great Plains Regenerative Grazing",
        criteriaFit: ["Value-chain states: MT · ID · WA", "Removal credits", "Rated A (BeZero)"],
        location: "Montana (plus WY, ID, WA, ND, SD)", theme: "Regenerative agriculture",
        creditType: "Removal", methodology: "Sustainable grazing management (SNAPGRAZE-modeled)",
        verifier: "Aster Global Environmental Solutions", rating: "A (BeZero)",
        tonnes: 2000, priceBand: "$20–25/t",
        story: "Ranchers across the Northern Great Plains — Montana barley country — adopt adaptive multi-paddock grazing that restores degraded grasslands, rebuilds soil health, and pulls carbon into the ground. The same landscapes that grow brewing barley.",
        risks: "Soil-carbon models (SNAPGRAZE) validated against ranch records and GIS analysis; removal permanence managed through buffer pool.",
      },
      {
        id: "ACR745", registry: "American Carbon Registry", registryShort: "ACR",
        registryUrl: "https://acr2.apx.com/",
        name: "Northern Cheyenne Forest Carbon Project",
        criteriaFit: ["Value-chain state: MT", "CCP Approved", "Removal (IFM)", "100% Tribal-owned"],
        location: "Northern Cheyenne Reservation, Montana", theme: "Community & Indigenous stewardship",
        creditType: "Removal (IFM)", methodology: "ACR Improved Forest Management",
        verifier: "Per ACR listing", rating: "CCP Approved",
        tonnes: 1500, priceBand: "$15–20/t",
        story: "90,433 acres of 100% Tribal-owned ponderosa pine forest managed for carbon, drought and fire resilience — income that stays with the Northern Cheyenne community.",
        risks: "IFM baseline risk mitigated by CCP approval and conservative harvest-deferral accounting.",
      },
      {
        id: "CAR 866", registry: "Climate Action Reserve", registryShort: "CAR",
        registryUrl: "https://thereserve2.apx.com/",
        name: "Cedar Grove – Maple Valley Composting",
        criteriaFit: ["Value-chain state: WA", "Non-renewable project type", "Food-waste circularity"],
        location: "Maple Valley, Washington", theme: "Food-waste circularity",
        creditType: "Avoidance", methodology: "CAR Organic Waste Composting",
        verifier: "Agri-Waste Technology", rating: "—",
        tonnes: 1500, priceBand: "$10–15/t",
        story: "Food waste and food-soiled paper composted aerobically instead of landfilled — avoided methane in a value-chain state, and a natural story for a company that turns grain into beer and spent grain into cattle feed.",
        risks: "Continuous monitoring of temperature, oxygen, and waste sourcing at the facility.",
      },
      {
        id: "ACR 1114", registry: "American Carbon Registry", registryShort: "ACR",
        registryUrl: "https://acr2.apx.com/",
        name: "Advanced Refrigeration (ARS2023007)",
        criteriaFit: ["Home state: CO", "Brewery-relevant technology", "Recent vintage (2024)"],
        location: "Windsor & Commerce City, Colorado (plus PA, VA, MN)", theme: "Refrigeration technology",
        creditType: "Avoidance", methodology: "ACR Advanced Refrigeration Systems",
        verifier: "TÜV SÜD America", rating: "—",
        tonnes: 2000, priceBand: "$10–15/t",
        story: "Cold-storage facilities — including two in New Belgium's home state — built with ultra-low-GWP CO₂ and ammonia refrigeration instead of HFC systems. Refrigeration is a brewery's language.",
        risks: "10-year crediting period; avoided first-fill, service, and end-of-life HFC emissions quantified per ACR methodology.",
      },
      {
        id: "CAR 560", registry: "Climate Action Reserve", registryShort: "CAR",
        registryUrl: "https://thereserve2.apx.com/",
        name: "New River Landfill Gas (LFG to Energy)",
        criteriaFit: ["Value-chain state: VA", "CCP Approved", "Price-balanced"],
        location: "Dublin, Virginia", theme: "Methane destruction",
        creditType: "Avoidance", methodology: "CAR U.S. Landfill Protocol",
        verifier: "SCS Global", rating: "CCP Approved",
        tonnes: 2500, priceBand: "$5–10/t",
        story: "Landfill gas captured and destroyed in twelve generators and a flare in Virginia — a value-chain state. Continuously metered methane destruction: the cost-effective workhorse of the portfolio.",
        risks: "Robust MRV: continuous flow metering, weekly data collection, regular calibration.",
      },
      {
        id: "ACR 222", registry: "American Carbon Registry", registryShort: "ACR",
        registryUrl: "https://acr2.apx.com/",
        name: "Prairie Pothole Avoided Grassland Conversion",
        criteriaFit: ["Rated AA (BeZero)", "Permanent easements", "USA"],
        location: "North Dakota", theme: "Native prairie protection",
        creditType: "Avoidance", methodology: "ACR Avoided Conversion of Grasslands and Shrublands",
        verifier: "SCS Global Services", rating: "AA (BeZero)",
        tonnes: 500, priceBand: "$20–30/t",
        story: "Native grasslands across 74 parcels protected by permanent conservation easements — soil carbon kept in the ground and duck-country habitat kept wild. One of the highest-rated projects in the U.S. market.",
        risks: "Permanence secured by perpetual easements with sodbusting restrictions, monitored by the U.S. Fish & Wildlife Service.",
      },
    ],
    alternatives: "Selected from a 26-project curated catalogue spanning HFC replacement, advanced refrigeration, soil carbon, improved forest management, landfill gas, composting, N₂O abatement, and energy demand. Rejected for this mix: renewable-energy credits (excluded by criteria), lowest-cost HFC replacement as the majority sleeve (continuity option retained as an alternative), and international projects outside North America (geography criterion).",
  },

  // ---------- REAL peer comps (public registry data) ----------
  peerComps: [
    { buyer: "BrewDog", detail: "450,000 t from the Darkwoods Forest Carbon Project (Verra), 2020–21 — the largest craft-brewery retirement on record, and the same project offered in New Belgium's CarbonBetter catalogue.", tonnes: 450000, segment: "Craft brewer" },
    { buyer: "Coca-Cola Europacific Partners", detail: "49,635 t of forestry and peatland credits (Verra), 2022–23 — Katingan Peatland and Rimba Raya.", tonnes: 49635, segment: "Beverage" },
    { buyer: "China Resources Snow Breweries", detail: "21,564 t from a composting project (Verra), 2026 — the world's largest beer producer by volume buying waste-stream credits.", tonnes: 21564, segment: "Brewer" },
    { buyer: "Keurig (Canada)", detail: "15,357 t of forestry and shade coffee/cacao reforestation credits (Verra), 2021–25.", tonnes: 15357, segment: "Beverage" },
    { buyer: "New Belgium Brewing", detail: "15,597 t retired to date across ACR and Verra (2021–2025), anchored by the Fat Tire and Mountain Time carbon-neutral program.", tonnes: 15597, segment: "You", you: true },
    { buyer: "Diageo", detail: "12,907 t of grassland and afforestation credits (Verra), 2021–24 — including the Guoluo Grassland Sustainable Management Project.", tonnes: 12907, segment: "Beverage & spirits" },
    { buyer: "Red Bull", detail: "12,252 t of cookstove and wind credits (Gold Standard), 2023.", tonnes: 12252, segment: "Beverage" },
    { buyer: "Tsingtao Brewery", detail: "≈8,500 t across group entities (Verra), 2024–25 — wind and afforestation.", tonnes: 8500, segment: "Brewer" },
  ],

  // ---------- Evidence Vault ----------
  vault: {
    // Real records + proposed forward records (clearly marked)
    retirements: [
      { status: "Retired", real: true,  date: "2025-08-29", registry: "ACR", serial: "Registry-verified · ACR992 · 2023 vintage", project: "HT HFC Reclamation Project Champaign 2023", tonnes: 10000, purpose: "CY24 + CY25 Fat Tire Ale and Mountain Time Lager emissions" },
      { status: "Retired", real: true,  date: "2024-12-20", registry: "ACR", serial: "Registry-verified · ACR847 · 2022 vintage", project: "HT HFC Reclamation Project Champaign 2022", tonnes: 5000, purpose: "CY23 Fat Tire Ale and Mountain Time Lager emissions" },
      { status: "Retired", real: true,  date: "2021-03-30", registry: "Verra", serial: "Registry-verified · VCS 756", project: "Crow Lake Wind Emissions Reduction Project", tonnes: 597, purpose: "Retired on behalf of New Belgium Brewing Company" },
      { status: "Proposed", real: false, date: "2026 Q4 (planned)", registry: "Verra", serial: "Assigned at retirement", project: "Northern Great Plains Regenerative Grazing (VCS 1960)", tonnes: 2000, purpose: "CY26 program — regenerative agriculture sleeve" },
      { status: "Proposed", real: false, date: "2026 Q4 (planned)", registry: "ACR / CAR", serial: "Assigned at retirement", project: "Remaining 2026–27 portfolio (5 projects)", tonnes: 8000, purpose: "CY26 program — per allocation in Plan & Decide" },
    ],
    contracts: [
      { sample: true, counterparty: "CarbonBetter (buyer's agent)", scope: "2026–27 portfolio · 10,000 t across 6 projects", status: "Draft", terms: "Delivery vs. payment on retirement; replacement rights on under-delivery; vintage and volume per allocation table." },
      { sample: true, counterparty: "Project sleeves (via CarbonBetter network)", scope: "Spot purchase, current vintages", status: "Pending approval", terms: "Firm quotes per the confidential catalogue; price bands shown here are indicative." },
    ],
    auditTrail: [
      { sample: true, date: "2026-08-14", actor: "Sustainability Lead", action: "Portfolio recommendation accepted for internal review" },
      { sample: true, date: "2026-08-21", actor: "Legal Counsel", action: "Claims language pack approved with two edits (see Legal & Claims)" },
      { sample: true, date: "2026-08-28", actor: "CFO", action: "Budget band approved for FY26–27" },
      { sample: true, date: "2026-09-04", actor: "CEO", action: "Program renewal signed off" },
    ],
    claims: [
      { claim: "Fat Tire and Mountain Time are part of our carbon-neutral program", status: "Substantiated", evidence: "10,000 t (2025) and 5,000 t (2024) registry retirements explicitly designated for these brands — public ACR records." },
      { claim: "Our 2026 portfolio invests in regenerative agriculture in barley country", status: "Ready when retired", evidence: "VCS 1960 allocation (2,000 t) + retirement certificate on completion; approved wording in Marketing Kit." },
      { claim: "We support Tribal-led forest stewardship", status: "Ready when retired", evidence: "ACR745 allocation (1,500 t), 100% Tribal-owned project; wording reviewed by Legal." },
      { claim: "\"We are a carbon-neutral company\"", status: "Not approved", evidence: "Company-wide neutrality claim exceeds current program scope — brand-level claims only. See guardrails." },
    ],
  },

  // ---------- Share views ----------
  share: {
    updated: "August 3, 2026",
    marketing: {
      approved: [
        { use: "Brand claim", text: "Fat Tire and Mountain Time emissions are addressed through verified carbon credits, retired on public registries you can check yourself." },
        { use: "Portfolio story", text: "Our carbon portfolio invests where we live and brew: regenerative grazing in Montana barley country, Tribal-led forestry, and methane destruction in our value-chain states." },
        { use: "Social copy", text: "Every credit we retire has a name, a serial number, and a public record. That's the point. 🍺🌾" },
      ],
      guardrails: [
        { dont: "\"We are carbon neutral\" (company-wide)", do: "\"Fat Tire and Mountain Time are part of our carbon-neutral program\" — brand-scoped, registry-backed." },
        { dont: "\"Our credits remove carbon\" (portfolio-wide)", do: "\"Our portfolio includes removal credits from regenerative grazing and forestry\" — 35% of the proposed mix is removals; say which." },
        { dont: "\"Offsetting makes our beer zero-impact\"", do: "Credits complement reduction work; lead with brewery efficiency and packaging progress, then the portfolio." },
      ],
      stories: "Each portfolio project ships with a 100-word story, location, and co-benefit summary (see project cards) cleared for packaging inserts, web, and social.",
    },
    legal: {
      checklist: [
        { item: "California AB 1305 disclosure (voluntary carbon market disclosures)", status: "Template ready", note: "Project name, registry, ID, type, and vintage for every retirement — auto-compiled from the vault." },
        { item: "FTC Green Guides review of claim wording", status: "In review", note: "All approved phrasings routed through Legal; banned phrasings documented." },
        { item: "Claim-to-evidence map", status: "Live", note: "Every public claim links to registry records in the Evidence Vault." },
        { item: "Approval history", status: "Live", note: "Who approved which wording, when — preserved for audit." },
      ],
      note: "Registry details for every holding (registry, project ID, methodology, vintage, serials) are maintained in the Evidence Vault and exportable for counsel.",
    },
    finance: {
      budgetBand: "$120k–$160k for 10,000 t (2026–27) — indicative; firm quotes in the confidential catalogue.",
      allocation: true, // rendered from portfolio.projects
      schedule: [
        { sample: true, milestone: "Contract execution", timing: "On approval", amount: "—" },
        { sample: true, milestone: "Delivery & retirement (tranche 1)", timing: "2026 Q4", amount: "≈60% of program" },
        { sample: true, milestone: "Delivery & retirement (tranche 2)", timing: "2027 Q2", amount: "remainder" },
      ],
      audit: "Every dollar maps to a registry-verified retirement record in the Evidence Vault — auditors get serials, dates, and certificates, not a spreadsheet reconstruction.",
      alternatives: true, // rendered from portfolio.alternatives
    },
    employee: {
      headline: "What we did, and why it's real",
      body: [
        "Beer starts with barley, water, and hops — all of it grown in a climate we can't take for granted. We cut our own emissions first: brewery efficiency, renewable electricity, lighter packaging. For the emissions that remain on Fat Tire and Mountain Time, we buy carbon credits — and not the sketchy kind.",
        "Every credit we buy is verified by an independent registry, has a public serial number, and gets 'retired' — permanently taken off the market — in our name. You can look our retirements up yourself on the American Carbon Registry and Verra. Since 2021 we've retired more than 15,000 tonnes.",
        "Our next portfolio invests close to home: ranchers in Montana barley country rebuilding soil, the Northern Cheyenne Nation managing their own forest, food-waste composting in Washington, and methane capture in Virginia.",
      ],
      faq: [
        { q: "Are carbon credits just paying to pollute?", a: "No — they come after reduction work, not instead of it. And ours are verified, serial-numbered, and public." },
        { q: "How do I know the projects are real?", a: "Every retirement has a public registry record. Ask the sustainability team for the link — or check the Evidence Vault." },
        { q: "Can I say our beer is carbon neutral?", a: "Say Fat Tire and Mountain Time are part of our carbon-neutral program. Don't say the whole company is carbon neutral." },
        { q: "Why these projects?", a: "They're in the places we brew and source — Montana, Colorado, Washington, Virginia — and they're independently rated." },
        { q: "What does 'retired' mean?", a: "A retired credit is permanently cancelled on the registry so nobody else can claim it. It's the carbon equivalent of burning the ticket stub." },
      ],
    },
    exec: {
      kpis: true, // rendered from portfolio + history
      narration: {
        title: "Why we chose these credits — Sustainability Lead",
        text: "We kept the discipline that built the Fat Tire program: every tonne verified, every retirement public. What changes this cycle is the story. Instead of a single industrial project type, this portfolio puts nearly 80% of our spend into the landscapes our beer comes from — Montana grazing land, Tribal forest, Washington composting, Colorado cold storage — and adds independently top-rated projects (BeZero A and AA, ICVCM CCP-approved) that survive legal review of every claim we want marketing to make. Blended cost stays inside the band finance approved, with 35% of the volume in removals rather than avoidance only.",
      },
      risk: "Portfolio risk posture: 6 projects across 5 states and 3 registries; 35% removals; 3 of 6 holdings CCP-approved or A/AA-rated; no single project exceeds 25% of volume.",
      renewal: "Renewal outlook: current run-rate ≈5,000 t/yr retired for brand programs; proposed program covers 2026–27 with an annual review gate each August.",
    },
  },

  // ---------- Plan & Decide (teaser) ----------
  plan: {
    stages: ["Define criteria", "Recommend portfolio", "Diligence", "Approve", "Purchase & retire", "Report & share", "Renew"],
    note: "Plan & Decide is where the next purchase cycle starts: criteria in, recommended portfolio out, with rationale and trade-offs documented. This demo shows the criteria and the resulting recommendation; the full scenario workspace is the next stage of Carbon Impact.",
  },
};
