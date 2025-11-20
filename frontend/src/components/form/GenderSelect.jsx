import { useState } from "react";
import { ChevronDown } from "lucide-react";

function GenderSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);

  const options = ["Férfi", "Nő", "Egyéb", "Nem szeretném megadni"];

  return (
    <div className="flex flex-col gap-1 relative">
      <label className="text-sm font-medium text-[var(--rich-mahogany)]/80">
        Nem
      </label>

      <div
        onClick={() => setOpen(!open)}
        className="
          flex items-center justify-between
          rounded-xl border bg-white
          border-[var(--ruby-red)]/20 px-3 py-2 cursor-pointer
          hover:border-[var(--ruby-red)] transition-all
        "
      >
        <span
          className={
            value
              ? "text-[var(--rich-mahogany)]"
              : "text-[var(--rich-mahogany)]/40"
          }
        >
          {value || "Válassz..."}
        </span>

        <ChevronDown
          size={18}
          className={`text-[var(--ruby-red)]/70 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      {open && (
        <div
          className="
            absolute top-full left-0 w-full mt-2
            rounded-2xl bg-white border border-[var(--ruby-red)]/20 shadow-md
            py-2 z-30 animate-[fadeIn_0.15s_ease-out]
          "
        >
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                onChange({ target: { name: "gender", value: opt } });
                setOpen(false);
              }}
              className={`
                px-4 py-2 cursor-pointer transition-all
                ${
                  value === opt
                    ? "bg-[var(--ruby-red)]/10 font-semibold text-[var(--rich-mahogany)]"
                    : "hover:bg-[var(--ruby-red)]/10 text-[var(--rich-mahogany)]/80"
                }
              `}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GenderSelect;
