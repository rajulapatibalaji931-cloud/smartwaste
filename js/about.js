document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      if (!e.target.checkValidity()) {
        e.target.reportValidity();
        return;
      }
      alertBox("contactAlert", "Message sent successfully!");
      e.target.reset();
    });
  }
});
