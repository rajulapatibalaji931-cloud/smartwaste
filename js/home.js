document.addEventListener("DOMContentLoaded", () => {
  const c = getComplaints();
  const resEl = document.getElementById("statResolved");
  const userEl = document.getElementById("statUsers");
  const binEl = document.getElementById("statBins");

  if (resEl) resEl.textContent = c.filter(x => x.status === "Resolved").length;
  if (userEl) userEl.textContent = Math.max(1, getUsers().length);
  if (binEl) binEl.textContent = getBins().length;
});
