import { Calendar, MapPin, Users } from "lucide-react";
import useMyRegistrationStatus from "../hooks/useMyRegistrationStatus";
import { useState } from "react";

function formatDate(dateString) {
  if (!dateString) return "Ismeretlen";
  const d = new Date(dateString);
  return d.toLocaleString("hu-HU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getEventStatus(event) {
  const now = new Date();
  const start = new Date(event.startDate);
  const end = event.endDate ? new Date(event.endDate) : null;

  if (end) {
    if (now > end) return "lezarult";
    if (now >= start && now <= end) return "folyamatban";
    return "meg_kezdodik";
  } else {
    if (now > start) return "lezarult";
    return "meg_kezdodik";
  }
}

function getCapacityStatus(event) {
  const { capacity, registered } = event;
  return registered >= capacity ? "tele" : "vanhely";
}

function EventCard({ event }) {
  const { isAuthenticated, registrations } = useMyRegistrationStatus();
  const [loading, setLoading] = useState(false);

  const status = getEventStatus(event);
  const isFull = getCapacityStatus(event) === "tele";
  const isRegistered = registrations.some((reg) => reg.eventId === event.id);

  const handleUnregister = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8080/api/registrations/me/${event.id}`,
        { method: "DELETE", credentials: "include" }
      );
      if (!res.ok) throw new Error("Hiba a kérelemben");
      window.location.reload();
    } catch (e) {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8080/api/registrations/${event.id}`,
        { method: "POST", credentials: "include" }
      );
      if (!res.ok) throw new Error("Hiba a kérelemben");
      window.location.reload();
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <article
      className="
        group cursor-pointer w-full flex items-center gap-6
        rounded-3xl bg-[var(--white)]
        border border-[var(--ruby-red)]/10
        shadow-sm hover:shadow-xl hover:-translate-y-1
        transition-all duration-300 p-5
      "
    >
      <div
        className="
          min-w-20 min-h-20 flex items-center justify-center
          rounded-2xl bg-gradient-to-br
          from-[var(--ruby-red)] to-[var(--burnt-peach)]
          text-[var(--white)] shadow-md
          group-hover:scale-105 transition-transform duration-300
        "
      >
        <Calendar size={32} strokeWidth={2.5} />
      </div>

      <div className="flex flex-col gap-2 flex-1">
        <h2
          className="
            text-lg font-semibold text-[var(--rich-mahogany)]
            group-hover:text-[var(--ruby-red)] transition-colors
          "
        >
          {event.title}
        </h2>

        <div className="flex items-center gap-3">
          {status === "lezarult" && (
            <span className="text-xs font-semibold px-2 py-1 rounded-xl border bg-gray-200 text-gray-600 border-gray-300">
              Lezárult
            </span>
          )}

          {status === "folyamatban" && (
            <span className="text-xs font-semibold px-2 py-1 rounded-xl bg-green-200 text-green-700 border border-green-300">
              Folyamatban
            </span>
          )}

          {isFull && (
            <span
              className="
                text-xs font-semibold px-2 py-1 rounded-xl
                bg-red-200 text-red-700 border border-red-300
              "
            >
              Telt ház
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--rich-mahogany)]/75">
          <span className="flex items-center gap-1">
            <Calendar size={16} className="text-[var(--ruby-red)]" />
            {event.endDate
              ? `${formatDate(event.startDate)} – ${formatDate(event.endDate)}`
              : formatDate(event.startDate)}
          </span>

          {event.location && (
            <span className="flex items-center gap-1">
              <MapPin size={16} className="text-[var(--burnt-peach)]" />
              {event.location}
            </span>
          )}

          <span className="flex items-center gap-1 font-semibold">
            <Users size={16} className="text-[var(--ruby-red)]/80" />
            <span
              className={
                isFull
                  ? "text-red-600"
                  : event.registered >= event.capacity * 0.75
                  ? "text-[var(--burnt-peach)]"
                  : "text-[var(--black-cherry)]/80"
              }
            >
              {event.registered} / {event.capacity} fő
            </span>
          </span>
        </div>

        {event.description && (
          <p className="text-sm text-[var(--rich-mahogany)]/60 line-clamp-2">
            {event.description}
          </p>
        )}
      </div>

      {isAuthenticated && (
        <div className="min-w-36 flex justify-end">
          {isRegistered ? (
            <button
              onClick={handleUnregister}
              disabled={loading}
              className="
                px-4 py-2 rounded-2xl text-sm font-semibold
                bg-[var(--ruby-red)]/10 text-[var(--black-cherry)]
                border border-[var(--burnt-peach)]/40
                hover:bg-[var(--ruby-red)] hover:text-[var(--white)]
                shadow-sm hover:shadow-md
                transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {loading ? "Folyamatban..." : "Jelentkezés visszavonása"}
            </button>
          ) : (
            <button
              onClick={handleRegister}
              disabled={loading || isFull || status !== "meg_kezdodik"}
              className="
                px-4 py-2 rounded-2xl text-sm font-semibold
                bg-[var(--ruby-red)]/20 text-[var(--black-cherry)]
                border border-[var(--burnt-peach)]/50
                hover:bg-[var(--ruby-red)] hover:text-[var(--white)]
                shadow-sm hover:shadow-md
                transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {loading
                ? "Folyamatban..."
                : isFull
                ? "Telt ház"
                : status !== "meg_kezdodik"
                ? "Nem elérhető"
                : "Jelentkezem"}
            </button>
          )}
        </div>
      )}
    </article>
  );
}

export default EventCard;
