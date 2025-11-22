// src/components/admin/AdminEventRegistrations.jsx
import { useEffect, useState } from "react";

export default function AdminEventRegistrations({ eventId }) {
  const [registrations, setRegistrations] = useState([]);
  const [users, setUsers] = useState(new Map());
  const [loading, setLoading] = useState(true);

  // Jelentkezések betöltése
  useEffect(() => {
    fetch(`http://localhost:8080/api/registrations/event/${eventId}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setRegistrations(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [eventId]);

  // User adatok betöltése cache-selve
  useEffect(() => {
    const loadUsers = async () => {
      const uniqueUserIds = [...new Set(registrations.map((r) => r.userId))];
      const newUserMap = new Map(users);

      for (const id of uniqueUserIds) {
        if (!newUserMap.has(id)) {
          try {
            const res = await fetch(`http://localhost:8080/api/user/${id}`, {
              credentials: "include",
            });
            const data = await res.json();
            newUserMap.set(id, data);
          } catch (err) {
            console.error(err);
          }
        }
      }

      setUsers(newUserMap);
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

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm border-collapse">
        {/* FEJLÉC */}
        <thead>
          <tr className="bg-[var(--ruby-red)]/10 text-[var(--rich-mahogany)] border-b border-[var(--ruby-red)]/20">
            <th className="px-4 py-2 text-left font-semibold">Név</th>
            <th className="px-4 py-2 text-left font-semibold">Email</th>
            <th className="px-4 py-2 text-left font-semibold">Telefonszám</th>
            <th className="px-4 py-2 text-left font-semibold">
              Születési dátum
            </th>
            <th className="px-4 py-2 text-left font-semibold">Nem</th>
          </tr>
        </thead>

        {/* ADATOK */}
        <tbody>
          {registrations.map((reg) => {
            const user = users.get(reg.userId);

            if (!user)
              return (
                <tr key={reg.id}>
                  <td className="px-4 py-2" colSpan={5}>
                    Betöltés...
                  </td>
                </tr>
              );

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
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
