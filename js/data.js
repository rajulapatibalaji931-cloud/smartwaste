const defaultBins = [
  { id: "BIN-001", location: "Bus Station Road", area: "Mylavaram Central", lat: 16.7588, lng: 80.6402, fill: 20 },
  { id: "BIN-002", location: "Main Bazar", area: "Mylavaram Market", lat: 16.7601, lng: 80.6418, fill: 45 },
  { id: "BIN-003", location: "LBRCE College Road", area: "Mylavaram East", lat: 16.7505, lng: 80.6482, fill: 65 },
  { id: "BIN-004", location: "Nuzvid Bypass Road", area: "Mylavaram North", lat: 16.7645, lng: 80.6385, fill: 82 },
  { id: "BIN-005", location: "Venkateswara Swamy Temple", area: "Mylavaram South", lat: 16.7540, lng: 80.6360, fill: 95 }
];

const defaultComplaints = [
  { id: "CMP-1001", userEmail: "user@gmail.com", citizen: "Demo User", location: "Main Bazar, Mylavaram", area: "Mylavaram Market", wasteType: "Plastic Waste", description: "Plastic waste overflowing near the public bin.", date: "2026-08-15", status: "Pending" },
  { id: "CMP-1002", userEmail: "user@gmail.com", citizen: "Demo User", location: "Bus Station Road, Mylavaram", area: "Mylavaram Central", wasteType: "Household Waste", description: "Garbage has not been collected for two days.", date: "2026-08-14", status: "In Progress" },
  { id: "CMP-1003", userEmail: "citizen2@gmail.com", citizen: "Anita Rao", location: "LBRCE College Road", area: "Mylavaram East", wasteType: "Mixed Waste", description: "Waste dumped beside the road.", date: "2026-08-12", status: "Resolved" },
  { id: "CMP-1004", userEmail: "citizen3@gmail.com", citizen: "Ravi Kumar", location: "Nuzvid Bypass Road", area: "Mylavaram North", wasteType: "Organic Waste", description: "Organic waste pile causing bad smell.", date: "2026-08-10", status: "Pending" },
  { id: "CMP-1005", userEmail: "citizen4@gmail.com", citizen: "Priya Singh", location: "Venkateswara Swamy Temple", area: "Mylavaram South", wasteType: "Construction Waste", description: "Construction debris blocking footpath.", date: "2026-08-08", status: "Resolved" }
];

function initData() {
  if (!localStorage.getItem("smartwaste_bins")) {
    localStorage.setItem("smartwaste_bins", JSON.stringify(defaultBins));
  }
  if (!localStorage.getItem("smartwaste_complaints")) {
    localStorage.setItem("smartwaste_complaints", JSON.stringify(defaultComplaints));
  }
  if (!localStorage.getItem("smartwaste_users")) {
    localStorage.setItem("smartwaste_users", JSON.stringify([
      { name: "User", email: "user@gmail.com", phone: "9876543210", address: "Mylavaram, NTR District, AP", password: "user123" }
    ]));
  }
}
initData();

const getBins = () => JSON.parse(localStorage.getItem("smartwaste_bins") || "[]");
const getComplaints = () => JSON.parse(localStorage.getItem("smartwaste_complaints") || "[]");
const saveComplaints = x => localStorage.setItem("smartwaste_complaints", JSON.stringify(x));
const getUsers = () => JSON.parse(localStorage.getItem("smartwaste_users") || "[]");
const binStatus = f => (f >= 80 ? "Red" : f >= 50 ? "Yellow" : "Green");
