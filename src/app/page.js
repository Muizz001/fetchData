"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    fetch("https://api-dev.autoby24.ch/api/core/country?limit=all")
      .then((res) => res.json())
      .then((data) => setCountries(data.results || []));
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      setStates([]);
      setSelectedState("");
      setCities([]);
      setSelectedCity("");
      fetch(
        `https://api-dev.autoby24.ch/api/core/state?country=${encodeURIComponent(
          selectedCountry
        )}&limit=all`
      )
        .then((res) => res.json())
        .then((data) => setStates(data.results || []));
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      setCities([]);
      setSelectedCity("");
      fetch(
        `https://api-dev.autoby24.ch/api/core/city?state=${encodeURIComponent(
          selectedState
        )}&limit=all`
      )
        .then((res) => res.json())
        .then((data) => setCities(data.results || []));
    }
  }, [selectedState]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Selected: ${selectedCountry} / ${selectedState} / ${selectedCity}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Select Location
        </h2>

        <div>
          <label htmlFor="country" className="block font-medium mb-1">
            Country
          </label>
          <select
            id="country"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select Country</option>
            {countries.map((country, idx) => (
              <option key={idx} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="state" className="block font-medium mb-1">
            State
          </label>
          <select
            id="state"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            disabled={!states.length}
          >
            <option value="">Select State</option>
            {states.map((state, idx) => (
              <option key={idx} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="city" className="block font-medium mb-1">
            City
          </label>
          <select
            id="city"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            disabled={!cities.length}
          >
            <option value="">Select City</option>
            {cities.map((city, idx) => (
              <option key={idx} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
