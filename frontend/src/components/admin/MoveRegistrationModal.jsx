import { useEffect, useState } from "react";

export default function MoveRegistrationModal({
  registration,
  user,
  currentEventId,
  onClose,
  onMoved,
}) {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/events", {
          credentials: "include",
        });

        const data = await res.json();

        const filtered = Array.isArray(data)
          ? data.filter(
              (e) =>
                e.id !== currentEventId &&
                e.capacity != null &&
                e.registered != null &&
                e.registered < e.capacity
            )
          : [];

        setEvents(filtered);
      } catch (err) {
        console.error("Failed to load events for move:", err);
        setError("Nem sikerült betölteni az eseményeket.");
      } finally {
        setLoadingEvents(false);
      }
    };

    loadEvents();
  }, [currentEventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEventId) return;

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(
        `http://localhost:8080/api/registrations/${registration.id}/move/${selectedEventId}`,
        {
          method: "PUT",
          credentials: "include",
        }
      );

      if (!res.ok) {
        if (res.status === 409) {
          throw new Error(
            "A kiválasztott eseményre már jelentkezett a felhasználó."
          );
        } else {
          throw new Error("Az áthelyezés sikertelen volt.");
        }
      }

      if (onMoved) {
        onMoved(registration.id, selectedEventId);
      }
      setTimeout(() => {
        window.location.reload();
      }, 900);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="
        fixed inset-0
        bg-black/50 backdrop-blur-sm
        flex items-center justify-center
        z-50 px-4
      "
      onClick={onClose}
    >
      <div
        className="
          w-full max-w-lg bg-white 
          rounded-2xl p-6 
          border border-emerald-300 shadow-xl
        "
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-emerald-700 mb-4">
          Jelentkezés áthelyezése
        </h2>

        <p className="text-[var(--rich-mahogany)] mb-2">
          Felhasználó:{" "}
          <span className="font-semibold">
            {user.firstName} {user.lastName} ({user.email})
          </span>
        </p>

        <p className="text-[var(--rich-mahogany)]/80 mb-4">
          Válaszd ki, melyik másik eseményre szeretnéd áthelyezni a
          jelentkezését. Csak olyan események jelennek meg, ahol még van szabad
          hely.
        </p>

        {loadingEvents && (
          <p className="text-[var(--rich-mahogany)]/70 mb-3">
            Események betöltése...
          </p>
        )}

        {!loadingEvents && events.length === 0 && (
          <p className="mb-4 p-3 rounded-lg bg-yellow-100 text-yellow-800 border border-yellow-300">
            Jelenleg nincs olyan másik esemény, ahová át lehetne helyezni a
            jelentkezést (nincs szabad kapacitás vagy nincs más esemény).
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {events.length > 0 && (
            <div className="space-y-1">
              <label className="block text-sm font-medium text-[var(--rich-mahogany)]">
                Cél esemény
              </label>
              <select
                value={selectedEventId}
                onChange={(e) => setSelectedEventId(e.target.value)}
                className="
                  w-full p-3 rounded-lg border border-[var(--ruby-red)]/30 
                  focus:ring-2 focus:ring-[var(--ruby-red)]/40
                  outline-none transition bg-white
                "
              >
                <option value="">Válassz eseményt...</option>
                {events.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.title} — {e.registered}/{e.capacity} fő
                  </option>
                ))}
              </select>
            </div>
          )}

          {error && (
            <p className="p-2 rounded-lg bg-red-100 text-red-700 border border-red-300">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-emerald-300 text-emerald-700 hover:bg-emerald-50 transition active:scale-95"
            >
              Mégse
            </button>

            <button
              type="submit"
              disabled={
                submitting ||
                loadingEvents ||
                !selectedEventId ||
                events.length === 0
              }
              className="
                px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold
                shadow hover:bg-emerald-700 hover:scale-105 active:scale-95
                transition disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {submitting ? "Áthelyezés..." : "Áthelyezés"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
