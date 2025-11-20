import { Calendar, MapPin, Users } from "lucide-react";

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

function EventCard({ event }) {
  return (
    <article
      className="
        group
        cursor-pointer
        w-full
        flex items-center
        gap-6
        rounded-3xl
        bg-[var(--white)]
        border border-[var(--ruby-red)]/10
        shadow-sm
        hover:shadow-xl
        hover:-translate-y-1
        transition-all duration-300
        p-5
      "
    >
      {/* Bal oldali színes ikonbox */}
      <div
        className="
          min-w-20 min-h-20
          flex items-center justify-center
          rounded-2xl
          bg-gradient-to-br from-[var(--ruby-red)] to-[var(--burnt-peach)]
          text-[var(--white)] shadow-md
          group-hover:scale-105 transition-transform duration-300
        "
      >
        <Calendar size={32} strokeWidth={2.5} />
      </div>

      {/* Középső tartalom */}
      <div className="flex flex-col gap-2 flex-1">
        {/* Cím */}
        <h2
          className="
            text-lg font-semibold text-[var(--rich-mahogany)]
            group-hover:text-[var(--ruby-red)] transition-colors
          "
        >
          {event.title}
        </h2>

        {/* Dátum + Helyszín sor ikonnal */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--rich-mahogany)]/75">
          <span className="flex items-center gap-1">
            <Calendar size={16} className="text-[var(--ruby-red)]" />
            {formatDate(event.startDate)}
          </span>

          {event.location && (
            <span className="flex items-center gap-1">
              <MapPin size={16} className="text-[var(--burnt-peach)]" />
              {event.location}
            </span>
          )}

          <span className="flex items-center gap-1">
            <Users size={16} className="text-[var(--ruby-red)]/80" />
            {event.capacity ?? "n/a"} fő
          </span>
        </div>

        {/* Rövid leírás */}
        {event.description && (
          <p className="text-sm text-[var(--rich-mahogany)]/60 line-clamp-2">
            {event.description}
          </p>
        )}
      </div>
    </article>
  );
}

export default EventCard;