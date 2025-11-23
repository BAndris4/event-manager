import { useEffect, useState } from "react";
import AdminEventItem from "./AdminEventItem";

export default function AdminEventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [sortKey, setSortKey] = useState("startDate");
  const [sortOrder, setSortOrder] = useState("asc");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/events", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Nem sikerült betölteni az eseményeket.");

        const data = await res.json();
        setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Hiba történt az események betöltése közben.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const sortEvents = (events, key, order) => {
    return [...events].sort((a, b) => {
      let x = a[key];
      let y = b[key];

      if (key === "startDate") {
        x = new Date(a.startDate);
        y = new Date(b.startDate);
      }
      if (key === "capacity") {
        x = Number(a.capacity);
        y = Number(b.capacity);
      }
      if (key === "title") {
        x = a.title.toLowerCase();
        y = b.title.toLowerCase();
      }

      if (x < y) return order === "asc" ? -1 : 1;
      if (x > y) return order === "asc" ? 1 : -1;
      return 0;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-[var(--rich-mahogany)]">
          Események
        </h2>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="
              px-4 py-2 rounded-xl border border-[var(--ruby-red)]/20
              bg-white shadow-sm text-sm flex items-center gap-2
              hover:bg-[var(--ruby-red)]/5 transition-all
            "
          >
            Rendezés:{" "}
            <span className="font-semibold capitalize text-[var(--rich-mahogany)]">
              {sortKey === "startDate" && "Dátum"}
              {sortKey === "title" && "Név"}
              {sortKey === "capacity" && "Kapacitás"}
            </span>
            <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
          </button>

          {dropdownOpen && (
            <div
              className="
                absolute right-0 mt-2 w-40 
                bg-white border border-[var(--ruby-red)]/20 rounded-xl shadow-md
                py-2 z-20 animate-fade-in
              "
            >
              <div
                onClick={() => {
                  setSortKey("startDate");
                  setDropdownOpen(false);
                }}
                className="px-4 py-2 hover:bg-[var(--ruby-red-transparent)] transition-all duration-200 ease-in-out cursor-pointer flex justify-between"
              >
                <span>Dátum</span>
                {sortKey === "startDate" && "✔"}
              </div>

              <div
                onClick={() => {
                  setSortKey("title");
                  setDropdownOpen(false);
                }}
                className="px-4 py-2 hover:bg-[var(--ruby-red-transparent)] transition-all duration-200 ease-in-out cursor-pointer flex justify-between"
              >
                <span>Név</span>
                {sortKey === "title" && "✔"}
              </div>

              <div
                onClick={() => {
                  setSortKey("capacity");
                  setDropdownOpen(false);
                }}
                className="px-4 py-2 hover:bg-[var(--ruby-red-transparent)] transition-all duration-200 ease-in-out cursor-pointer flex justify-between"
              >
                <span>Kapacitás</span>
                {sortKey === "capacity" && "✔"}
              </div>

              <hr className="my-1 border-[var(--ruby-red-transparent)]" />

              <div
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
                className="px-4 py-2 hover:bg-[var(--ruby-red-transparent)] cursor-pointer flex justify-between"
              >
                <span>Irány</span>
                <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {loading && (
        <p className="text-sm text-[var(--rich-mahogany)]/70">Betöltés...</p>
      )}

      {!loading && error && <p className="text-sm text-red-600">{error}</p>}

      {!loading && !error && events.length === 0 && (
        <div className="rounded-xl bg-[var(--ruby-red)]/5 border border-[var(--ruby-red)]/20 p-4 text-sm text-[var(--rich-mahogany)]/70">
          Nincs egyetlen esemény sem.
        </div>
      )}

      {!loading &&
        !error &&
        sortEvents(events, sortKey, sortOrder).map((event) => (
          <AdminEventItem key={event.id} event={event} />
        ))}
    </div>
  );
}
