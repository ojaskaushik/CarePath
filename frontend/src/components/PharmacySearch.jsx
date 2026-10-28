import { useState } from "react";
import { MapPin, Search, Navigation } from "lucide-react";
import "../styles/pharmacies.css";

export default function PharmacySearch({ onSearch }) {
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const searchLocation = location.trim();

    if (!searchLocation) {
      setError("Please enter a city or postal code.");
      return;
    }

    setError("");
    onSearch(searchLocation);
  };

  return (
    <div className="care-pharmacy-search">
      <form
        onSubmit={handleSubmit}
        className="care-pharmacy-search-form"
      >
        <div className="care-pharmacy-search-row">
          <div className="care-pharmacy-input-wrapper">
            <MapPin
              size={22}
              className="care-pharmacy-location-icon"
            />

            <label
              htmlFor="pharmacy-location"
              className="care-pharmacy-sr-only"
            >
              City or postal code
            </label>

            <input
              id="pharmacy-location"
              type="text"
              value={location}
              onChange={(event) => {
                setLocation(event.target.value);
                setError("");
              }}
              placeholder="Enter a city or postal code"
              maxLength={120}
              className="care-pharmacy-input"
            />
          </div>

          <button
            type="submit"
            className="care-pharmacy-search-button"
          >
            <Search size={19} />
            Find Pharmacies
          </button>
        </div>
      </form>

      {error && (
        <p role="alert" className="care-pharmacy-error">
          {error}
        </p>
      )}

      <p className="care-pharmacy-search-note">
        <Navigation size={16} />
        Starting with Canadian pharmacies
      </p>
    </div>
  );
}
