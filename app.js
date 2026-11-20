// Shared Data Layer using localStorage so all 3 members' pages stay synced
const defaultContractors = [
  {
    id: 201,
    name: "UrbanCraft Interiors",
    specialty: "Modular Kitchen",
    city: "Bengaluru",
    ratePerSqFt: 1450,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400",
    inquiries: [
      { client: "Vikram Nair", areaSqFt: 180, estimate: 261000, date: "18 Nov 2026" }
    ]
  },
  {
    id: 202,
    name: "Apex Waterproofing &amp; Civil",
    specialty: "Bathroom &amp; Plumbing",
    city: "Pune",
    ratePerSqFt: 950,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400",
    inquiries: []
  },
  {
    id: 203,
    name: "RoyalFinish Wall &amp; Paint Co.",
    specialty: "Painting &amp; Flooring",
    city: "Mumbai",
    ratePerSqFt: 650,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400",
    inquiries: []
  }
];

function getContractors() {
  const data = localStorage.getItem("renohub_contractors");
  if (!data) {
    localStorage.setItem("renohub_contractors", JSON.stringify(defaultContractors));
    return defaultContractors;
  }
  return JSON.parse(data);
}

function saveContractors(contractors) {
  localStorage.setItem("renohub_contractors", JSON.stringify(contractors));
}

function formatINR(amount) {
  return "₹" + Number(amount).toLocaleString("en-IN");
}