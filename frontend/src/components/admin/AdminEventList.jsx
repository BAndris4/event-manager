import { useEffect, useState } from "react";
import AdminEventItem from "./AdminEventItem";

export default function AdminEventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/events", { credentials: "include" })
      .then((res) => {
        console.log("STATUS:", res.status);
        return res.json();
      })
      .then((data) => {
        console.log("DATA:", data);
        setEvents(data);
      })
      .catch((err) => console.error("FETCH ERROR:", err));
  }, []);

  return (
    <div className="space-y-3">
      {events.map((event) => (
        <AdminEventItem key={event.id} event={event} />
      ))}
    </div>
  );
}
