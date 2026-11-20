const contractorSwitcher = document.getElementById("contractorSwitcher");
const quoteForm = document.getElementById("quoteForm");
const quoteMessage = document.getElementById("quoteMessage");
const areaInput = document.getElementById("areaSqFt");
const liveEstimateEl = document.getElementById("liveEstimate");

function getCurrentContractor() {
  const contractors = getContractors();
  const currentId = Number(contractorSwitcher.value);
  return contractors.find(c => c.id === currentId);
}

function updateLiveEstimate() {
  const contractor = getCurrentContractor();
  const area = Number(areaInput.value);
  if (!contractor || area <= 0) {
    liveEstimateEl.textContent = "₹0";
    return;
  }
  liveEstimateEl.textContent = formatINR(area * contractor.ratePerSqFt);
}

function loadContractorDropdown() {
  const contractors = getContractors();
  contractorSwitcher.innerHTML = "";

  contractors.forEach(item => {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = `${item.name} (${formatINR(item.ratePerSqFt)}/sq.ft.)`;
    contractorSwitcher.appendChild(option);
  });

  const savedId = localStorage.getItem("selected_contractor_id");
  if (savedId && contractors.some(c => c.id == savedId)) {
    contractorSwitcher.value = savedId;
  }
  renderSelectedContractor();
}

function renderSelectedContractor() {
  const item = getCurrentContractor();
  if (!item) return;

  localStorage.setItem("selected_contractor_id", item.id);

  document.getElementById("contractorImage").src = item.image;
  document.getElementById("contractorSpecialty").textContent = item.specialty;
  document.getElementById("contractorName").textContent = item.name;
  document.getElementById("contractorCity").textContent = `City: ${item.city}`;
  document.getElementById("contractorRate").textContent = formatINR(item.ratePerSqFt);

  const inquiryList = document.getElementById("inquiryList");
  inquiryList.innerHTML = "";

  if (!item.inquiries || item.inquiries.length === 0) {
    inquiryList.innerHTML = "<li>No bookings yet. Request a quote above.</li>";
  } else {
    [...item.inquiries].reverse().forEach(inq => {
      const li = document.createElement("li");
      li.innerHTML = `<span><strong>${inq.client}</strong> (${inq.areaSqFt} sq.ft.)</span> <span>${formatINR(inq.estimate)}</span>`;
      inquiryList.appendChild(li);
    });
  }

  updateLiveEstimate();
}

areaInput.addEventListener("input", updateLiveEstimate);

quoteForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const contractors = getContractors();
  const currentId = Number(contractorSwitcher.value);
  const idx = contractors.findIndex(c => c.id === currentId);

  const clientName = document.getElementById("clientName").value.trim();
  const areaSqFt = Number(areaInput.value);

  if (areaSqFt <= 0) {
    quoteMessage.style.color = "#dc2626";
    quoteMessage.textContent = "Please enter a valid area greater than 0 sq. ft.";
    return;
  }

  const estimate = areaSqFt * contractors[idx].ratePerSqFt;
  const dateStr = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  contractors[idx].inquiries = contractors[idx].inquiries || [];
  contractors[idx].inquiries.push({
    client: clientName,
    areaSqFt: areaSqFt,
    estimate: estimate,
    date: dateStr
  });

  saveContractors(contractors);
  quoteMessage.style.color = "#0f766e";
  quoteMessage.textContent = `Booking confirmed! Estimated cost: ${formatINR(estimate)}`;
  quoteForm.reset();
  loadContractorDropdown();
});

contractorSwitcher.addEventListener("change", renderSelectedContractor);
loadContractorDropdown();