defaultBins=[
{id:"BIN-001",location:" LLR Stadium",area:"Central",lat:16.5062,lng:80.6480,fill:20},
{id:"BIN-002",location:"ALFA",area:"Central",lat:16.4972,lng:80.6570,fill:45},
{id:"BIN-003",location:"Bus Stand",area:"East",lat:16.5170,lng:80.6820,fill:65},
{id:"BIN-004",location:"Nuzividu Road",area:"East",lat:16.4895,lng:80.6670,fill:82},
{id:"BIN-005",location:"Venkatawaswara Temple",area:"South",lat:16.4780,lng:80.6900,fill:95}
];
 defaultComplaints=[
{id:"CMP-1001",userEmail:"user@gmail.com",citizen:"Demo User",location:" LLR Stadium",area:"Central",wasteType:"Plastic Waste",description:"Plastic waste overflowing near the public bin.",date:"2026-08-15",status:"Pending"},
{id:"CMP-1002",userEmail:"user@gmail.com",citizen:"Demo User",location:"ALFA",area:"Central",wasteType:"Household Waste",description:"Garbage has not been collected for two days.",date:"2026-08-14",status:"In Progress"},
{id:"CMP-1003",userEmail:"citizen2@gmail.com",citizen:"Anita Rao",location:"Bus Stand",area:"East",wasteType:"Mixed Waste",description:"Waste dumped beside the road.",date:"2026-08-12",status:"Resolved"},
{id:"CMP-1004",userEmail:"citizen3@gmail.com",citizen:"Ravi Kumar",location:"Nuzividu Road",area:"East",wasteType:"Organic Waste",description:"Organic waste pile causing bad smell.",date:"2026-08-10",status:"Pending"},
{id:"CMP-1005",userEmail:"citizen4@gmail.com",citizen:"Priya Singh",location:"Venkatawaswara Temple",area:"South",wasteType:"Construction Waste",description:"Construction debris blocking footpath.",date:"2026-08-08",status:"Resolved"}
];
function initData(){if(!localStorage.getItem("smartwaste_bins"))localStorage.setItem("smartwaste_bins",JSON.stringify(defaultBins));if(!localStorage.getItem("smartwaste_complaints"))localStorage.setItem("smartwaste_complaints",JSON.stringify(defaultComplaints));if(!localStorage.getItem("smartwaste_users"))localStorage.setItem("smartwaste_users",JSON.stringify([{name:"Demo User",email:"user@gmail.com",phone:"9876543210",address:"Vijayawada",password:"user123"}]));}
initData();
const getBins=()=>JSON.parse(localStorage.getItem("smartwaste_bins")||"[]");
const getComplaints=()=>JSON.parse(localStorage.getItem("smartwaste_complaints")||"[]");
const saveComplaints=x=>localStorage.setItem("smartwaste_complaints",JSON.stringify(x));
const getUsers=()=>JSON.parse(localStorage.getItem("smartwaste_users")||"[]");
const binStatus=f=>f>=80?"Red":f>=50?"Yellow":"Green";