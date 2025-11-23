import { Calendar, Users } from "lucide-react";

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

export default function EventSummaryRow({ event, status }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-3">
        <span className="text-lg font-semibold">{event.title}</span>

        {status === "lezarult" && (
          <span className="text-xs font-semibold px-2 py-1 rounded-xl bg-gray-200 text-gray-600 border border-gray-300">
            Lezárult
          </span>
        )}

        {status === "folyamatban" && (
          <span className="text-xs font-semibold px-2 py-1 rounded-xl bg-green-200 text-green-700 border border-green-300">
            Folyamatban
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-3 text-xs text-[var(--rich-mahogany)]/70">
        <span className="flex items-center gap-1">
          <Calendar size={14} className="text-[var(--ruby-red)]" />
          {event.endDate
            ? `${formatDate(event.startDate)} – ${formatDate(event.endDate)}`
            : formatDate(event.startDate)}
        </span>

        <span className="flex items-center gap-1">
          <Users size={14} className="text-[var(--ruby-red)]/80" />
          {event.registered} / {event.capacity} fő
        </span>
      </div>
    </div>
  );
}
