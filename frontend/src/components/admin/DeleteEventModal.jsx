import { useState } from "react";

export default function DeleteEventModal({ event, onClose }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`http://localhost:8080/api/events/${event.id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Az esemény törlése sikertelen.");

      onClose();
      setTimeout(() => window.location.reload(), 400);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        -top-10 fixed inset-0
        bg-black/50 backdrop-blur-sm
        flex items-center justify-center
        z-50
      "
      onClick={onClose}
    >
      <div
        className="
          w-full max-w-md bg-white 
          rounded-2xl p-6 
          border border-red-300 shadow-xl z-[999]
        "
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-red-700 mb-4">Esemény törlése</h2>

        <p className="text-[var(--rich-mahogany)] mb-4">
          Biztosan törölni szeretnéd az alábbi eseményt?
        </p>

        <p className="font-semibold text-[var(--ruby-red)] mb-6">
          {event.title}
        </p>

        {event.registered > 0 && (
          <p className="mb-4 p-3 rounded-lg bg-yellow-100 text-yellow-800 border border-yellow-300">
            Figyelem! Ehhez az eseményhez <strong>{event.registered}</strong>{" "}
            jelentkezés tartozik. Az esemény törlésével ezek a foglalások is
            véglegesen törlődnek!
          </p>
        )}

        {error && (
          <p className="mb-4 p-2 rounded-lg bg-red-100 text-red-700 border border-red-300">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-red-300 text-red-700 hover:bg-red-50 transition active:scale-95"
          >
            Mégse
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold shadow hover:bg-red-700 hover:scale-105 active:scale-95 transition disabled:opacity-50"
          >
            {loading ? "Törlés..." : "Törlés"}
          </button>
        </div>
      </div>
    </div>
  );
}
