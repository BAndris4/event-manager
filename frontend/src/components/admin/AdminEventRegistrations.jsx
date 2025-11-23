import { useEffect, useState } from "react";
import { Trash2, MoveRight } from "lucide-react";
import RegistrationDeleteModal from "./RegistrationDeleteModal";
import MoveRegistrationModal from "./MoveRegistrationModal";

export default function AdminEventRegistrations({ eventId }) {
  const [registrations, setRegistrations] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const [selectedMoveRegistration, setSelectedMoveRegistration] =
    useState(null);
  const [selectedMoveUser, setSelectedMoveUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/registrations/event/${eventId}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setRegistrations(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [eventId]);

  useEffect(() => {
    const loadUsers = async () => {
      const userIds = [...new Set(registrations.map((r) => r.userId))];

      if (userIds.length === 0) {
        setUsers([]);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:8080/api/user/batch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(userIds),
        });

        const data = await res.json();
        setUsers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Batch user fetch failed:", err);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    if (registrations.length > 0) loadUsers();
  }, [registrations]);

  if (loading)
    return <p className="text-[var(--rich-mahogany)]/70">Betöltés...</p>;

  if (registrations.length === 0)
    return (
      <p className="text-[var(--rich-mahogany)]/60">
        Nincs jelentkezés erre az eseményre.
      </p>
    );

  const userMap = new Map(users.map((u) => [u.id, u]));

  return (
    <>
      {selectedRegistration && selectedUser && (
        <RegistrationDeleteModal
          registration={selectedRegistration}
          user={selectedUser}
          onClose={() => {
            setSelectedRegistration(null);
            setSelectedUser(null);
          }}
          onDeleted={(userId) =>
            setRegistrations((prev) => prev.filter((r) => r.userId !== userId))
          }
        />
      )}

      {selectedMoveRegistration && selectedMoveUser && (
        <MoveRegistrationModal
          registration={selectedMoveRegistration}
          user={selectedMoveUser}
          currentEventId={eventId}
          onClose={() => {
            setSelectedMoveRegistration(null);
            setSelectedMoveUser(null);
          }}
          onMoved={(registrationId) =>
            setRegistrations((prev) =>
              prev.filter((r) => r.id !== registrationId)
            )
          }
        />
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[var(--ruby-red)]/10 text-[var(--rich-mahogany)] border-b border-[var(--ruby-red)]/20">
              <th className="px-4 py-2 text-left font-semibold">Név</th>
              <th className="px-4 py-2 text-left font-semibold">Email</th>
              <th className="px-4 py-2 text-left font-semibold">Telefonszám</th>
              <th className="px-4 py-2 text-left font-semibold">
                Születési dátum
              </th>
              <th className="px-4 py-2 text-left font-semibold">Nem</th>
              <th className="px-4 py-2 text-center font-semibold">
                Áthelyezés
              </th>
              <th className="px-4 py-2 text-center font-semibold">Törlés</th>
            </tr>
          </thead>

          <tbody>
            {registrations.map((reg) => {
              const user = userMap.get(reg.userId);

              if (!user) {
                return (
                  <tr
                    key={reg.id}
                    className="border-b border-[var(--ruby-red)]/10 bg-yellow-50"
                  >
                    <td className="px-4 py-2" colSpan={7}>
                      <span className="text-[var(--rich-mahogany)]/70">
                        Ismeretlen felhasználó (ID: {reg.userId})
                      </span>
                    </td>
                  </tr>
                );
              }

              return (
                <tr
                  key={reg.id}
                  className="border-b border-[var(--ruby-red)]/10 hover:bg-[var(--ruby-red)]/5 transition"
                >
                  <td className="px-4 py-2">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.phoneNumber || "-"}</td>
                  <td className="px-4 py-2">{user.birthDate || "-"}</td>
                  <td className="px-4 py-2">{user.gender || "-"}</td>

                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => {
                        setSelectedMoveRegistration(reg);
                        setSelectedMoveUser(user);
                      }}
                      className="
                        p-2 rounded-lg 
                        bg-emerald-500/10 text-emerald-700 border border-emerald-300
                        hover:bg-emerald-500/20 hover:scale-105 active:scale-95
                        transition
                      "
                    >
                      <MoveRight size={16} />
                    </button>
                  </td>

                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => {
                        setSelectedRegistration(reg);
                        setSelectedUser(user);
                      }}
                      className="
                        p-2 rounded-lg 
                        bg-red-500/10 text-red-700 border border-red-300
                        hover:bg-red-500/20 hover:scale-105 active:scale-95
                        transition
                      "
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
