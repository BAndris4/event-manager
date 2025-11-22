import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";
import useAuthStatus from "../hooks/useAuthStatus";

function MyRegistrations() {
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [error, setError] = useState("");

  const { registrations, loading: authLoading } = useAuthStatus();

  useEffect(() => {
    const loadEvents = async () => {
      try {
        if (!registrations || registrations.length === 0) {
          setEvents([]);
          return;
        }

        const eventIds = registrations.map((r) => r.eventId);

        // Lekérjük az összes eseményt
        const res = await fetch("http://localhost:8080/api/events");
        if (!res.ok) throw new Error("Nem sikerült betölteni az eseményeket.");

        const data = await res.json();

        // Csak a user által regisztrált események
        const filtered = data.filter((ev) => eventIds.includes(ev.id));
        setEvents(filtered);
      } catch (err) {
        console.error(err);
        setError("Hiba történt a regisztrációk betöltése közben.");
      } finally {
        setLoadingEvents(false);
      }
    };

    if (!authLoading) {
      loadEvents();
    }
  }, [authLoading, registrations]);

  return (
    <div className="min-h-screen bg-[var(--white)] text-[var(--rich-mahogany)]">
      <Navbar />

      <main
        className="
          max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 space-y-10
          opacity-0 translate-y-3 animate-[fadeIn_0.6s_ease-out_forwards]
        "
      >
        <section className="flex flex-col gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Jelentkezéseim
            <span className="text-[var(--ruby-red)]"> — áttekintés</span>
          </h1>
          <p className="text-sm text-[var(--rich-mahogany)]/70 max-w-md">
            Itt találod az összes eseményt, amelyre regisztráltál.
          </p>
        </section>

        <hr className="border-[var(--ruby-red-transparent)] my-4" />

        {loadingEvents && (
          <div className="flex flex-col items-center justify-center py-10 text-[var(--rich-mahogany)]/70">
            <div className="w-8 h-8 border-4 border-[var(--ruby-red)] border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-sm">Betöltés...</p>
          </div>
        )}

        {!loadingEvents && error && (
          <div className="rounded-2xl border border-red-500/40 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {!loadingEvents && !error && events.length === 0 && (
          <div className="rounded-2xl border border-[var(--ruby-red)]/15 bg-[var(--ruby-red)]/5 px-4 py-4 text-sm text-[var(--rich-mahogany)]/80">
            Még nem jelentkeztél egyetlen eseményre sem. 📭
          </div>
        )}

        {!loadingEvents && events.length > 0 && (
          <div className="flex flex-col gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default MyRegistrations;
