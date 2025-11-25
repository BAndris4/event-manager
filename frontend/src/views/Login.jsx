import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import InputField from "../components/form/InputField";

import { Mail, Lock, ChevronRight } from "lucide-react";
import useAuthStatus from "../hooks/useAuthStatus";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { isAuthenticated } = useAuthStatus();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const validateForm = () => {
    const newErrors = {};

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
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const loginRes = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!loginRes.ok) {
        const backendMsg = await loginRes.text();
        throw new Error(backendMsg || "Login failed.");
      }

      setSuccess("Sikeres bejelentkezés ✔");

      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (err) {
      setError("Hibás email vagy jelszó.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--white)] text-[var(--rich-mahogany)]">
      <Navbar />

      <main className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 opacity-0 translate-y-3 animate-[fadeIn_0.6s_ease-out_forwards]">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
          Bejelentkezés<span className="text-[var(--ruby-red)]">.</span>
        </h1>

        <div className="rounded-3xl bg-white border border-[var(--ruby-red-transparent)] shadow-sm p-6 space-y-6 hover:shadow-md transition-all duration-300">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <InputField
                icon={<Mail size={18} />}
                label="Email"
                name="email"
                type="email"
                placeholder="szabo.mate@inf.unideb.hu"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <InputField
                icon={<Lock size={18} />}
                label="Jelszó"
                name="password"
                type="password"
                placeholder="••••••••"
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
                  Bejelentkezés <ChevronRight size={18} />
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

export default Login;
