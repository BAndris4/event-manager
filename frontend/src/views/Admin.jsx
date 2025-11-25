import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import AdminEventList from "../components/admin/AdminEventList";
import CreateEventModal from "../components/admin/CreateEventModal";
import UpdateEventModal from "../components/admin/UpdateEventModal";
import DeleteEventModal from "../components/admin/DeleteEventModal";
import useAuthStatus from "../hooks/useAuthStatus";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(null);
  const [showDelete, setShowDelete] = useState(null);
  const { loading, isAuthenticated, role } = useAuthStatus();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!isAuthenticated || role !== "ROLE_ADMIN")) {
      navigate("/");
    }
  }, [loading, isAuthenticated, role, navigate]);

  return (
    <>
      {showCreate && <CreateEventModal onClose={() => setShowCreate(false)} />}

      {showUpdate && (
        <UpdateEventModal
          event={showUpdate}
          onClose={() => setShowUpdate(null)}
        />
      )}

      {showDelete && (
        <DeleteEventModal
          event={showDelete}
          onClose={() => setShowDelete(null)}
        />
      )}

      <Navbar />

      <div className="max-w-4xl mx-auto mt-10 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[var(--rich-mahogany)]">
            Admin Panel
          </h1>

          <button
            onClick={() => setShowCreate(true)}
            className="
              px-4 py-2 rounded-full bg-[var(--ruby-red)] text-white 
              font-semibold shadow-md transition 
              hover:scale-105 active:scale-95 
              hover:bg-[var(--ruby-red)]/90
            "
          >
            + Új esemény
          </button>
        </div>

        <AdminEventList
          onEdit={(ev) => setShowUpdate(ev)}
          onDelete={(ev) => setShowDelete(ev)}
        />
      </div>
    </>
  );
}
