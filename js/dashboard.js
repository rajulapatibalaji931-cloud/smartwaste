document.addEventListener("DOMContentLoaded", () => {
  const session = JSON.parse(localStorage.getItem("smartwaste_session") || "null");
  if (!session) {
    location.href = "login.html";
    return;
  }
  
  const userEl = document.getElementById("userName");
  if (userEl) userEl.textContent = session.name;

  function render() {
    const all = getComplaints();
    const mine = all.filter(x => x.userEmail === session.email);
    
    if (document.getElementById("myTotal")) document.getElementById("myTotal").textContent = mine.length;
    if (document.getElementById("myPending")) document.getElementById("myPending").textContent = mine.filter(x => x.status !== "Resolved").length;
    if (document.getElementById("myResolved")) document.getElementById("myResolved").textContent = mine.filter(x => x.status === "Resolved").length;

    const complaintsTable = document.getElementById("myComplaints");
    if (complaintsTable) {
      complaintsTable.innerHTML = mine.length
        ? mine.map(x => `<tr><td>${x.id}</td><td>${esc(x.location)}</td><td>${esc(x.wasteType)}</td><td>${x.date}</td><td>${statusBadge(x.status)}</td></tr>`).join("")
        : `<tr><td colspan="5" class="text-center text-muted py-4">No complaints submitted yet.</td></tr>`;
    }
  }
  render();

  const mapEl = document.getElementById("map");
  if (mapEl && typeof L !== "undefined") {
    const map = L.map("map").setView([16.7588, 80.6402], 14);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap | Mylavaram, NTR District"
    }).addTo(map);

    getBins().forEach(b => {
      const s = binStatus(b.fill);
      const color = s === "Red" ? "#dc3545" : s === "Yellow" ? "#ffc107" : "#198754";
      L.circleMarker([b.lat, b.lng], {
        radius: 10,
        color,
        fillColor: color,
        fillOpacity: 0.85
      }).addTo(map).bindPopup(`<b>${b.id}</b><br>${b.location}<br>${b.area}<br>Fill: ${b.fill}%<br>Status: ${s}`);
    });
  }

  const legend = document.getElementById("binLegend");
  if (legend) {
    legend.innerHTML = `<span class="status-badge bin-green me-2">Green &lt;50%</span><span class="status-badge bin-yellow me-2">Yellow 50–79%</span><span class="status-badge bin-red">Red ≥80%</span>`;
  }

  const complaintForm = document.getElementById("complaintForm");
  if (complaintForm) {
    complaintForm.addEventListener("submit", e => {
      e.preventDefault();
      const f = e.target;
      if (!f.checkValidity()) {
        f.reportValidity();
        return;
      }
      const fileInput = document.getElementById("photo");
      const file = fileInput && fileInput.files ? fileInput.files[0] : null;

      const add = c => {
        const arr = getComplaints();
        arr.unshift({
          id: "CMP-" + (1000 + Date.now() % 9000),
          userEmail: session.email,
          citizen: session.name,
          location: document.getElementById("location").value.trim(),
          area: document.getElementById("location").value.trim().split(",")[0],
          wasteType: document.getElementById("wasteType").value,
          description: document.getElementById("description").value.trim(),
          date: new Date().toISOString().slice(0, 10),
          status: "Pending",
          photo: c || ""
        });
        saveComplaints(arr);
        f.reset();
        render();
        alertBox("complaintAlert", "Complaint submitted successfully and added to your tracking list.");
      };

      if (file) {
        const r = new FileReader();
        r.onload = () => add(r.result);
        r.readAsDataURL(file);
      } else {
        add("");
      }
    });
  }
});
