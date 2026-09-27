document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("smartwaste_admin") !== "true") {
    location.href = "admin-login.html";
    return;
  }

  function render() {
    const all = getComplaints();
    const totalEl = document.getElementById("totalC");
    const pendingEl = document.getElementById("pendingC");
    const resolvedEl = document.getElementById("resolvedC");

    if (totalEl) totalEl.textContent = all.length;
    if (pendingEl) pendingEl.textContent = all.filter(x => x.status === "Pending").length;
    if (resolvedEl) resolvedEl.textContent = all.filter(x => x.status === "Resolved").length;

    const sf = document.getElementById("statusFilter") ? document.getElementById("statusFilter").value.toLowerCase() : "";
    const af = document.getElementById("areaFilter") ? document.getElementById("areaFilter").value.toLowerCase() : "";

    const rows = all.filter(x => 
      (!sf || x.status.toLowerCase() === sf) &&
      (!af || x.location.toLowerCase().includes(af) || x.area.toLowerCase().includes(af))
    );

    const complaintsEl = document.getElementById("adminComplaints");
    if (complaintsEl) {
      complaintsEl.innerHTML = rows.map(x => `
        <tr>
          <td>${x.id}</td>
          <td>${esc(x.citizen)}</td>
          <td>${esc(x.location)}</td>
          <td>${esc(x.wasteType)}</td>
          <td>${x.date}</td>
          <td>${statusBadge(x.status)}</td>
          <td>
            <select class="form-select form-select-sm status-change" data-id="${x.id}">
              <option ${x.status === "Pending" ? "selected" : ""}>Pending</option>
              <option ${x.status === "In Progress" ? "selected" : ""}>In Progress</option>
              <option ${x.status === "Resolved" ? "selected" : ""}>Resolved</option>
            </select>
          </td>
        </tr>
      `).join("") || `<tr><td colspan="7" class="text-center py-4 text-muted">No complaints match the filters.</td></tr>`;
    }

    document.querySelectorAll(".status-change").forEach(s => {
      s.onchange = () => {
        const arr = getComplaints();
        const item = arr.find(x => x.id === s.dataset.id);
        if (item) {
          item.status = s.value;
          saveComplaints(arr);
          render();
        }
      };
    });

    renderBins();
    renderChart();
  }

  function renderBins() {
    const binCardsEl = document.getElementById("binCards");
    if (!binCardsEl) return;
    binCardsEl.innerHTML = getBins().map(b => {
      const s = binStatus(b.fill);
      const cl = s.toLowerCase();
      return `
        <div class="col-md-6 col-lg-4 col-xl">
          <div class="bin-card">
            <div class="d-flex justify-content-between">
              <span class="bin-id">${b.id}</span>
              <span class="status-badge bin-${cl}">${s}</span>
            </div>
            <p class="text-muted small mt-2 mb-2">${esc(b.location)} • ${esc(b.area)}</p>
            <div class="d-flex justify-content-between mb-1">
              <small>Fill level</small>
              <strong>${b.fill}%</strong>
            </div>
            <div class="fill-bar">
              <span class="fill-${cl}" style="width:${b.fill}%"></span>
            </div>
          </div>
        </div>`;
    }).join("");
  }

  function renderChart() {
    const chartEl = document.getElementById("complaintChart");
    if (!chartEl || typeof Chart === "undefined") return;
    const c = getComplaints();
    
    if (window.adminChartInstance) {
      window.adminChartInstance.destroy();
    }
    
    window.adminChartInstance = new Chart(chartEl, {
      type: "doughnut",
      data: {
        labels: ["Pending", "In Progress", "Resolved"],
        datasets: [{
          data: ["Pending", "In Progress", "Resolved"].map(s => c.filter(x => x.status === s).length),
          backgroundColor: ["#cf8911", "#0b697d", "#1e7044"]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom" }
        }
      }
    });
  }

  const statusFilter = document.getElementById("statusFilter");
  const areaFilter = document.getElementById("areaFilter");
  if (statusFilter) statusFilter.onchange = render;
  if (areaFilter) areaFilter.oninput = render;

  render();
});
