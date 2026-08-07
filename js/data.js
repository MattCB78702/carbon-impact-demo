// Carbon Impact — company-specific content. The 26-project catalogue lives in catalogue.js.
//
// Product purpose (Matt, 2026-08-07): this is a tool to UNDERSTAND and COMMUNICATE,
// not to manage the procurement process. Four jobs: educate, select, benchmark,
// communicate. CarbonBetter does the diligence; the platform makes it legible.
//
// Provenance rules enforced in the UI:
//   registry  = real public registry record
//   public    = the company's own public reporting
//   catalogue = CarbonBetter's real June 2026 catalogue for this client
//   market    = derived from our merged 5-registry dataset (207,881 retirements)
//   sample    = illustrative, labelled in the interface
window.DATA = {
  productName: "Carbon Impact",
  poweredBy: "CarbonBetter",
  company: {
    name: "New Belgium Brewing",
    shortName: "New Belgium",
    context: "Fort Collins, CO · Asheville, NC · Certified B Corp",
  },
  footerNote: "Demonstration workspace. Registry records, peer retirements, and market figures are real public data. Pricing is shown as indicative bands; firm quotes stay in your catalogue.",

  nav: [
    { id: "footprint", label: "Your Footprint" },
    { id: "quality",   label: "Quality and Co-benefits" },
    { id: "explore",   label: "Explore Credits" },
    { id: "portfolio", label: "Your Portfolio" },
    { id: "benchmark", label: "Benchmark" },
    { id: "share",     label: "Share" },
  ],

  // ---------------------------------------------------------------- Footprint
  footprint: {
    headline: "Credits only mean something next to the number they are measured against.",
    total: 286000,
    totalLabel: "286,000",
    year: "2024",
    source: "public",
    sourceNote: "Public reporting. The live workspace runs on your own greenhouse gas inventory.",
    scopes: [
      { name: "Scope 3 — supply chain", detail: "Packaging, ingredients, logistics, retail refrigeration", tonnes: 248700, share: 86.9 },
      { name: "Scope 1 — brewing operations", detail: "Natural gas, fleet", tonnes: 21100, share: 7.4 },
      { name: "Scope 2 — purchased electricity", detail: "Grid power across both breweries", tonnes: 16200, share: 5.7 },
    ],
    context: "New Belgium has said publicly that roughly 85% of the greenhouse gases in a beer's lifecycle come from the supply chain: glass, aluminium, barley, hops, and refrigeration at retail.",
    coverage: [
      { label: "Fat Tire and Mountain Time brand program", covered: "Fully covered", detail: "Your 2024 and 2025 retirements, 15,000 tonnes, were designated for these brands. This is the PAS 2060 pathway." },
      { label: "Scope 1 and 2 combined, 37,300 t", covered: "27%", detail: "The proposed 10,000 tonne portfolio equals roughly a quarter of annual operational emissions." },
      { label: "Total footprint, 286,000 t", covered: "3.5%", detail: "Credits are the last mile, not the plan. Reduction work carries the 2030 commitment; the credit program grows as the residual shrinks." },
    ],
    commitments: [
      "Reduce absolute Scope 1 and 2 emissions 55% by 2030, against a 2019 baseline",
      "Company-wide carbon neutrality by 2030",
      "Fat Tire holds PAS 2060 product carbon neutrality, certified by SCS Global Services in February 2024",
    ],
    trajectory: "A company-wide neutral commitment by 2030 implies a credit program an order of magnitude larger than today's. That is why quality, evidence, and claims discipline are worth settling now, while the volumes are still small.",
  },

  // ---------------------------------------------- Real public retirement history
  history: [
    { date: "2025-08-29", registry: "American Carbon Registry", id: "ACR992", tonnes: 10000,
      project: "HT HFC Reclamation Project Champaign 2023", type: "Industrial process emissions",
      purpose: "Retired on behalf of New Belgium Brewing Company for CY24 and CY25 Fat Tire Ale and Mountain Time Lager Emissions" },
    { date: "2024-12-20", registry: "American Carbon Registry", id: "ACR847", tonnes: 5000,
      project: "HT HFC Reclamation Project Champaign 2022", type: "Industrial process emissions",
      purpose: "Retired on behalf of New Belgium Brewing Company for CY23 Fat Tire Ale and Mountain Time Lager Emissions" },
    { date: "2021-03-30", registry: "Verra", id: "VCS 756", tonnes: 597,
      project: "Crow Lake Wind Emissions Reduction Project", type: "Renewable energy",
      purpose: "Retired on behalf of New Belgium Brewing Company." },
  ],

  // ------------------------------------------------- Quality and Co-benefits
  quality: {
    headline: "What separates a credit worth buying from one worth avoiding.",
    intro: "Every project in your catalogue was assessed against the same questions before it reached you. This page explains those questions, so the recommendation is something you can interrogate rather than something you have to trust.",
    questions: [
      { q: "Additionality", plain: "Would this have happened anyway?",
        detail: "If the emissions reduction would have occurred without carbon finance, the credit represents nothing. Regulatory requirements, existing economics, and standard industry practice all have to be ruled out.",
        example: "Refrigeration projects are assessed against what a developer would have installed anyway. Ultra-low-GWP systems cost more than the conventional default, which is what makes the credit real." },
      { q: "Quantification", plain: "How do we know it is a tonne?",
        detail: "The methodology defines how the reduction is measured against a counterfactual baseline. Continuously metered projects carry far less uncertainty than modelled ones.",
        example: "Landfill gas is metered continuously: flow, methane concentration, and flare temperature. Soil carbon is modelled, which is why it carries a larger buffer." },
      { q: "Permanence and reversal", plain: "Can the carbon come back out?",
        detail: "Biological storage can reverse through fire, disease, harvest, or a change of ownership. Buffer pools and legal protections manage that risk. Industrial destruction cannot reverse: the molecule is gone.",
        example: "Prairie Pothole grasslands are protected by permanent conservation easements. Nitrous oxide abatement has no reversal risk at all." },
      { q: "Leakage", plain: "Did the emissions just move somewhere else?",
        detail: "If protecting one forest pushes logging into the next valley, the net benefit shrinks. Methodologies estimate and deduct leakage.",
        example: "Improved forest management projects deduct for harvest displaced onto other land." },
      { q: "Safeguards and governance", plain: "Who benefits, and did they consent?",
        detail: "Land-based projects affect people who live there. Free prior informed consent, benefit sharing, and grievance mechanisms separate credible projects from extractive ones.",
        example: "The Northern Cheyenne project is on 100% Tribal-owned land and managed by the Nation itself, so the revenue stays with the community." },
    ],
    ratings: {
      intro: "Three independent signals appear in your catalogue. They are not interchangeable.",
      items: [
        { name: "ICVCM Core Carbon Principles", what: "A threshold, not a score. The Integrity Council for the Voluntary Carbon Market assesses whether a methodology meets a baseline of integrity. A project is approved or it is not.", use: "The closest thing the market has to a floor. Useful for defending a purchase to a board." },
        { name: "BeZero", what: "A risk rating, AAA down to D, expressing confidence that a credit achieves a tonne of avoidance or removal.", use: "Comparative. An A and a BBB in the same project type is a meaningful difference." },
        { name: "Sylvera", what: "An independent rating agency scoring carbon accounting, additionality, permanence, and co-benefits separately.", use: "Useful when you want to see which dimension is weak rather than one blended grade." },
      ],
    },
    avoidanceVsRemoval: {
      intro: "The single distinction most likely to be raised by a journalist or an auditor.",
      avoidance: "Stops emissions that would otherwise have happened. Landfill methane destroyed, refrigerant never released, nitrous oxide broken down. Cheaper, immediate, and does not reduce the stock of carbon already in the atmosphere.",
      removal: "Takes carbon out of the atmosphere and stores it. Grassland soil, growing forest. More expensive, slower, and carries reversal risk, but it is what net zero frameworks increasingly require.",
      guidance: "Most credible programs hold both, and disclose the split rather than blurring it. Your proposed portfolio is 35% removals by volume.",
    },
    coBenefits: {
      intro: "The reason a project is worth talking about, and the reason to be careful how you talk about it.",
      body: "Co-benefits are the effects beyond the tonne: household air quality, water, habitat, jobs, community income. They are usually why a project resonates with employees and customers. They are also the easiest thing to overstate, because they are rarely measured with the same rigour as the carbon.",
      rule: "Claim a co-benefit only where the project documentation evidences it. Where a project is certified under CCB or SD VISta, that certification is the evidence. Where it is not, describe the activity rather than asserting the outcome.",
    },
    catalogueNote: "Of the 26 projects curated for you, 17 carry at least one independent quality signal, and 8 include removals.",
  },

  // ------------------------------------------------------------- Your Portfolio
  criteria: {
    intro: "Everything below follows from what you told us mattered. These were the filters applied to the whole market before a single project was recommended.",
    items: [
      { name: "Geography", detail: "United States, Canada, and Mexico only, prioritising states in your value chain: Montana, North Carolina, Michigan, Virginia, Colorado, Idaho, and Washington.", effect: "Removed every international project, which is most of the market by volume." },
      { name: "Project types", detail: "No renewable energy credits. Limited forestry, reflecting your stated preference.", effect: "Removed wind, solar, and hydro entirely, and capped forestry exposure." },
      { name: "Quality bar", detail: "Latest methodologies and ICVCM Core Carbon Principles approval prioritised, with independent ratings where available.", effect: "17 of 26 shortlisted projects carry an independent quality signal." },
      { name: "Removals", detail: "A measured share of removals, balanced against price.", effect: "35% of the proposed volume is removals rather than avoidance alone." },
      { name: "Claims", detail: "Every purchase must support the Fat Tire and Mountain Time program and survive legal review of the public claims made about it.", effect: "Shaped the wording in the Share tab, not just the project list." },
    ],
  },
  portfolio: {
    year: "2026–27",
    totalTonnes: 10000,
    spendBand: "$120k–$160k",
    projects: [
      { key: "s16", tonnes: 2000, role: "Anchor removal",
        why: "Ranchers across Montana barley country adopt adaptive multi-paddock grazing that rebuilds soil and pulls carbon down. The same landscapes that grow brewing barley.",
        fits: ["Value-chain states", "Removals", "BeZero A"] },
      { key: "s17", tonnes: 1500, role: "Community removal",
        why: "90,433 acres of Tribal-owned ponderosa pine managed by the Northern Cheyenne Nation for carbon, drought, and fire resilience. Revenue stays with the community.",
        fits: ["Value-chain state", "ICVCM CCP", "Removals"] },
      { key: "s11", tonnes: 2000, role: "Home-state technology",
        why: "Cold storage built with ultra-low-GWP carbon dioxide and ammonia refrigeration instead of HFC systems, including two Colorado sites. Refrigeration is a language your engineers already speak.",
        fits: ["Home state", "Recent vintage"] },
      { key: "s12", tonnes: 2500, role: "Cost-effective core",
        why: "Landfill gas captured and destroyed in Virginia, a value-chain state, with continuous metering. The workhorse that keeps blended cost inside the band.",
        fits: ["Value-chain state", "ICVCM CCP", "Continuously metered"] },
      { key: "s14", tonnes: 1500, role: "Circularity story",
        why: "Food waste composted aerobically instead of landfilled in Washington. A natural fit for a company that already sends spent grain to cattle feed.",
        fits: ["Value-chain state", "Waste diversion"] },
      { key: "s24", tonnes: 500, role: "Highest-rated",
        why: "Native prairie across 74 parcels held under permanent conservation easements. One of the highest-rated projects in the United States market.",
        fits: ["BeZero AA", "Permanent easements"] },
    ],
    setAside: [
      { what: "The HFC replacement sleeve", why: "Your current program runs on industrial gas projects at $2 to $3 per tonne. Keeping it would have held cost down, but it concentrates the entire program in one project type and gives marketing nothing new to say. Retained as a continuity option." },
      { what: "Darkwoods Forest Carbon Project", why: "The strongest forestry project in the catalogue, and the one BrewDog used for 450,000 tonnes. Set aside to respect your stated limit on forestry exposure, not on quality grounds." },
      { what: "International projects", why: "Excluded by the geography criterion before assessment, which removes most of the market by volume." },
    ],
  },

  // ---------------------------------------------------------------- Benchmark
  benchmark: {
    headline: "You are already in the top decile of your industry, buying a project type your industry does not buy.",
    intro: "Derived from our merged registry dataset: 207,881 retirements across Verra, Gold Standard, the American Carbon Registry, the Climate Action Reserve, and Isometric. Every buyer named below disclosed their retirement publicly.",
    stats: [
      { num: "7th", of: "of 74", label: "Your rank among beverage and brewing buyers by volume retired" },
      { num: "693 t", of: "median", label: "What a typical beverage buyer retires in total. You have retired 15,597." },
      { num: "1.00 Mt", of: "total", label: "Retired by the beverage and brewing sector across the public registries" },
    ],
    peers: [
      { buyer: "BrewDog", tonnes: 450000, note: "A single forestry position: 450,000 tonnes from Darkwoods, which is also in your catalogue. An outlier, and a cautionary one, given the scrutiny that followed their carbon-negative claim." },
      { buyer: "Coca-Cola Europacific Partners", tonnes: 49635, note: "Forestry and peatland, 2022 to 2023." },
      { buyer: "China Resources Snow Breweries", tonnes: 21564, note: "The world's largest brewer by volume, buying composting credits in 2026." },
      { buyer: "Keurig (Canada)", tonnes: 15357, note: "Forestry and shade-grown coffee reforestation." },
      { buyer: "New Belgium Brewing", tonnes: 15597, note: "Industrial process emissions, tied explicitly to Fat Tire and Mountain Time.", you: true },
      { buyer: "Diageo", tonnes: 12907, note: "Grassland and afforestation." },
      { buyer: "Red Bull", tonnes: 12252, note: "Cookstoves and wind." },
      { buyer: "Tsingtao Brewery", tonnes: 8500, note: "Wind and afforestation across group entities." },
    ],
    mix: {
      intro: "What the beverage sector actually buys, by tonnage:",
      items: [
        { type: "Forestry and land use", share: 60 },
        { type: "Livestock and manure management", share: 15 },
        { type: "Energy industries", share: 11 },
        { type: "Solar thermal", share: 9 },
        { type: "Industrial process emissions", share: 2 },
      ],
      insight: "Your industry buys forestry. You buy industrial gas. That has been a defensible position on quality grounds, since metered industrial destruction carries less uncertainty than modelled forest carbon. It is a weaker position on story, and it leaves you exposed to the criticism that your credits have nothing to do with beer. The proposed portfolio moves you toward the landscapes in your supply chain without abandoning the metered core.",
    },
  },

  // -------------------------------------------------------------------- Share
  share: {
    intro: "Two audiences, two moments. Before the purchase you need approval. After it you need to explain what you did without overstating it. Both are generated from the same portfolio record.",
    presale: [
      { id: "exec", role: "Executives", title: "Executive one-pager", blurb: "Spend, volume, risk posture, where you stand against peers, and why this portfolio." },
      { id: "finance", role: "Finance and accounting", title: "Finance pack", blurb: "Budget band, allocation, price context, and what was considered and set aside." },
      { id: "legal", role: "Legal and compliance", title: "Legal and claims pack", blurb: "Approved wording, what may not be said, disclosure readiness, and the evidence behind each claim." },
    ],
    postsale: [
      { id: "marketing", role: "Marketing and communications", title: "Marketing kit", blurb: "Approved claims, project stories, and the guardrails that keep them safe." },
      { id: "employee", role: "Everyone", title: "Employee page", blurb: "What we did and why it is real, in plain language, with an FAQ." },
      { id: "records", role: "Anyone who asks", title: "Retirement records", blurb: "The public registry records behind every claim, with serials and purpose." },
    ],
    exec: {
      narration: "We kept the discipline that built the Fat Tire program: every tonne verified, every retirement public. What changes this cycle is the story. Instead of one industrial project type, this portfolio puts nearly 80% of spend into the landscapes our beer comes from, and adds independently top-rated projects that survive legal review of every claim we want to make. Blended cost stays inside the band finance approved, with 35% of volume in removals rather than avoidance alone.",
      risk: "Six projects across five states and three registries. No single project exceeds 25% of volume. Three of six carry ICVCM Core Carbon Principles approval or an A or AA rating. Removals are 35% of volume.",
      renewal: "Current run rate is roughly 5,000 tonnes a year for the brand programs. This proposal covers 2026 to 2027 with an annual review each August.",
    },
    legal: {
      checklist: [
        { item: "California Assembly Bill 1305 disclosure", status: "Template ready", note: "Project name, registry, identifier, type, and vintage for every retirement, compiled from the records." },
        { item: "Green Guides review of claim wording", status: "In review", note: "Approved phrasings and banned phrasings both documented." },
        { item: "Claim-to-evidence map", status: "Live", note: "Every public claim links to the registry record that substantiates it." },
      ],
      claims: [
        { claim: "Fat Tire and Mountain Time are part of our carbon-neutral program", status: "Substantiated", evidence: "10,000 tonne and 5,000 tonne registry retirements naming these brands explicitly. Public ACR records." },
        { claim: "Our portfolio invests in regenerative agriculture in barley country", status: "Ready on retirement", evidence: "2,000 tonne allocation to the Northern Great Plains project, with certificate on completion." },
        { claim: "We support Tribal-led forest stewardship", status: "Ready on retirement", evidence: "1,500 tonne allocation to a 100% Tribal-owned project." },
        { claim: "We are a carbon-neutral company", status: "Not approved", evidence: "Company-wide neutrality exceeds the program's scope. Brand-level claims only." },
      ],
    },
    marketing: {
      approved: [
        { use: "Brand claim", text: "Fat Tire and Mountain Time emissions are addressed through verified carbon credits, retired on public registries you can check yourself." },
        { use: "Portfolio story", text: "Our carbon portfolio invests where we brew and where we source: regenerative grazing in Montana barley country, Tribal-led forestry, and methane capture in our value-chain states." },
        { use: "Social", text: "Every credit we retire has a name, a serial number, and a public record. That is the point." },
      ],
      guardrails: [
        { dont: "We are carbon neutral", do: "Fat Tire and Mountain Time are part of our carbon-neutral program. Brand-scoped, registry-backed." },
        { dont: "Our credits remove carbon", do: "Our portfolio includes removal credits from regenerative grazing and forestry. 35% of volume is removals. Say which." },
        { dont: "Offsetting makes our beer zero-impact", do: "Lead with brewery efficiency and packaging progress, then the portfolio. Credits complete the work, they do not replace it." },
      ],
    },
    employee: {
      body: [
        "Beer starts with barley, water, and hops, all of it grown in a climate we cannot take for granted. We cut our own emissions first: brewery efficiency, renewable electricity, lighter packaging. For the emissions that remain on Fat Tire and Mountain Time, we buy carbon credits, and not the sketchy kind.",
        "Every credit we buy is verified by an independent registry, carries a public serial number, and is retired, meaning permanently taken off the market, in our name. You can look our retirements up yourself. Since 2021 we have retired more than 15,000 tonnes.",
        "Our next portfolio invests close to home: ranchers in Montana barley country rebuilding soil, the Northern Cheyenne Nation managing their own forest, food-waste composting in Washington, and methane capture in Virginia.",
      ],
      faq: [
        { q: "Are carbon credits just paying to pollute?", a: "They come after reduction work, not instead of it. Ours are verified, serial-numbered, and public." },
        { q: "How do I know the projects are real?", a: "Every retirement has a public registry record. The Retirement records page lists them." },
        { q: "Can I say our beer is carbon neutral?", a: "Say Fat Tire and Mountain Time are part of our carbon-neutral program. Do not say the whole company is carbon neutral." },
        { q: "Why these projects?", a: "They are in the places we brew and source, and they are independently rated." },
        { q: "What does retired mean?", a: "A retired credit is permanently cancelled on the registry so nobody else can claim it." },
      ],
    },
  },
};
