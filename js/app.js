// Carbon Impact — shell, router, and view renderers. All content comes from js/data.js.
(function () {
  const D = window.DATA;
  const fmt = (n) => n.toLocaleString("en-US");

  // ---------- chrome ----------
  function renderChrome() {
    document.getElementById("sidebar").innerHTML = `
      <div class="brand">
        <div class="product">${D.productName}</div>
        <div class="by">by ${D.poweredBy}</div>
      </div>
      <nav aria-label="Workspace areas">
        ${D.nav.map(n => `<a href="#/${n.id}" data-nav="${n.id}"><span class="icon">${n.icon}</span>${n.label}</a>`).join("")}
      </nav>
      <div class="sidebar-foot">Workspace for<br><strong>${D.company.name}</strong></div>`;
    document.getElementById("topbar").innerHTML = `
      <span class="who">${D.company.name}</span>
      <span class="ctx">${D.company.context}</span>
      <span class="demo-chip chip chip-sample">Demo — sample &amp; public data</span>`;
    document.getElementById("demofooter").textContent = D.footerNote;
  }

  function setActive(id) {
    document.querySelectorAll("#sidebar nav a").forEach(a => {
      a.classList.toggle("active", a.dataset.nav === id);
    });
  }

  const chipReal = `<span class="chip chip-registry">Registry record</span>`;
  const chipPublic = `<span class="chip chip-public">Public</span>`;
  const chipProposed = `<span class="chip chip-proposed">Proposed</span>`;
  const chipSample = `<span class="chip chip-sample">Sample</span>`;
  const chipBand = `<span class="chip chip-band">Indicative band</span>`;

  function bars(rows, opts = {}) {
    const max = Math.max(...rows.map(r => r.value));
    return rows.map(r => `
      <div class="bar-row">
        <div class="bar-label">${r.label}</div>
        <div class="bar-track"><div class="bar-fill ${r.cls || ""}" style="width:${Math.max(2, (r.value / max) * 100)}%"></div></div>
        <div class="bar-val">${r.display}</div>
      </div>`).join("");
  }

  // ---------- Portfolio (home) ----------
  function viewHome() {
    const retired = D.history.reduce((s, h) => s + h.tonnes, 0);
    const p = D.portfolio;
    const mix = p.projects.map(pr => ({ label: pr.name, value: pr.tonnes, display: `${fmt(pr.tonnes)} t` }));
    return `
      <h1>Your carbon portfolio</h1>
      <p class="lede">One record of everything you've retired and everything proposed next — with the evidence to defend it and the materials to share it.</p>

      <section class="block grid cols-4">
        <div class="kpi"><div class="num">${fmt(retired)} t</div><div class="lbl">Retired to date (2021–2025)</div><div class="sub">${chipReal}</div></div>
        <div class="kpi"><div class="num">${fmt(p.totalTonnes)} t</div><div class="lbl">Proposed ${p.year} portfolio</div><div class="sub">${chipProposed}</div></div>
        <div class="kpi"><div class="num">6</div><div class="lbl">Projects · 5 states · 3 registries</div><div class="sub">${chipProposed}</div></div>
        <div class="kpi"><div class="num">Certified</div><div class="lbl">Fat Tire carbon-neutral (PAS 2060)</div><div class="sub">${chipPublic}</div></div>
      </section>

      <section class="block card">
        <h2 class="rule">Proposed allocation — ${p.year}</h2>
        ${bars(mix)}
        <div class="chart-note">Total ${fmt(p.totalTonnes)} t · spend band ${p.spendBand} (indicative). Firm quotes live in your CarbonBetter catalogue.</div>
      </section>

      <section class="block">
        <h2 class="rule">The projects — and why each one fits your criteria</h2>
        <div class="grid cols-2">
          ${p.projects.map(projectCard).join("")}
        </div>
      </section>

      <section class="block grid cols-2">
        <a class="share-card" href="#/vault"><span class="role">Evidence Vault</span><h3>Every claim, backed by a record</h3><p>Registry retirements, certificates, contracts, audit trail, and the claim-to-evidence map.</p></a>
        <a class="share-card" href="#/share"><span class="role">Share</span><h3>One record, five audiences</h3><p>Marketing, legal, finance, employees, and executives — each view generated from this portfolio.</p></a>
      </section>`;
  }

  function projectCard(pr) {
    return `
      <div class="project">
        <div class="head"><h3>${pr.name}</h3><span class="chip chip-public">${pr.registryShort} ${chipText(pr)}</span></div>
        <div class="meta">${pr.location} · ${pr.creditType}</div>
        <div>${(pr.criteriaFit || []).map(f => `<span class="fit">${f}</span>`).join("")}</div>
        <div class="alloc"><span class="t">${fmt(pr.tonnes)} t</span><span class="p">${pr.priceBand} · indicative</span></div>
        <p class="story">${pr.story}</p>
        <div class="facts"><b>Registry:</b> <a href="${pr.registryUrl}" target="_blank" rel="noopener">${pr.registry}</a> · <b>Methodology:</b> ${pr.methodology}${pr.rating && pr.rating !== "—" ? ` · <b>Rating:</b> ${pr.rating}` : ""}</div>
      </div>`;
  }
  function chipText(pr) { return pr.id.replace(pr.registryShort, "").trim() || pr.id; }

  // ---------- Footprint ----------
  function viewFootprint() {
    const f = D.footprint;
    const scopeRows = f.scopes.map(s => ({
      label: s.name, value: s.tonnes, display: `${fmt(s.tonnes)} t · ${s.share}%`,
      cls: s.name.startsWith("Scope 3") ? "gray" : "",
    }));
    const p = D.portfolio;
    return `
      <h1>Your footprint, and what credits actually cover</h1>
      <p class="lede">Credits only make sense in context. This is your reported footprint, where it comes from, and exactly how far the credit program reaches — no more, no less.</p>

      <section class="block grid cols-3">
        <div class="kpi"><div class="num">${f.totalLabel}</div><div class="lbl">Total footprint, ${f.year}</div><div class="sub">${chipPublic}</div></div>
        <div class="kpi"><div class="num">≈87%</div><div class="lbl">From the supply chain (Scope 3)</div><div class="sub">${chipPublic}</div></div>
        <div class="kpi"><div class="num">${fmt(p.totalTonnes)} t</div><div class="lbl">Proposed ${p.year} credit portfolio</div><div class="sub">${chipProposed}</div></div>
      </section>

      <section class="block card">
        <h2 class="rule">Where the emissions come from</h2>
        ${bars(scopeRows)}
        <div class="chart-note">${f.source}</div>
        <p style="margin:14px 0 0; font-size:13.5px;">${f.context}</p>
      </section>

      <section class="block card">
        <h2 class="rule">How the credit program compares</h2>
        <table class="data">
          <thead><tr><th>Measured against</th><th>Coverage</th><th>What that means</th></tr></thead>
          <tbody>
            ${f.coverage.map(c => `<tr><td><b>${c.label}</b></td><td class="num-cell">${c.covered}</td><td style="color:var(--muted)">${c.detail}</td></tr>`).join("")}
          </tbody>
        </table>
      </section>

      <section class="block grid cols-3">
        ${f.commitments.map(c => `<div class="card"><span class="chip chip-public">${c.source}</span><p style="margin:10px 0 0; font-weight:700; font-size:13.5px;">${c.text}</p></div>`).join("")}
      </section>

      <section class="block narration">
        <div class="who">Why this matters now</div>
        <p>${f.trajectory}</p>
      </section>`;
  }

  // ---------- Plan & Decide ----------
  function viewPlan() {
    const p = D.portfolio;
    return `
      <h1>Plan &amp; Decide</h1>
      <p class="lede">Purchasing starts with criteria, not projects. These are yours — and every project in the portfolio traces back to them.</p>

      <section class="block card">
        <h2 class="rule">The purchase cycle</h2>
        <div class="stages">${D.plan.stages.map((s, i) => `<span class="stage ${i <= 3 ? "active" : ""}">${s}</span>`).join("")}</div>
        <div class="chart-note">You are here: criteria defined, portfolio recommended, diligence documented, approval in progress.</div>
      </section>

      <section class="block">
        <h2 class="rule">Your purchasing criteria</h2>
        <div class="grid cols-2">
          ${D.criteria.map(c => `<div class="card"><h3>${c.name}</h3><p style="margin:0; font-size:13.5px; color:var(--muted)">${c.detail}</p></div>`).join("")}
        </div>
      </section>

      <section class="block card">
        <h2 class="rule">What was considered — and what was set aside</h2>
        <p style="margin:0; font-size:13.5px;">${p.alternatives}</p>
      </section>

      <section class="block card">
        <h2 class="rule">Next stage of Carbon Impact</h2>
        <p style="margin:0; font-size:13.5px; color:var(--muted)">${D.plan.note}</p>
      </section>`;
  }

  // ---------- Evidence Vault ----------
  function viewVault() {
    const v = D.vault;
    return `
      <h1>Evidence Vault</h1>
      <p class="lede">The audit-ready record behind every public claim: registry retirements, contracts, diligence, approvals, and the claim-to-evidence map.</p>

      <section class="block card">
        <h2 class="rule">Retirement records</h2>
        <table class="data"><thead><tr><th>Status</th><th>Date</th><th>Registry</th><th>Project</th><th style="text-align:right">Tonnes</th></tr></thead></table>
        ${v.retirements.map(r => `
          <details class="rec">
            <summary>
              <table class="data"><tbody><tr class="${r.real ? "real" : ""}">
                <td style="width:110px">${r.real ? chipReal : chipProposed}</td>
                <td style="width:130px" class="num-cell">${r.date}</td>
                <td style="width:80px" class="mono">${r.registry}</td>
                <td>${r.project}</td>
                <td class="num-cell" style="text-align:right">${fmt(r.tonnes)} t</td>
              </tr></tbody></table>
            </summary>
            <div class="cert">
              <div class="row"><span class="k">Serial / ref</span><span class="mono">${r.serial}</span></div>
              <div class="row"><span class="k">Purpose</span><span>${r.purpose}</span></div>
              <div class="row"><span class="k">Provenance</span><span>${r.real ? "Public registry record — independently verifiable" : "Proposed retirement — serial assigned when executed"}</span></div>
            </div>
          </details>`).join("")}
        <div class="chart-note">Blue-edged rows are real public registry records for ${D.company.shortName}, verified against CarbonBetter's merged registry dataset (207,881 retirements across five registries).</div>
      </section>

      <section class="block card">
        <h2 class="rule">Contracts &amp; delivery ${chipSample}</h2>
        <table class="data">
          <thead><tr><th>Counterparty</th><th>Scope</th><th>Status</th><th>Key terms</th></tr></thead>
          <tbody>${v.contracts.map(c => `<tr><td><b>${c.counterparty}</b></td><td>${c.scope}</td><td><span class="status pending">${c.status}</span></td><td style="color:var(--muted)">${c.terms}</td></tr>`).join("")}</tbody>
        </table>
      </section>

      <section class="block card">
        <h2 class="rule">Project diligence</h2>
        <table class="data">
          <thead><tr><th>Project</th><th>Registry / ID</th><th>Methodology</th><th>Verifier</th><th>Quality signals</th><th>Risk notes</th></tr></thead>
          <tbody>${D.portfolio.projects.map(pr => `
            <tr>
              <td><b>${pr.name}</b></td>
              <td class="mono"><a href="${pr.registryUrl}" target="_blank" rel="noopener">${pr.id}</a></td>
              <td style="font-size:12.5px">${pr.methodology}</td>
              <td style="font-size:12.5px">${pr.verifier}</td>
              <td style="font-size:12.5px">${pr.rating}</td>
              <td style="font-size:12.5px; color:var(--muted)">${pr.risks}</td>
            </tr>`).join("")}</tbody>
        </table>
      </section>

      <section class="block card">
        <h2 class="rule">Approval history ${chipSample}</h2>
        <table class="data">
          <thead><tr><th>Date</th><th>Role</th><th>Action</th></tr></thead>
          <tbody>${v.auditTrail.map(a => `<tr><td class="num-cell">${a.date}</td><td><b>${a.actor}</b></td><td>${a.action}</td></tr>`).join("")}</tbody>
        </table>
      </section>

      <section class="block card">
        <h2 class="rule">Claims — and the evidence behind them</h2>
        <table class="data">
          <thead><tr><th>Public claim</th><th>Status</th><th>Evidence</th></tr></thead>
          <tbody>${v.claims.map(c => `
            <tr>
              <td><b>${c.claim}</b></td>
              <td>${claimStatus(c.status)}</td>
              <td style="color:var(--muted)">${c.evidence}</td>
            </tr>`).join("")}</tbody>
        </table>
      </section>`;
  }

  function claimStatus(s) {
    if (s === "Substantiated") return `<span class="status good">Substantiated</span>`;
    if (s === "Not approved") return `<span class="status no">Not approved</span>`;
    return `<span class="status pending">${s}</span>`;
  }

  // ---------- Share ----------
  const SHARE_VIEWS = {
    marketing: { role: "Marketing", title: "Marketing kit", blurb: "Approved claims, project stories, social copy, and the guardrails that keep it safe." },
    legal:     { role: "Legal", title: "Legal & claims pack", blurb: "Claim-to-evidence map, AB 1305 disclosure readiness, and approval history." },
    finance:   { role: "Finance & accounting", title: "Finance & audit pack", blurb: "Budget band, allocation, payment schedule, and audit-ready documentation." },
    employee:  { role: "Every employee", title: "Employee page", blurb: "What we did and why it's real — in plain language, with an FAQ." },
    exec:      { role: "Executives", title: "Executive one-pager", blurb: "Spend, tonnes, risk posture, peer comparison, and why we chose these credits." },
  };

  function genStrip() {
    return `<div class="gen-strip">Generated from the ${D.company.shortName} portfolio record · updated ${D.share.updated} · <a href="#/share">all Share views</a></div>`;
  }

  function viewShare(sub) {
    if (sub && SHARE_VIEWS[sub]) return shareSub(sub);
    return `
      <h1>Share</h1>
      <p class="lede">Five audiences, one source of truth. Every view below is generated from the same portfolio record — nothing is written twice, nothing drifts out of sync.</p>
      <div class="grid cols-2">
        ${Object.entries(SHARE_VIEWS).map(([id, s]) => `
          <a class="share-card" href="#/share/${id}">
            <span class="role">${s.role}</span>
            <h3>${s.title}</h3>
            <p>${s.blurb}</p>
          </a>`).join("")}
      </div>`;
  }

  function shareSub(id) {
    const head = `
      <p class="back"><a href="#/share">← Share</a></p>
      <h1>${SHARE_VIEWS[id].title}</h1>
      ${genStrip()}`;
    if (id === "marketing") return head + shareMarketing();
    if (id === "legal") return head + shareLegal();
    if (id === "finance") return head + shareFinance();
    if (id === "employee") return head + shareEmployee();
    if (id === "exec") return head + shareExec();
    return head;
  }

  function shareMarketing() {
    const m = D.share.marketing;
    return `
      <section class="block card">
        <h2 class="rule">Approved claims language</h2>
        <table class="data">
          <thead><tr><th>Use</th><th>Approved wording</th></tr></thead>
          <tbody>${m.approved.map(a => `<tr><td style="width:160px"><b>${a.use}</b></td><td>${a.text}</td></tr>`).join("")}</tbody>
        </table>
        <div class="chart-note">Wording status is maintained in the Evidence Vault claims table; legal sign-off travels with each phrase.</div>
      </section>
      <section class="block">
        <h2 class="rule">Guardrails</h2>
        ${m.guardrails.map(g => `<div class="pair"><div class="dont">${g.dont}</div><div class="do">${g.do}</div></div>`).join("")}
      </section>
      <section class="block card">
        <h2 class="rule">Project stories</h2>
        <p style="margin:0 0 14px; font-size:13.5px; color:var(--muted)">${m.stories}</p>
        <div class="grid cols-2">
          ${D.portfolio.projects.slice(0, 4).map(pr => `<div class="project"><div class="head"><h3>${pr.name}</h3></div><div class="meta">${pr.location}</div><p class="story">${pr.story}</p></div>`).join("")}
        </div>
      </section>`;
  }

  function shareLegal() {
    const l = D.share.legal;
    return `
      <section class="block card">
        <h2 class="rule">Disclosure &amp; review checklist</h2>
        <table class="data">
          <thead><tr><th>Item</th><th>Status</th><th>Note</th></tr></thead>
          <tbody>${l.checklist.map(c => `<tr><td><b>${c.item}</b></td><td><span class="status ${c.status === "Live" ? "good" : "pending"}">${c.status}</span></td><td style="color:var(--muted)">${c.note}</td></tr>`).join("")}</tbody>
        </table>
      </section>
      <section class="block card">
        <h2 class="rule">Claim-to-evidence map</h2>
        <table class="data">
          <thead><tr><th>Public claim</th><th>Status</th><th>Evidence</th></tr></thead>
          <tbody>${D.vault.claims.map(c => `<tr><td><b>${c.claim}</b></td><td>${claimStatus(c.status)}</td><td style="color:var(--muted)">${c.evidence}</td></tr>`).join("")}</tbody>
        </table>
        <div class="chart-note">${l.note}</div>
      </section>
      <section class="block card">
        <h2 class="rule">Approval history ${chipSample}</h2>
        <table class="data">
          <thead><tr><th>Date</th><th>Role</th><th>Action</th></tr></thead>
          <tbody>${D.vault.auditTrail.map(a => `<tr><td class="num-cell">${a.date}</td><td><b>${a.actor}</b></td><td>${a.action}</td></tr>`).join("")}</tbody>
        </table>
      </section>`;
  }

  function shareFinance() {
    const f = D.share.finance;
    const p = D.portfolio;
    return `
      <section class="block grid cols-3">
        <div class="kpi"><div class="num">${p.spendBand}</div><div class="lbl">Program budget band, ${p.year}</div><div class="sub">${chipBand}</div></div>
        <div class="kpi"><div class="num">${fmt(p.totalTonnes)} t</div><div class="lbl">Contracted volume</div><div class="sub">${chipProposed}</div></div>
        <div class="kpi"><div class="num">6</div><div class="lbl">Counterparty sleeves via one agent</div><div class="sub">${chipProposed}</div></div>
      </section>
      <section class="block card">
        <h2 class="rule">Allocation &amp; price context</h2>
        <table class="data">
          <thead><tr><th>Project</th><th>Type</th><th style="text-align:right">Tonnes</th><th>Price band</th></tr></thead>
          <tbody>${p.projects.map(pr => `<tr><td><b>${pr.name}</b></td><td style="font-size:12.5px">${pr.creditType}</td><td class="num-cell" style="text-align:right">${fmt(pr.tonnes)}</td><td class="num-cell">${pr.priceBand}</td></tr>`).join("")}</tbody>
        </table>
        <div class="chart-note">${f.budgetBand}</div>
      </section>
      <section class="block card">
        <h2 class="rule">Payment schedule ${chipSample}</h2>
        <table class="data">
          <thead><tr><th>Milestone</th><th>Timing</th><th>Amount</th></tr></thead>
          <tbody>${f.schedule.map(s => `<tr><td><b>${s.milestone}</b></td><td>${s.timing}</td><td class="num-cell">${s.amount}</td></tr>`).join("")}</tbody>
        </table>
      </section>
      <section class="block grid cols-2">
        <div class="card"><h2 class="rule">Audit readiness</h2><p style="margin:0; font-size:13.5px;">${f.audit}</p></div>
        <div class="card"><h2 class="rule">Alternatives considered</h2><p style="margin:0; font-size:13.5px; color:var(--muted)">${p.alternatives}</p></div>
      </section>`;
  }

  function shareEmployee() {
    const e = D.share.employee;
    return `
      <section class="block card">
        <h2 class="rule">${e.headline}</h2>
        ${e.body.map(b => `<p style="font-size:14px;">${b}</p>`).join("")}
      </section>
      <section class="block">
        <h2 class="rule">Where your beer's credits live</h2>
        <div class="grid cols-3">
          ${D.portfolio.projects.map(pr => `<div class="card"><span class="chip chip-public">${pr.location.split("(")[0].trim()}</span><h3 style="margin-top:10px">${pr.name}</h3><p style="margin:0; font-size:12.5px; color:var(--muted)">${pr.theme}</p></div>`).join("")}
        </div>
      </section>
      <section class="block">
        <h2 class="rule">Questions people actually ask</h2>
        ${e.faq.map(f => `<details class="faq"><summary>${f.q}</summary><p>${f.a}</p></details>`).join("")}
      </section>`;
  }

  function shareExec() {
    const x = D.share.exec;
    const p = D.portfolio;
    const retired = D.history.reduce((s, h) => s + h.tonnes, 0);
    const peers = D.peerComps.map(pc => ({
      label: pc.you ? `<b>${pc.buyer} (you)</b>` : pc.buyer,
      value: Math.sqrt(pc.tonnes),
      display: `${fmt(pc.tonnes)} t`,
      cls: pc.you ? "" : "gray",
    }));
    return `
      <section class="block grid cols-4">
        <div class="kpi"><div class="num">${p.spendBand}</div><div class="lbl">Proposed spend, ${p.year}</div><div class="sub">${chipBand}</div></div>
        <div class="kpi"><div class="num">${fmt(p.totalTonnes)} t</div><div class="lbl">Volume · 35% removals</div><div class="sub">${chipProposed}</div></div>
        <div class="kpi"><div class="num">${fmt(retired)} t</div><div class="lbl">Retired to date</div><div class="sub">${chipReal}</div></div>
        <div class="kpi"><div class="num">2030</div><div class="lbl">Company-wide carbon-neutral commitment</div><div class="sub">${chipPublic}</div></div>
      </section>

      <section class="block narration">
        <div class="who">${x.narration.title}</div>
        <p>${x.narration.text}</p>
      </section>

      <section class="block card">
        <h2 class="rule">What companies like us do</h2>
        ${bars(peers)}
        <div class="chart-note">Real named retirements from public registry records (bar length on square-root scale so BrewDog's 450,000 t doesn't flatten the field). BrewDog's volume came from the Darkwoods Forest Carbon Project — a project that also appears in your CarbonBetter catalogue.</div>
      </section>

      <section class="block grid cols-2">
        <div class="card"><h2 class="rule">Risk posture</h2><p style="margin:0; font-size:13.5px;">${x.risk}</p></div>
        <div class="card"><h2 class="rule">Renewal outlook</h2><p style="margin:0; font-size:13.5px;">${x.renewal}</p></div>
      </section>`;
  }

  // ---------- router ----------
  const views = { home: viewHome, footprint: viewFootprint, plan: viewPlan, vault: viewVault, share: viewShare };

  function route() {
    const parts = (location.hash.replace(/^#\//, "") || "home").split("/");
    const id = views[parts[0]] ? parts[0] : "home";
    setActive(id);
    document.getElementById("view").innerHTML = `<div class="wrap">${views[id](parts[1])}</div>`;
    document.getElementById("view").scrollTop = 0;
    window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", route);
  renderChrome();
  route();
})();
