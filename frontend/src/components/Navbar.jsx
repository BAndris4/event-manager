import { useLocation, useNavigate } from "react-router-dom";
import useAuthStatus from "../hooks/useAuthStatus";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, loading, role } = useAuthStatus();

  const handleHomeClick = () => {
    if (location.pathname === "/") {
      window.location.reload();
    } else {
      navigate("/");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      navigate(0);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <header
      className="
        sticky top-0 z-20 
        bg-[var(--white)]/90 backdrop-blur-md
        border-b border-[var(--ruby-red)]/10 transition-all duration-300"
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <button
          onClick={handleHomeClick}
          className="flex items-center gap-3 group select-none"
        >
          <div
            className="
              w-9 h-9 rounded-2xl shadow-sm
              bg-gradient-to-br from-[var(--ruby-red)] to-[var(--burnt-peach)]
              flex items-center justify-center
              transition-all duration-300
              group-hover:scale-110
              group-hover:shadow-md
              group-hover:shadow-[var(--ruby-red)]/20
            "
          >
            <span className="text-xs font-black text-[var(--white)] tracking-[0.2em]">
              EM
            </span>
          </div>

          <span
            className="
              text-sm font-semibold text-[var(--rich-mahogany)] relative
              after:absolute after:left-0 after:-bottom-1 after:h-[2px]
              after:w-0 after:bg-[var(--ruby-red)]
              group-hover:after:w-full
              after:transition-all after:duration-300
            "
          >
            Event Manager
          </span>
        </button>

        <div className="flex items-center gap-2">
          {!loading && isAuthenticated === false && (
            <>
              <button
                className="
                  hidden sm:inline-flex text-xs sm:text-sm 
                  px-3 py-1.5 rounded-full 
                  border border-[var(--ruby-red)]/20 
                  text-[var(--rich-mahogany)]/80 
                  transition-all duration-300
                  hover:bg-[var(--ruby-red)]/10
                  hover:border-[var(--ruby-red)]/40
                  hover:scale-105
                  active:scale-95
                  hover:text-[var(--ruby-red)]
                "
                onClick={() => navigate("/login")}
              >
                Bejelentkezés
              </button>

              <button
                className="
                  text-xs sm:text-sm px-3.5 py-1.5 rounded-full 
                  bg-[var(--ruby-red)] text-[var(--white)] font-semibold 
                  shadow-sm transition-all duration-300
                  hover:bg-[var(--ruby-red)]/90
                  hover:scale-105
                  active:scale-95
                  hover:shadow-[0_0_10px_rgba(177,15,46,0.25)]
                "
                onClick={() => navigate("/register")}
              >
                Regisztráció
              </button>
            </>
          )}

          {!loading && isAuthenticated === true && (
            <>
              {role === "ROLE_ADMIN" && (
                <button
                  onClick={() => navigate("/admin")}
                  className="
                    hidden sm:inline-flex px-3 py-1.5 rounded-full text-sm font-medium
                    text-[var(--rich-mahogany)]
                    transition-all duration-300
                    border border-[var(--ruby-red)]/10
                    hover:border-[var(--ruby-red)]/20
                    hover:bg-[var(--ruby-red)] hover:text-white hover:scale-105 active:scale-95
                  "
                >
                  Admin
                </button>
              )}

              <button
                onClick={() => navigate("/my-registrations")}
                className="
                  hidden sm:inline-flex px-3 py-1.5 rounded-full text-sm font-medium
                  text-[var(--rich-mahogany)]
                  transition-all duration-300
                  border border-[var(--ruby-red)]/10
                  hover:border-[var(--ruby-red)]/20
                  hover:bg-[var(--ruby-red)] hover:text-white hover:scale-105 active:scale-95
                "
              >
                Jelentkezéseim
              </button>

              <button
                onClick={handleLogout}
                className="
                  text-xs sm:text-sm px-3.5 py-1.5 rounded-full
                  bg-[var(--ruby-red)]/10 text-[var(--ruby-red)] font-semibold 
                  border border-[var(--ruby-red)]/30
                  transition-all duration-200
                  hover:bg-[var(--ruby-red)] hover:text-white
                  hover:scale-105 active:scale-95
                "
              >
                Kijelentkezés
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
