// src/components/Navbar.jsx
import { useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeClick = () => {
    if (location.pathname === "/") {
      window.location.reload();
    } else {
      navigate("/");
    }
  };

  return (
    <header className="
      sticky top-0 z-20 
      bg-[var(--white)]/90 backdrop-blur-md
      border-b border-[var(--ruby-red)]/10
      transition-all duration-300
    ">
      <nav className="
        max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 
        h-16 flex items-center justify-between
      ">
        
        {/* Logo + Title */}
        <button 
          onClick={handleHomeClick}
          className="
            flex items-center gap-3 group
            select-none
          "
        >
          <div className="
            w-9 h-9 rounded-2xl shadow-sm
            bg-gradient-to-br from-[var(--ruby-red)] to-[var(--burnt-peach)]
            flex items-center justify-center
            transition-all duration-300
            group-hover:scale-110
            group-hover:shadow-md
            group-hover:shadow-[var(--ruby-red)]/20
          ">
            <span className="text-xs font-black text-[var(--white)] tracking-[0.2em]">
              EM
            </span>
          </div>

          {/* Title */}
          <span className="
            text-sm font-semibold text-[var(--rich-mahogany)] 
            relative
            after:absolute after:left-0 after:-bottom-1 after:h-[2px]
            after:w-0 after:bg-[var(--ruby-red)]
            group-hover:after:w-full
            after:transition-all after:duration-300
          ">
            Event Manager
          </span>
        </button>

        {/* Auth buttons */}
        <div className="flex items-center gap-2">
          <button className="
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
          ">
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
            >
            Regisztráció
            </button>

        </div>
      </nav>
    </header>
  );
}

export default Navbar;
