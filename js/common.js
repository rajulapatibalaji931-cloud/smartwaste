document.addEventListener("DOMContentLoaded", () => {
  const citizenSession = JSON.parse(localStorage.getItem("smartwaste_session") || "null");
  const isAdmin = localStorage.getItem("smartwaste_admin") === "true";

  let authLinks = "";
  if (citizenSession || isAdmin) {
    const userDisplay = citizenSession ? citizenSession.name : "Admin";
    authLinks = `
      <li class="nav-item d-flex align-items-center text-light me-2">
        <span class="small text-muted me-2">Signed in:</span><strong>${esc(userDisplay)}</strong>
      </li>
      <li class="nav-item">
        <button id="logoutBtn" class="btn btn-outline-danger btn-sm px-3 ms-lg-2">Logout</button>
      </li>
    `;
  } else {
    authLinks = `
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Login</a>
        <ul class="dropdown-menu dropdown-menu-end">
          <li><a class="dropdown-item" href="login.html">Citizen Login</a></li>
          <li><a class="dropdown-item" href="register.html">Citizen Register</a></li>
          <li><a class="dropdown-item" href="admin-login.html">Admin Login</a></li>
        </ul>
      </li>
    `;
  }

  const nav = `
    <nav class="navbar navbar-expand-lg navbar-dark sticky-top">
      <div class="container">
        <a class="navbar-brand" href="index.html"><i class="fa-solid fa-recycle me-2"></i>SmartWaste</a>
        <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div id="nav" class="collapse navbar-collapse">
          <ul class="navbar-nav ms-auto align-items-lg-center">
            <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
            <li class="nav-item"><a class="nav-link" href="dashboard.html">Citizen Dashboard</a></li>
            <li class="nav-item"><a class="nav-link" href="bins.html">Bin Status</a></li>
            <li class="nav-item"><a class="nav-link" href="about.html">About</a></li>
            ${authLinks}
            <li class="nav-item ms-lg-2"><a class="btn btn-success btn-sm px-3" href="admin.html">Admin Panel</a></li>
          </ul>
        </div>
      </div>
    </nav>`;

  const navbarEl = document.getElementById("navbar");
  if (navbarEl) navbarEl.innerHTML = nav;

  const footerEl = document.getElementById("footer");
  if (footerEl) {
    footerEl.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="row g-4">
            <div class="col-md-6">
              <h4><i class="fa-solid fa-recycle me-2"></i>SmartWaste</h4>
              <p class="mb-0">Smart urban waste management prototype for Mylavaram, NTR District, Andhra Pradesh.</p>
            </div>
            <div class="col-md-3">
              <h6>Quick Links</h6>
              <p class="mb-1"><a href="dashboard.html">Citizen Dashboard</a></p>
              <p class="mb-1"><a href="bins.html">Bin Status</a></p>
              <p class="mb-1"><a href="about.html">About</a></p>
            </div>
            <div class="col-md-3">
              <h6>Demo</h6>
              <p class="mb-1">Citizen: user@gmail.com</p>
              <p>Admin: admin@smartwaste.com</p>
            </div>
          </div>
          <hr>
          <div class="small text-center">© 2026 SmartWaste Management System • Mylavaram, NTR District</div>
        </div>
      </footer>`;
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("smartwaste_session");
      localStorage.removeItem("smartwaste_admin");
      location.href = "login.html";
    });
  }

  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach(a => {
    if (a.getAttribute("href") === path) a.classList.add("active");
  });
});

function alertBox(id, msg, type = "success") {
  const el = document.getElementById(id);
  if (el) el.innerHTML = `<div class="alert alert-${type} py-2 mb-3">${msg}</div>`;
}

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, m => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[m]));
}

function statusBadge(s) {
  let c = s === "Resolved" ? "status-resolved" : s === "In Progress" ? "status-progress" : "status-pending";
  return `<span class="status-badge ${c}">${esc(s)}</span>`;
}
