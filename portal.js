const addForm = document.getElementById("addContractorForm");
const portalBody = document.getElementById("portalBody");

function renderPortal() {
  const contractors = getContractors();

  document.getElementById("totalContractors").textContent = contractors.length;

  const totalBookingVal = contractors.reduce((sum, item) => {
    const itemBookings = (item.inquiries || []).reduce((s, b) => s + Number(b.estimate), 0);
    return sum + itemBookings;
  }, 0);
  document.getElementById("totalBookingsValue").textContent = formatINR(totalBookingVal);

  portalBody.innerHTML = "";
  contractors.forEach(item => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.name}</td>
      <td>${item.city}</td>
      <td>${formatINR(item.ratePerSqFt)}</td>
      <td><button class="delete-btn" onclick="deleteContractor(${item.id})">Remove</button></td>
    `;
    portalBody.appendChild(tr);
  });
}

addForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const contractors = getContractors();

  const name = document.getElementById("name").value.trim();
  const specialty = document.getElementById("specialty").value;
  const city = document.getElementById("city").value.trim();
  const ratePerSqFt = Number(document.getElementById("ratePerSqFt").value);
  const imageInput = document.getElementById("imageUrl").value.trim();

  const newContractor = {
    id: Date.now(),
    name: name,
    specialty: specialty,
    city: city,
    ratePerSqFt: ratePerSqFt,
    rating: 4.5,
    image: imageInput || "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400",
    inquiries: []
  };

  contractors.push(newContractor);
  saveContractors(contractors);
  addForm.reset();
  renderPortal();
  alert("Contractor profile published! It now appears on Member 1's directory.");
});

function deleteContractor(id) {
  let contractors = getContractors();
  contractors = contractors.filter(item => item.id !== id);
  saveContractors(contractors);
  renderPortal();
}

renderPortal();