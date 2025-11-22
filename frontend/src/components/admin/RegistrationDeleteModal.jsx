import { useState } from "react";

export default function RegistrationDeleteModal({
  registration,
  user,
  eventId,
  onClose,
  onDeleted,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `http://localhost:8080/api/registrations/${eventId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: registration.userId }),
        }
      );

      if (!res.ok) throw new Error("A jelentkezés törlése sikertelen.");

      onDeleted(registration.userId);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl p-6 border border-red-300 shadow-xl z-[999]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-red-700 mb-4">
          Jelentkezés törlése
        </h2>

        <p className="text-[var(--rich-mahogany)] mb-3">
          Biztosan törölni szeretnéd az alábbi felhasználó jelentkezését?
        </p>

        <p className="font-semibold text-[var(--ruby-red)] mb-4">
          {user?.firstName} {user?.lastName} ({user?.email})
        </p>

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
            className="
              px-4 py-2 rounded-lg bg-red-600 text-white font-semibold shadow 
              hover:bg-red-700 hover:scale-105 active:scale-95 
              transition disabled:opacity-50
            "
          >
            {loading ? "Törlés..." : "Törlés"}
          </button>
        </div>
      </div>
    </div>
  );
}
