import { useEffect, useState, useCallback } from "react";

export default function useAuthStatus() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); 
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkAuth = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:8080/api/registrations/my", {
        method: "GET",
        credentials: "include",
      });

      if (res.status === 401 || res.status === 403) {
        setIsAuthenticated(false);
        setRegistrations([]);
        return;
      }

      if (!res.ok) {
        throw new Error("Unexpected error");
      }

      const data = await res.json();

      setIsAuthenticated(true);
      setRegistrations(data);
    } catch (err) {
      setError(err.message);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    isAuthenticated,
    registrations,
    loading,
    error,
    refresh: checkAuth
  };
}
