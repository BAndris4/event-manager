import { useState } from "react";
import AdminEventRegistrations from "./AdminEventRegistrations";
import UpdateEventModal from "./UpdateEventModal";
import DeleteEventModal from "./DeleteEventModal";

export default function AdminEventItem({ event }) {
  const [open, setOpen] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  return (
    <>
      {showEdit && (
        <UpdateEventModal event={event} onClose={() => setShowEdit(false)} />
      )}

      {showDelete && (
        <DeleteEventModal event={event} onClose={() => setShowDelete(false)} />
      )}

      <div className="border border-[var(--ruby-red)]/20 bg-white rounded-xl shadow-sm overflow-hidden">
        <button
          onClick={() => setOpen(!open)}
          className="
            w-full flex justify-between items-center px-4 py-4 text-left 
            text-[var(--rich-mahogany)] font-semibold
            hover:bg-[var(--ruby-red)]/10 transition-all
          "
        >
          <span className="text-lg">{event.title}</span>

          <span className="text-[var(--ruby-red)] font-bold text-xl">
            {open ? "▲" : "▼"}
          </span>
        </button>

        {open && (
          <div className="px-5 py-4 border-t border-[var(--ruby-red)]/20 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-[var(--rich-mahogany)]/60">Leírás</p>
                <p className="text-[var(--rich-mahogany)] font-medium">
                  {event.description || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs text-[var(--rich-mahogany)]/60">
                  Helyszín
                </p>
                <p className="text-[var(--rich-mahogany)] font-medium">
                  {event.location}
                </p>
              </div>

              <div>
                <p className="text-xs text-[var(--rich-mahogany)]/60">
                  Kapacitás
                </p>
                <p className="text-[var(--rich-mahogany)] font-medium">
                  {event.capacity} fő
                </p>
              </div>

              <div>
                <p className="text-xs text-[var(--rich-mahogany)]/60">
                  Regisztráltak
                </p>
                <p className="text-[var(--rich-mahogany)] font-medium">
                  {event.registered} fő
                </p>
              </div>

              <div>
                <p className="text-xs text-[var(--rich-mahogany)]/60">Kezdés</p>
                <p className="text-[var(--rich-mahogany)] font-medium">
                  {new Date(event.startDate).toLocaleString("hu-HU")}
                </p>
              </div>

              <div>
                <p className="text-xs text-[var(--rich-mahogany)]/60">
                  Befejezés
                </p>
                <p className="text-[var(--rich-mahogany)] font-medium">
                  {event.endDate
                    ? new Date(event.endDate).toLocaleString("hu-HU")
                    : "-"}
                </p>
              </div>

              <div>
                <p className="text-xs text-[var(--rich-mahogany)]/60">
                  Létrehozva
                </p>
                <p className="text-[var(--rich-mahogany)] font-medium">
                  {event.createdAt
                    ? new Date(event.createdAt).toLocaleString("hu-HU")
                    : "-"}
                </p>
              </div>

              <div>
                <p className="text-xs text-[var(--rich-mahogany)]/60">
                  Módosítva
                </p>
                <p className="text-[var(--rich-mahogany)] font-medium">
                  {event.updatedAt
                    ? new Date(event.updatedAt).toLocaleString("hu-HU")
                    : "-"}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowEdit(true)}
                className="
                  px-4 py-2 rounded-lg text-sm font-medium
                  bg-[var(--ruby-red)] text-white
                  hover:bg-[var(--ruby-red)]/90 hover:scale-105 active:scale-95
                  transition
                "
              >
                Szerkesztés
              </button>

              <button
                onClick={() => setShowDelete(true)}
                className="
                  px-4 py-2 rounded-lg text-sm font-medium
                  bg-red-500/10 text-red-700 border border-red-300
                  hover:bg-red-500/20 hover:scale-105 active:scale-95
                  transition
                "
              >
                Törlés
              </button>
            </div>

            <div className="pt-4 border-t border-[var(--ruby-red)]/20">
              <h3 className="text-[var(--rich-mahogany)] font-bold mb-2">
                Jelentkezők
              </h3>

              <AdminEventRegistrations eventId={event.id} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
