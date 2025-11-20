// src/Home.jsx
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";

function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [sortKey, setSortKey] = useState("startDate");
  const [sortOrder, setSortOrder] = useState("asc");

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/events");
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
    loadEvents();
  }, []);

  useEffect(() => {
    if (!loading) {
      let start = 0;
      const end = events.length;
      if (start === end) return;

      let increment = end / 30;
      let timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          start = end;
          clearInterval(timer);
        }
        setCounter(Math.floor(start));
      }, 20);

      return () => clearInterval(timer);
    }
  }, [loading, events.length]);

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
    <div className="min-h-screen bg-[var(--white)] text-[var(--rich-mahogany)]">
      <Navbar />

      <main
        className="
          max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 space-y-10
          opacity-0 translate-y-3 animate-[fadeIn_0.6s_ease-out_forwards]
        "
      >

        {/* HERO */}
        <section className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Események egy helyen,
              <span className="text-[var(--ruby-red)]"> átláthatóan.</span>
            </h1>
            <p className="text-sm sm:text-base text-[var(--rich-mahogany)]/70 max-w-md">
              Nézd meg a közelgő programokat, és később itt tudsz regisztrálni
              vagy saját eseményt létrehozni.
            </p>
          </div>

          <div className="mt-2 lg:mt-0">
            <div
              className="
                group relative rounded-3xl bg-white border border-[var(--ruby-red-transparent)] shadow-sm
                hover:shadow-md hover:-translate-y-[2px] transition-all duration-300
                px-6 py-5 flex items-center justify-between cursor-pointer
              "
            >
              <div className="flex flex-col gap-1">
                <span className="text-xs tracking-wide uppercase text-[var(--rich-mahogany)]/50">
                  Összes esemény
                </span>
                <span className="text-3xl font-bold text-[var(--rich-mahogany)]">
                  {counter}
                </span>
              </div>

              <div
                className="
                  w-1/4 h-1 rounded-full
                  bg-gradient-to-r from-[var(--ruby-red)]/20 to-[var(--burnt-peach)]/20
                  group-hover:from-[var(--ruby-red)]/40 group-hover:to-[var(--burnt-peach)]/40
                  transition-all duration-300
                "
              />

              <div
                className="
                  absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100
                  bg-gradient-to-r from-[var(--ruby-red)]/5 to-transparent transition-opacity duration-300
                "
              />
            </div>
          </div>
        </section>

        <hr className="border-[var(--ruby-red-transparent)] my-4" />

        <section className="space-y-4">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

            <h2 className="text-lg font-semibold">Közelgő események</h2>

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
                    className="px-4 py-2 hover:bg-[var(--ruby-red-transparent)] transition-all duration-200 ease-in-outcursor-pointer flex justify-between"
                  >
                    <span>Kapacitás</span>
                    {sortKey === "capacity" && "✔"}
                  </div>

                  <hr className="my-1 border-[var(--ruby-red-transparent)]" />

                  <div
                    onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
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
            <div className="flex flex-col items-center justify-center py-10 text-[var(--rich-mahogany)]/70">
              <div className="w-8 h-8 border-4 border-[var(--ruby-red)] border-t-transparent rounded-full animate-spin mb-3" />
              <p className="text-sm">Betöltés...</p>
            </div>
          )}

          {!loading && error && (
            <div className="rounded-2xl border border-red-500/40 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {!loading && !error && events.length === 0 && (
            <div className="rounded-2xl border border-[var(--ruby-red)]/15 bg-[var(--ruby-red)]/5 px-4 py-4 text-sm text-[var(--rich-mahogany)]/80">
              Még nincs egyetlen esemény sem. 🎉
            </div>
          )}

          {!loading && !error && events.length > 0 && (
            <div className="flex flex-col gap-6">
              {sortEvents(events, sortKey, sortOrder).map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Home;
