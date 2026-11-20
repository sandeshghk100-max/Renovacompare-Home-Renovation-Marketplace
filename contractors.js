const contractorGrid = document.getElementById("contractorGrid");
const searchInput = document.getElementById("searchInput");
const specialtyFilter = document.getElementById("specialtyFilter");

function renderContractors() {
  const contractors = getContractors();
  const query = searchInput.value.toLowerCase();
  const specialty = specialtyFilter.value;

  const filtered = contractors.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(query) ||
      item.city.toLowerCase().includes(query);
    const matchesSpecialty = specialty === "All" || item.specialty === specialty;
    return matchesSearch && matchesSpecialty;
  });

  contractorGrid.innerHTML = "";

  if (filtered.length === 0) {
    contractorGrid.innerHTML = "<p>No matching contractors found.</p>";
    return;
  }

  filtered.forEach(item => {
    const card = document.createElement("div");
    card.className = "contractor-card";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="card-body">
        <div>
          <span class="badge">${item.specialty}</span>
          <h3>${item.name}</h3>
          <p class="city-text">${item.city} • Rating: ${item.rating}/5</p>
          <p class="rate-tag">${formatINR(item.ratePerSqFt)} / sq. ft.</p>
        </div>
        <button class="btn primary" onclick="selectContractor(${item.id})">Get Quote &amp; Book</button>
      </div>
    `;
    contractorGrid.appendChild(card);
  });
}

function selectContractor(id) {
  localStorage.setItem("selected_contractor_id", id);
  window.location.href = "../member2/quotes.html";
}

searchInput.addEventListener("input", renderContractors);
specialtyFilter.addEventListener("change", renderContractors);

renderContractors();