import { useState } from "react";

export default function CreateEventModal({ onClose }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    capacity: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const update = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const normalizeDate = (value) => (value ? value + ":00" : null);
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const payload = {
        title: form.title,
        description: form.description.trim() === "" ? null : form.description,
        startDate: normalizeDate(form.startDate),
        endDate:
          form.endDate.trim() === "" ? null : normalizeDate(form.endDate),
        location: form.location,
        capacity: form.capacity === "" ? null : Number(form.capacity),
      };

      const res = await fetch("http://localhost:8080/api/events", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorBody = await res.json();

        if (errorBody.errors) {
          const firstField = Object.keys(errorBody.errors)[0];
          const firstMessage = errorBody.errors[firstField][0];
          throw new Error(firstMessage);
        }

        if (errorBody.error) {
          throw new Error(errorBody.error);
        }

        throw new Error("Ismeretlen hiba történt.");
      }

      setSuccess(true);

      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 900);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        fixed inset-0 bg-black/50 backdrop-blur-sm 
        flex items-center justify-center z-50
        px-4
      "
      onClick={onClose}
    >
      <div
        className="
          w-full max-w-2xl 
          bg-white 
          rounded-2xl 
          shadow-2xl 
          border border-[var(--ruby-red)]/20 
          p-8 
          space-y-6
        "
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-[var(--rich-mahogany)]">
          Új esemény létrehozása
        </h2>

        {success && (
          <p className="p-3 rounded-lg bg-green-100 text-green-700 border border-green-300">
            Esemény sikeresen létrehozva!
          </p>
        )}

        {error && (
          <p className="p-3 rounded-lg bg-red-100 text-red-700 border border-red-300">
            {error}
          </p>
        )}

        <form onSubmit={submit} className="space-y-5">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-[var(--rich-mahogany)]">
              Cím
            </label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              className="w-full p-3 rounded-lg border border-[var(--ruby-red)]/30 
                focus:ring-2 focus:ring-[var(--ruby-red)]/40
                outline-none transition"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-[var(--rich-mahogany)]">
              Leírás (opcionális)
            </label>
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              className="w-full p-3 rounded-lg border border-[var(--ruby-red)]/30 
                focus:ring-2 focus:ring-[var(--ruby-red)]/40
                outline-none resize-none transition"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-[var(--rich-mahogany)]">
                Kezdés
              </label>
              <input
                type="datetime-local"
                required
                value={form.startDate}
                onChange={(e) => update("startDate", e.target.value)}
                className="w-full p-3 rounded-lg border border-[var(--ruby-red)]/30 
                  focus:ring-2 focus:ring-[var(--ruby-red)]/40
                  outline-none transition"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-[var(--rich-mahogany)]">
                Befejezés (opcionális)
              </label>
              <input
                type="datetime-local"
                value={form.endDate}
                onChange={(e) => update("endDate", e.target.value)}
                className="w-full p-3 rounded-lg border border-[var(--ruby-red)]/30 
                  focus:ring-2 focus:ring-[var(--ruby-red)]/40
                  outline-none transition"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-[var(--rich-mahogany)]">
              Helyszín
            </label>
            <input
              type="text"
              required
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
              className="w-full p-3 rounded-lg border border-[var(--ruby-red)]/30 
                focus:ring-2 focus:ring-[var(--ruby-red)]/40
                outline-none transition"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-[var(--rich-mahogany)]">
              Kapacitás
            </label>
            <input
              type="number"
              required
              min="1"
              value={form.capacity}
              onChange={(e) => update("capacity", e.target.value)}
              className="w-full p-3 rounded-lg border border-[var(--ruby-red)]/30 
                focus:ring-2 focus:ring-[var(--ruby-red)]/40
                outline-none transition"
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border border-[var(--ruby-red)]/30 
                text-[var(--rich-mahogany)] hover:bg-[var(--ruby-red)]/10 
                transition active:scale-95"
            >
              Mégse
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-[var(--ruby-red)] text-white font-semibold
                shadow-md hover:scale-[1.03] active:scale-95 transition
                hover:bg-[var(--ruby-red)]/90 disabled:opacity-50"
            >
              {loading ? "Feldolgozás..." : "Létrehozás"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
