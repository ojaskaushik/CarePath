import { useState } from "react";
import { MapPin, Search, Navigation } from "lucide-react";

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
    <div className="mx-auto max-w-3xl">
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-slate-200 bg-white p-3 shadow-xl shadow-teal-900/5 sm:p-4"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-3 px-3">
            <MapPin
              size={22}
              className="shrink-0 text-teal-600"
            />

            <label htmlFor="pharmacy-location" className="sr-only">
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
              className="w-full bg-transparent py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 sm:text-base"
            />
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-2xl bg-teal-600 px-7 py-4 font-semibold text-white transition hover:bg-teal-700"
          >
            <Search size={19} />
            Find Pharmacies
          </button>
        </div>
      </form>

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <p className="mt-5 flex items-center justify-center gap-2 text-center text-sm text-slate-500">
        <Navigation size={16} className="text-teal-600" />
        Starting with Canadian pharmacies
      </p>
    </div>
  );
}
