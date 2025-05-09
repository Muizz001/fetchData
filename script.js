const countrySelect = document.getElementById('country');
const stateSelect = document.getElementById('state');
const citySelect = document.getElementById('city');

async function fetchCountries() {
  try {
    const res = await fetch('https://api-dev.autoby24.ch/api/core/country?limit=all');
    const data = await res.json();
    data.results.forEach(country => {
      const option = document.createElement('option');
      option.value = country.name;
      option.textContent = country.name;
      countrySelect.appendChild(option);
    });
  } catch (error) {
    console.error('Error fetching countries:', error);
  }
}

async function fetchStates(countryName) {
  stateSelect.innerHTML = '<option value="">Select State</option>';
  citySelect.innerHTML = '<option value="">Select City</option>';
  citySelect.disabled = true;

  try {
    const res = await fetch(`https://api-dev.autoby24.ch/api/core/state?country=${encodeURIComponent(countryName)}&limit=all`);
    const data = await res.json();
    data.results.forEach(state => {
      const option = document.createElement('option');
      option.value = state.name;
      option.textContent = state.name;
      stateSelect.appendChild(option);
    });

    stateSelect.disabled = false;
  } catch (error) {
    console.error('Error fetching states:', error);
  }
}

async function fetchCities(stateName) {
  citySelect.innerHTML = '<option value="">Select City</option>';

  try {
    const res = await fetch(`https://api-dev.autoby24.ch/api/core/city?state=${encodeURIComponent(stateName)}&limit=all`);
    const data = await res.json();
    data.results.forEach(city => {
      const option = document.createElement('option');
      option.value = city.name;
      option.textContent = city.name;
      citySelect.appendChild(option);
    });

    citySelect.disabled = false;
  } catch (error) {
    console.error('Error fetching cities:', error);
  }
}

// Event Listeners
countrySelect.addEventListener('change', (e) => {
  const selectedCountry = e.target.value;
  if (selectedCountry) {
    fetchStates(selectedCountry);
  } else {
    stateSelect.innerHTML = '<option value="">Select State</option>';
    stateSelect.disabled = true;
    citySelect.innerHTML = '<option value="">Select City</option>';
    citySelect.disabled = true;
  }
});

stateSelect.addEventListener('change', (e) => {
  const selectedState = e.target.value;
  if (selectedState) {
    fetchCities(selectedState);
  } else {
    citySelect.innerHTML = '<option value="">Select City</option>';
    citySelect.disabled = true;
  }
});

// Initial Load
fetchCountries();
