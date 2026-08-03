// Carbon Impact — shell + hash router. View renderers get built out in Tasks 3-6.
(function () {
  const D = window.DATA;

  function renderChrome() {
    document.getElementById("sidebar").innerHTML = `
      <div style="padding:20px 18px; font-weight:800; font-size:17px;">${D.productName}</div>
      <nav>${D.nav.map(n => `<a href="#/${n.id}" data-nav="${n.id}" style="display:block;padding:10px 18px;color:#fff;text-decoration:none;">${n.label}</a>`).join("")}</nav>`;
    document.getElementById("topbar").innerHTML = `
      <span style="font-weight:700;color:var(--navy);">Prepared for ${D.company.name}</span>
      <span style="float:right;color:var(--muted);font-size:13px;">by ${D.poweredBy}</span>`;
    document.getElementById("demofooter").textContent = D.footerNote;
  }

  const views = {
    home:  () => `<h1>Portfolio</h1><p>Coming in Task 6.</p>`,
    plan:  () => `<h1>Plan &amp; Decide</h1><p>Coming in Task 6.</p>`,
    vault: () => `<h1>Evidence Vault</h1><p>Coming in Task 4.</p>`,
    share: () => `<h1>Share</h1><p>Coming in Task 5.</p>`,
  };

  function route() {
    const hash = location.hash.replace(/^#\//, "") || "home";
    const id = hash.split("/")[0];
    const render = views[id] || views.home;
    document.getElementById("view").innerHTML = render(hash);
  }

  window.addEventListener("hashchange", route);
  renderChrome();
  route();
})();
