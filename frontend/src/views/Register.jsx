import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import InputField from "../components/form/InputField";
import GenderSelect from "../components/form/GenderSelect";
import DatePicker from "../components/form/DatePicker/DatePicker";

import { Mail, Lock, User, Phone, ChevronRight } from "lucide-react";

function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const validateForm = () => {
    const newErrors = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!form.gender.trim()) newErrors.gender = "Gender is required.";
    if (!form.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required.";

    if (!form.birthDate) {
      newErrors.birthDate = "Birth date is required.";
    } else {
      const selected = new Date(form.birthDate);
      if (selected >= new Date()) {
        newErrors.birthDate = "Birth date must be in the past.";
      }
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        newErrors.email = "Email must be valid.";
      }
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  };

  const handleDateChange = (date) => {
    setForm({ ...form, birthDate: date });
    setErrors({ ...errors, birthDate: null });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const backendMessage = await res.text();
        throw new Error(backendMessage || "Failed to register.");
      }

      const loginRes = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      if (!loginRes.ok) {
        throw new Error("Auto-login failed after registration.");
      }

      setSuccess("Sikeres regisztráció, bejelentkezés!");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setError("Hiba történt regisztráció közben.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--white)] text-[var(--rich-mahogany)]">
      <Navbar />

      <main className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 opacity-0 translate-y-3 animate-[fadeIn_0.6s_ease-out_forwards]">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
          Regisztráció<span className="text-[var(--ruby-red)]">.</span>
        </h1>

        <div className="rounded-3xl bg-white border border-[var(--ruby-red-transparent)] shadow-sm p-6 space-y-6 hover:shadow-md transition-all duration-300">
          <form onSubmit={handleRegister} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <InputField
                  icon={<User size={18} />}
                  label="Vezetéknév"
                  placeholder="Szabó"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>

              <div>
                <InputField
                  icon={<User size={18} />}
                  label="Keresztnév"
                  placeholder="Máté"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>
            </div>

            <div>
              <DatePicker
                label="Születési dátum"
                value={form.birthDate}
                onChange={handleDateChange}
              />
              {errors.birthDate && (
                <p className="text-red-600 text-sm mt-1">{errors.birthDate}</p>
              )}
            </div>

            <div>
              <GenderSelect value={form.gender} onChange={handleChange} />
              {errors.gender && (
                <p className="text-red-600 text-sm mt-1">{errors.gender}</p>
              )}
            </div>

            <div>
              <InputField
                icon={<Mail size={18} />}
                label="Email"
                placeholder="szabo.mate@inf.unideb.hu"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <InputField
                icon={<Phone size={18} />}
                label="Telefonszám"
                placeholder="+36 52 512 900"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
              />
              {errors.phoneNumber && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            <div>
              <InputField
                icon={<Lock size={18} />}
                label="Jelszó"
                placeholder="••••••••"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="
                w-full py-3 rounded-xl text-white font-semibold
                bg-gradient-to-br from-[var(--ruby-red)] to-[var(--burnt-peach)]
                shadow-sm hover:shadow-md
                hover:-translate-y-[2px] transition-all duration-300
                flex items-center justify-center gap-2
              "
            >
              {loading ? (
                <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Regisztráció <ChevronRight size={18} />
                </>
              )}
            </button>
          </form>

          {success && (
            <div className="rounded-xl bg-green-50 border border-green-300 text-green-700 px-4 py-3 text-sm">
              {success}
            </div>
          )}

          {error && (
            <div className="rounded-xl bg-red-50 border border-red-300 text-red-700 px-4 py-3 text-sm">
              {error}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Register;
