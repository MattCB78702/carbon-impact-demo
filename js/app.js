// Carbon Impact — shell, router, views. Content from data.js; catalogue from catalogue.js.
(function () {
  const D = window.DATA;
  const CAT = window.CATALOGUE || [];
  const PRICES = window.PRICES || null;   // present only when prices.local.js is loaded
  const byKey = Object.fromEntries(CAT.map(p => [p.key, p]));
  const fmt = n => n.toLocaleString("en-US");
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // Real prices only when the gitignored local file is present; bands otherwise.
  const priceOf = p => (PRICES && PRICES[p.key]) ? PRICES[p.key] : p.priceBand;
  const priceIsReal = () => !!PRICES;

  const SRC_LABEL = {
    registry: "Registry record", public: "Public reporting", catalogue: "Your catalogue",
    market: "Market data", sample: "Illustrative", derived: "Derived",
  };

  function band(src, note, body) {
    return `<section class="band">
      <div class="rail"><span class="src src-${src}">${SRC_LABEL[src] || src}</span>${note ? `<div class="note">${note}</div>` : ""}</div>
      <div class="body">${body}</div>
    </section>`;
  }
  const sheet = html => `<div class="sheet"><div class="inner">${html}</div></div>`;
  const head = (eyebrow, h1, sub, wide) =>
    `<div class="head"><div class="eyebrow">${eyebrow}</div><h1${wide ? ' class="wide"' : ""}>${h1}</h1>${sub ? `<p class="sub">${sub}</p>` : ""}</div>`;

  function pbar(name, sub, valueLabel, pct, cls) {
    return `<div class="pbar ${cls || ""}">
      <div class="top"><div class="nm">${name}${sub ? `<em>${sub}</em>` : ""}</div><div class="v">${valueLabel}</div></div>
      <div class="track"><div class="fill ${cls === "you" ? "" : (cls || "")}" style="width:${Math.max(1.5, pct)}%"></div></div>
    </div>`;
  }

  // ------------------------------------------------------------- Your Footprint
  function vFootprint() {
    const f = D.footprint;
    const max = Math.max(...f.scopes.map(s => s.tonnes));
    return sheet(
      head("Your Footprint", f.headline, f.context) +
      band("public", f.sourceNote,
        `<div class="figure"><span class="n">${f.totalLabel}</span><span class="u">tonnes CO₂e</span><span class="q">${f.year}</span></div>
         <p class="h2sub">Total reported footprint.</p>`) +
      band("public", "",
        `<h2>Where it comes from</h2>
         <p class="h2sub">Almost everything sits outside the brewery walls, which is what makes it hard.</p>
         ${f.scopes.map(s => pbar(s.name, s.detail, `${fmt(s.tonnes)} t · ${s.share}%`, (s.tonnes / max) * 100, s.name.startsWith("Scope 3") ? "mute" : "")).join("")}`) +
      band("derived", "Program volume measured against reported emissions.",
        `<h2>What the credit program actually covers</h2>
         <p class="h2sub">Stated plainly, because someone will eventually ask.</p>
         <table class="x">
           <thead><tr><th>Measured against</th><th>Covered</th><th>What that means</th></tr></thead>
           <tbody>${f.coverage.map(c => `<tr><td><b>${c.label}</b></td><td class="m">${c.covered}</td><td>${c.detail}</td></tr>`).join("")}</tbody>
         </table>`) +
      band("public", "",
        `<h2>What you have committed to publicly</h2>
         <table class="x"><tbody>${f.commitments.map(c => `<tr><td>${c}</td></tr>`).join("")}</tbody></table>
         <p style="margin-top:18px">${f.trajectory}</p>`)
    );
  }

  // -------------------------------------------------- Quality and Co-benefits
  function vQuality() {
    const q = D.quality;
    return sheet(
      head("Quality and Co-benefits", q.headline, q.intro, true) +
      band("derived", "The questions asked of every project before it reaches you.",
        `<h2>Five questions</h2>
         <p class="h2sub">A credit fails if any one of them fails.</p>
         ${q.questions.map(x => `<div class="qa">
            <h3>${x.q}</h3>
            <div class="plain">${x.plain}</div>
            <p>${x.detail}</p>
            <p class="eg">${x.example}</p>
          </div>`).join("")}`) +
      band("derived", "",
        `<h2>Avoidance and removal are not the same thing</h2>
         <p class="h2sub">${q.avoidanceVsRemoval.intro}</p>
         <div class="cols2">
           <div><div class="gr"><div class="yes"><div class="k">Avoidance</div><p>${q.avoidanceVsRemoval.avoidance}</p></div></div></div>
           <div><div class="gr"><div class="yes"><div class="k">Removal</div><p>${q.avoidanceVsRemoval.removal}</p></div></div></div>
         </div>
         <p style="margin-top:16px"><b>${q.avoidanceVsRemoval.guidance}</b></p>`) +
      band("derived", "",
        `<h2>What the independent signals mean</h2>
         <p class="h2sub">${q.ratings.intro}</p>
         <table class="x">
           <thead><tr><th>Signal</th><th>What it is</th><th>How to use it</th></tr></thead>
           <tbody>${q.ratings.items.map(r => `<tr><td><b>${r.name}</b></td><td>${r.what}</td><td>${r.use}</td></tr>`).join("")}</tbody>
         </table>`) +
      band("derived", "",
        `<h2>Co-benefits</h2>
         <p class="h2sub">${q.coBenefits.intro}</p>
         <p>${q.coBenefits.body}</p>
         <div class="pull"><p>${q.coBenefits.rule}</p><div class="attr">The rule we apply</div></div>`) +
      band("catalogue", "",
        `<h2>How your catalogue scores</h2>
         <p>${q.catalogueNote} <a href="#/explore">Explore all 26 →</a></p>`)
    );
  }

  // ------------------------------------------------------------ Explore Credits
  const FILTERS = { category: null, creditType: null, quality: false, valueChain: false };

  function vExplore() {
    const cats = [...new Set(CAT.map(p => p.category))].sort();
    const owned = new Set(D.portfolio.projects.map(p => p.key));
    let rows = CAT.filter(p =>
      (!FILTERS.category || p.category === FILTERS.category) &&
      (!FILTERS.creditType || p.creditType === FILTERS.creditType ||
        (FILTERS.creditType === "Removal" && p.creditType === "Mixed")) &&
      (!FILTERS.quality || p.quality.length) &&
      (!FILTERS.valueChain || p.valueChainStates.length)
    );

    const chip = (label, active, action) => `<button class="chip ${active ? "on" : ""}" data-act="${action}">${label}</button>`;

    return sheet(
      head("Explore Credits", "Every project we shortlisted for you, and the ones you did not take.",
        `Twenty-six projects, curated against your criteria from the whole market. Filter them the way you would actually think about them. ${priceIsReal() ? "Showing your real quoted prices." : "Prices shown as indicative bands; firm quotes are in your catalogue."}`, true) +
      band("catalogue", "Curated June 2026. Filters apply to this shortlist, not the whole market.",
        `<div class="facets">
           <div class="lbl">Category</div>
           ${chip("All", !FILTERS.category, "cat:")}${cats.map(c => chip(c, FILTERS.category === c, "cat:" + c)).join("")}
           <div class="lbl">Credit type</div>
           ${chip("All", !FILTERS.creditType, "ct:")}${chip("Removal", FILTERS.creditType === "Removal", "ct:Removal")}${chip("Avoidance", FILTERS.creditType === "Avoidance", "ct:Avoidance")}
           <div class="lbl">Filters</div>
           ${chip("Independently rated or CCP", FILTERS.quality, "q")}${chip("In a value-chain state", FILTERS.valueChain, "vc")}
         </div>
         <div class="count">Showing <b>${rows.length}</b> of ${CAT.length} projects${rows.length ? "" : " — no project matches every filter. Loosen one."}</div>
         <div class="rows">${rows.map(p => exploreRow(p, owned)).join("")}</div>`)
    );
  }

  function exploreRow(p, owned) {
    const mine = owned.has(p.key);
    return `<details class="row">
      <summary>
        <div>
          <div class="t">${esc(p.name)}${mine ? ` <span class="tag own">In your portfolio</span>` : ""}</div>
          <div class="meta">${esc(p.registry)} · ${esc(p.location || p.country)}${p.vintage ? " · vintage " + esc(p.vintage) : ""}</div>
        </div>
        <div class="right">
          <div class="band-price">${esc(priceOf(p))}</div>
          <div class="ct">${p.creditType}</div>
        </div>
      </summary>
      <div class="detail">
        <p>${esc(p.description)}</p>
        <dl>
          <dt>Category</dt><dd>${esc(p.category)}</dd>
          ${p.methodology ? `<dt>Methodology</dt><dd>${esc(p.methodology)}</dd>` : ""}
          ${p.verifier ? `<dt>Verified by</dt><dd>${esc(p.verifier)}</dd>` : ""}
          ${p.volume ? `<dt>Volume available</dt><dd>${esc(p.volume)}</dd>` : ""}
          <dt>Quality signals</dt><dd>${p.quality.length ? p.quality.map(q => `<span class="tag">${esc(q)}</span>`).join(" ") : "<span class='tag plain'>None published</span>"}</dd>
          ${p.valueChainStates.length ? `<dt>Value-chain states</dt><dd><span class="tag">${p.valueChainStates.join(" · ")}</span></dd>` : ""}
        </dl>
      </div>
    </details>`;
  }

  // ------------------------------------------------------------- Your Portfolio
  function vPortfolio() {
    const p = D.portfolio, c = D.criteria;
    const maxT = Math.max(...p.projects.map(x => x.tonnes));
    return sheet(
      head("Your Portfolio", "What you told us mattered, and what follows from it.",
        c.intro, true) +
      band("catalogue", "Your stated criteria, applied to the whole market.",
        `<h2>What you are prioritising</h2>
         <table class="x">
           <thead><tr><th>Criterion</th><th>What you said</th><th>What it ruled out</th></tr></thead>
           <tbody>${c.items.map(i => `<tr><td><b>${i.name}</b></td><td>${i.detail}</td><td style="color:var(--muted)">${i.effect}</td></tr>`).join("")}</tbody>
         </table>`) +
      band("catalogue", "",
        `<h2>The recommendation</h2>
         <p class="h2sub">${fmt(p.totalTonnes)} tonnes for ${p.year}, indicative spend ${p.spendBand}. Each project below is here because of a criterion above.</p>
         ${p.projects.map(x => {
            const cat = byKey[x.key] || {};
            return `<div class="entry">
              <div><div class="vol">${fmt(x.tonnes)}</div><div class="volx">tonnes</div></div>
              <div>
                <div class="role">${x.role}</div>
                <h3>${esc(cat.name || x.key)}</h3>
                <p>${x.why}</p>
                <div class="tags">${x.fits.map(f => `<span class="tag">${f}</span>`).join("")}</div>
                <div class="facts" style="margin-top:9px">${esc(cat.registry || "")} · ${esc(cat.location || "")} · ${esc(cat.creditType || "")} · ${esc(priceOf(cat.key ? cat : { key: x.key, priceBand: "—" }))}</div>
              </div>
            </div>`;
         }).join("")}`) +
      band("derived", "",
        `<h2>Allocation</h2>
         ${p.projects.map(x => pbar(esc((byKey[x.key] || {}).name || x.key), "", `${fmt(x.tonnes)} t`, (x.tonnes / maxT) * 100)).join("")}`) +
      band("catalogue", "The alternatives, and why they are not here.",
        `<h2>What was set aside</h2>
         <p class="h2sub">A recommendation you cannot interrogate is just a sales pitch.</p>
         <table class="x">
           <thead><tr><th>Set aside</th><th>Reason</th></tr></thead>
           <tbody>${p.setAside.map(s => `<tr><td><b>${s.what}</b></td><td>${s.why}</td></tr>`).join("")}</tbody>
         </table>
         <p style="margin-top:16px"><a href="#/explore">See all 26 shortlisted projects →</a></p>`)
    );
  }

  // ---------------------------------------------------------------- Benchmark
  function vBenchmark() {
    const b = D.benchmark;
    const maxP = Math.max(...b.peers.map(p => p.tonnes));
    return sheet(
      head("Benchmark", b.headline, b.intro, true) +
      band("market", "207,881 retirements across five registries.",
        `<div class="stats">${b.stats.map(s => `<div class="stat"><div class="n">${s.num}<small>${s.of}</small></div><div class="l">${s.label}</div></div>`).join("")}</div>`) +
      band("registry", "Every buyer named here disclosed the retirement publicly.",
        `<h2>What comparable companies have retired</h2>
         <p class="h2sub">Scaled by square root so one outlier does not flatten the field.</p>
         ${b.peers.map(p => pbar(
            p.you ? `${p.buyer} — you` : p.buyer, p.note, `${fmt(p.tonnes)} t`,
            (Math.sqrt(p.tonnes) / Math.sqrt(maxP)) * 100, p.you ? "you" : "mute")).join("")}`) +
      band("market", "",
        `<h2>What the sector buys</h2>
         <p class="h2sub">${b.mix.intro}</p>
         ${b.mix.items.map(m => pbar(m.type, "", `${m.share}%`, m.share)).join("")}
         <div class="pull" style="margin-top:22px"><p>${b.mix.insight}</p><div class="attr">Where you differ</div></div>`)
    );
  }

  // -------------------------------------------------------------------- Share
  function vShare(sub) {
    if (sub) return sharePack(sub);
    const s = D.share;
    const card = x => `<a class="pack" href="#/share/${x.id}"><div class="role">${x.role}</div><h3>${x.title}</h3><p>${x.blurb}</p></a>`;
    return sheet(
      head("Share", "Approval before, explanation after.", s.intro, true) +
      band("derived", "Generated from the portfolio record.",
        `<h2>Before the purchase</h2><p class="h2sub">What you need to get it approved.</p>
         <div class="packs">${s.presale.map(card).join("")}</div>`) +
      band("derived", "Generated from the portfolio record.",
        `<h2>After the purchase</h2><p class="h2sub">What you need to explain it, without overstating it.</p>
         <div class="packs">${s.postsale.map(card).join("")}</div>`)
    );
  }

  function sharePack(id) {
    const s = D.share;
    const all = [...s.presale, ...s.postsale];
    const meta = all.find(x => x.id === id);
    if (!meta) return vShare();
    const top = `<p class="backlink"><a href="#/share">← Share</a></p>` +
      head(meta.role, meta.title, meta.blurb);
    const inner = { exec: pkExec, finance: pkFinance, legal: pkLegal, marketing: pkMarketing, employee: pkEmployee, records: pkRecords }[id];
    return sheet(top + inner());
  }

  function pkExec() {
    const p = D.portfolio, b = D.benchmark, x = D.share.exec;
    const retired = D.history.reduce((a, h) => a + h.tonnes, 0);
    return band("catalogue", "",
      `<div class="stats">
         <div class="stat"><div class="n">${p.spendBand}</div><div class="l">Indicative spend, ${p.year}</div></div>
         <div class="stat"><div class="n">${fmt(p.totalTonnes)}<small>tonnes</small></div><div class="l">Volume, 35% removals</div></div>
         <div class="stat"><div class="n">7th<small>of 74</small></div><div class="l">Rank among beverage buyers by volume retired</div></div>
       </div>`) +
      band("derived", "", `<div class="pull"><p>${x.narration}</p><div class="attr">Sustainability lead</div></div>`) +
      band("registry", "", `<h2>Where you stand</h2>${b.peers.slice(0, 6).map(pp => pbar(pp.you ? `${pp.buyer} — you` : pp.buyer, "", `${fmt(pp.tonnes)} t`, (Math.sqrt(pp.tonnes) / Math.sqrt(Math.max(...b.peers.map(z => z.tonnes)))) * 100, pp.you ? "you" : "mute")).join("")}`) +
      band("derived", "", `<div class="cols2">
        <div><h2>Risk posture</h2><p>${x.risk}</p></div>
        <div><h2>Renewal</h2><p>${x.renewal}</p><p style="margin-top:8px;color:var(--muted)">Retired to date: ${fmt(retired)} tonnes.</p></div>
      </div>`);
  }

  function pkFinance() {
    const p = D.portfolio;
    return band("catalogue", priceIsReal() ? "Showing real quoted prices (local session)." : "Indicative bands. Firm quotes are in your catalogue.",
      `<h2>Allocation and price context</h2>
       <table class="x">
         <thead><tr><th>Project</th><th>Type</th><th class="r">Tonnes</th><th>${priceIsReal() ? "Quoted price" : "Indicative band"}</th></tr></thead>
         <tbody>${p.projects.map(x => { const c = byKey[x.key] || {}; return `<tr><td><b>${esc(c.name || x.key)}</b></td><td>${esc(c.creditType || "")}</td><td class="m r">${fmt(x.tonnes)}</td><td class="m">${esc(priceOf(c.key ? c : { key: x.key, priceBand: "—" }))}</td></tr>`; }).join("")}
         <tr><td><b>Total</b></td><td></td><td class="m r"><b>${fmt(p.totalTonnes)}</b></td><td class="m"><b>${p.spendBand}</b></td></tr></tbody>
       </table>`) +
      band("catalogue", "",
        `<h2>What was considered and set aside</h2>
         <table class="x"><tbody>${p.setAside.map(s => `<tr><td style="width:230px"><b>${s.what}</b></td><td>${s.why}</td></tr>`).join("")}</tbody></table>`) +
      band("registry", "",
        `<h2>Audit trail</h2>
         <p>Every tonne resolves to a public registry record with a serial number, a date, and a stated purpose. Auditors get the record itself rather than a reconstruction. <a href="#/share/records">See the records →</a></p>`);
  }

  function pkLegal() {
    const l = D.share.legal;
    const stCls = s => s === "Substantiated" || s === "Live" ? "ok" : (s === "Not approved" ? "no" : "pend");
    return band("derived", "",
      `<h2>Disclosure readiness</h2>
       <table class="x">
         <thead><tr><th>Item</th><th>Status</th><th>Note</th></tr></thead>
         <tbody>${l.checklist.map(c => `<tr><td><b>${c.item}</b></td><td><span class="st ${stCls(c.status)}">${c.status}</span></td><td>${c.note}</td></tr>`).join("")}</tbody>
       </table>`) +
      band("registry", "Each claim resolves to a public record.",
        `<h2>Claim to evidence</h2>
         <p class="h2sub">Including the claim that is not approved, which is the most useful row on this page.</p>
         <table class="x">
           <thead><tr><th>Public claim</th><th>Status</th><th>Evidence</th></tr></thead>
           <tbody>${l.claims.map(c => `<tr><td><b>${c.claim}</b></td><td><span class="st ${stCls(c.status)}">${c.status}</span></td><td>${c.evidence}</td></tr>`).join("")}</tbody>
         </table>`);
  }

  function pkMarketing() {
    const m = D.share.marketing;
    return band("derived", "Cleared wording only.",
      `<h2>Approved language</h2>
       <table class="x"><tbody>${m.approved.map(a => `<tr><td style="width:150px"><b>${a.use}</b></td><td>${a.text}</td></tr>`).join("")}</tbody></table>`) +
      band("derived", "",
        `<h2>Guardrails</h2>
         <p class="h2sub">The left column is what gets a brand in trouble.</p>
         ${m.guardrails.map(g => `<div class="gr">
            <div class="no"><div class="k">Do not say</div><p>${g.dont}</p></div>
            <div class="yes"><div class="k">Say instead</div><p>${g.do}</p></div>
          </div>`).join("")}`) +
      band("catalogue", "",
        `<h2>Project stories</h2>
         ${D.portfolio.projects.slice(0, 4).map(x => { const c = byKey[x.key] || {}; return `<div class="qa"><h3>${esc(c.name || "")}</h3><div class="plain">${esc(c.location || "")}</div><p>${x.why}</p></div>`; }).join("")}`);
  }

  function pkEmployee() {
    const e = D.share.employee;
    return band("derived", "Plain language, no jargon.",
      `<h2>What we did, and why it is real</h2>${e.body.map(b => `<p>${b}</p>`).join("")}`) +
      band("catalogue", "",
        `<h2>Where the credits go</h2>
         <table class="x"><tbody>${D.portfolio.projects.map(x => { const c = byKey[x.key] || {}; return `<tr><td><b>${esc(c.name || "")}</b></td><td class="m">${esc(c.location || "")}</td></tr>`; }).join("")}</tbody></table>`) +
      band("derived", "",
        `<h2>Questions people actually ask</h2>
         ${e.faq.map(f => `<details class="faq"><summary>${f.q}</summary><p>${f.a}</p></details>`).join("")}`);
  }

  function pkRecords() {
    const retired = D.history.reduce((a, h) => a + h.tonnes, 0);
    return band("registry", "Public records. Anyone can verify these independently.",
      `<div class="figure"><span class="n">${fmt(retired)}</span><span class="u">tonnes retired</span><span class="q">2021–2025</span></div>
       <table class="x">
         <thead><tr><th>Date</th><th>Registry</th><th>Project</th><th class="r">Tonnes</th></tr></thead>
         <tbody>${D.history.map(h => `<tr>
           <td class="m">${h.date}</td>
           <td class="m">${h.id}</td>
           <td><b>${esc(h.project)}</b><div style="color:var(--muted);font-size:12.5px;margin-top:3px">${esc(h.purpose)}</div></td>
           <td class="m r">${fmt(h.tonnes)}</td></tr>`).join("")}</tbody>
       </table>`) +
      band("catalogue", "",
        `<h2>On completion of the ${D.portfolio.year} program</h2>
         <p>A further ${fmt(D.portfolio.totalTonnes)} tonnes will appear here, each with its own serial and stated purpose, once retired. Proposed retirements are never shown as completed ones.</p>`);
  }

  // ------------------------------------------------------------------- router
  const VIEWS = { footprint: vFootprint, quality: vQuality, explore: vExplore, portfolio: vPortfolio, benchmark: vBenchmark, share: vShare };

  function chrome() {
    document.getElementById("sidebar").innerHTML =
      `<div class="brand"><div class="product">${D.productName}</div><div class="by">by ${D.poweredBy}</div></div>
       <nav>${D.nav.map(n => `<a href="#/${n.id}" data-nav="${n.id}">${n.label}</a>`).join("")}</nav>
       <div class="sidebar-foot">Prepared for<strong>${D.company.name}</strong></div>`;
    document.getElementById("topbar").innerHTML =
      `<span class="who">${D.company.name}</span><span class="ctx">${D.company.context}</span>
       <span class="flag">${priceIsReal() ? "Internal — real prices" : "Demonstration"}</span>`;
    document.getElementById("demofooter").textContent = D.footerNote;
  }

  function render() {
    const parts = (location.hash.replace(/^#\//, "") || "footprint").split("/");
    const id = VIEWS[parts[0]] ? parts[0] : "footprint";
    document.querySelectorAll("#sidebar nav a").forEach(a => a.classList.toggle("active", a.dataset.nav === id));
    document.getElementById("view").innerHTML = VIEWS[id](parts[1]);
    bindExplore();
  }

  function bindExplore() {
    document.querySelectorAll("#view .chip[data-act]").forEach(btn => {
      btn.addEventListener("click", () => {
        const [k, v] = btn.dataset.act.split(":");
        if (k === "cat") FILTERS.category = v || null;
        else if (k === "ct") FILTERS.creditType = v || null;
        else if (k === "q") FILTERS.quality = !FILTERS.quality;
        else if (k === "vc") FILTERS.valueChain = !FILTERS.valueChain;
        document.getElementById("view").innerHTML = vExplore();
        bindExplore();
      });
    });
  }

  window.addEventListener("hashchange", () => { render(); window.scrollTo(0, 0); });
  chrome();
  render();
})();
