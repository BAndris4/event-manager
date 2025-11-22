import Navbar from "../components/Navbar";
import AdminEventList from "../components/admin/AdminEventList";

export default function Admin() {
  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 mt-6">
        <h1 className="text-2xl font-bold text-[var(--rich-mahogany)] mb-6">
          Admin Panel
        </h1>

        <AdminEventList />
      </div>
    </>
  );
}
