document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("adminLoginForm");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const email = document.getElementById("adminEmail").value.trim().toLowerCase();
      const password = document.getElementById("adminPassword").value;

      if (email === "admin@smartwaste.com" && password === "admin123") {
        localStorage.setItem("smartwaste_admin", "true");
        alertBox("adminAlert", "Login successfully! Redirecting...");
        setTimeout(() => {
          location.href = "admin.html";
        }, 700);
      } else {
        alertBox("adminAlert", "Invalid admin credentials.", "danger");
      }
    });
  }
});
