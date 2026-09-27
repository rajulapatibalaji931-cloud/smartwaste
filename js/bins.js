document.addEventListener("DOMContentLoaded", () => {
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[c]));

  function render() {
    const sf = document.getElementById("binStatusFilter") ? document.getElementById("binStatusFilter").value.trim() : "";
    const af = document.getElementById("binAreaFilter") ? document.getElementById("binAreaFilter").value.trim().toLowerCase() : "";
    const grid = document.getElementById("binsGrid");
    
    if (!grid) return;

    const arr = getBins().filter(b => 
      (!sf || binStatus(b.fill) === sf) &&
      (!af || b.location.toLowerCase().includes(af) || b.area.toLowerCase().includes(af))
    );

    grid.innerHTML = arr.map(b => {
      const s = binStatus(b.fill), cl = s.toLowerCase();
      return `
        <div class="col-md-6 col-lg-4">
          <div class="bin-card">
            <div class="d-flex justify-content-between align-items-center">
              <span class="bin-id">${esc(b.id)}</span>
              <span class="status-badge bin-${cl}"><i class="fa-solid fa-circle me-1"></i>${s}</span>
            </div>
            <h5 class="mt-3">${esc(b.location.trim())}</h5>
            <p class="text-muted">${esc(b.area)} Area</p>
            <div class="d-flex justify-content-between align-items-end">
              <span>Fill Level</span>
              <span class="bin-level">${b.fill}%</span>
            </div>
            <div class="fill-bar mt-2">
              <span class="fill-${cl}" style="width:${b.fill}%"></span>
            </div>
            <div class="small text-muted mt-3">
              ${s === "Red" ? "Immediate collection recommended" : s === "Yellow" ? "Monitor and schedule collection" : "Capacity is healthy"}
            </div>
          </div>
        </div>`;
    }).join("") || `<div class="col-12"><div class="alert alert-light text-center">No bins found.</div></div>`;
  }

  render();

  const statusEl = document.getElementById("binStatusFilter");
  const areaEl = document.getElementById("binAreaFilter");

  if (statusEl) statusEl.onchange = render;
  if (areaEl) areaEl.oninput = render;
});
