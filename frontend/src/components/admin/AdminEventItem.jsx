// src/components/admin/AdminEventItem.jsx
import { useState } from "react";
import AdminEventRegistrations from "./AdminEventRegistrations";
import { Calendar, MapPin, Users, ChevronDown, ChevronUp } from "lucide-react";

function formatDate(dateString) {
  if (!dateString) return "-";
  const d = new Date(dateString);
  return d.toLocaleString("hu-HU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminEventItem({ event }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-[var(--ruby-red)]/20 bg-white shadow-sm hover:shadow-md transition-all overflow-hidden">
      {/* FEJLÉC */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        {/* bal oldal */}
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-[var(--rich-mahogany)]">
            {event.title}
          </span>

          <div className="flex items-center gap-4 mt-1 text-sm text-[var(--rich-mahogany)]/70">
            {/* dátum */}
            <div className="flex items-center gap-1">
              <Calendar size={16} className="text-[var(--ruby-red)]" />
              <span>{formatDate(event.startDate)}</span>
            </div>

            {/* kapacitás */}
            <div className="flex items-center gap-1">
              <Users size={16} className="text-[var(--ruby-red)]" />
              <span>
                {event.registered} / {event.capacity}
              </span>
            </div>
          </div>
        </div>

        {/* jobb oldal – ikon */}
        <div className="text-[var(--ruby-red)]">
          {open ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </div>
      </button>

      {/* LENYITHATÓ RÉSZ */}
      {open && (
        <div className="px-5 pb-5 pt-2 border-t border-[var(--ruby-red)]/10 bg-[var(--ruby-red)]/5">
          {/* RÉSZLETES ADATOK */}
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-[var(--rich-mahogany)]">
            <div>
              <p className="font-semibold text-[var(--rich-mahogany)]">
                Helyszín
              </p>
              <p className="text-[var(--rich-mahogany)]/70">{event.location}</p>
            </div>

            <div>
              <p className="font-semibold text-[var(--rich-mahogany)]">
                Kezdés
              </p>
              <p className="text-[var(--rich-mahogany)]/70">
                {formatDate(event.startDate)}
              </p>
            </div>

            {event.endDate && (
              <div>
                <p className="font-semibold text-[var(--rich-mahogany)]">
                  Vége
                </p>
                <p className="text-[var(--rich-mahogany)]/70">
                  {formatDate(event.endDate)}
                </p>
              </div>
            )}

            <div>
              <p className="font-semibold text-[var(--rich-mahogany)]">
                Létrehozva
              </p>
              <p className="text-[var(--rich-mahogany)]/70">
                {formatDate(event.createdAt)}
              </p>
            </div>

            <div>
              <p className="font-semibold text-[var(--rich-mahogany)]">
                Módosítva
              </p>
              <p className="text-[var(--rich-mahogany)]/70">
                {formatDate(event.updatedAt)}
              </p>
            </div>
          </div>

          <h3 className="font-semibold text-[var(--rich-mahogany)] mb-2">
            Jelentkezések
          </h3>

          <AdminEventRegistrations eventId={event.id} />
        </div>
      )}
    </div>
  );
}
