import { useState } from "react";
import { Calendar } from "lucide-react";
import YearPicker from "./YearPicker";
import MonthPicker from "./MonthPicker";
import DayPicker from "./DayPicker";

function DatePicker({ label, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState("year");

  const selected = value ? new Date(value) : null;

  const [tempYear, setTempYear] = useState(selected ? selected.getFullYear() : null);
  const [tempMonth, setTempMonth] = useState(selected ? selected.getMonth() : null);

  const formatted = value ? selected.toLocaleDateString("hu-HU") : "";

  return (
    <div className="flex flex-col gap-1 relative">
      <label className="text-sm font-medium text-[var(--rich-mahogany)]/80">{label}</label>

      <div
        onClick={() => {
          setOpen(!open);
          setStage("year");
        }}
        className="
          flex items-center gap-2 rounded-xl border bg-white
          border-[var(--ruby-red)]/20 px-3 py-2 cursor-pointer
          hover:border-[var(--ruby-red)] transition-all
        "
      >
        <Calendar className="text-[var(--ruby-red)]/70" size={18} />
        <span className="text-[var(--rich-mahogany)]/70">
          {formatted || "Válassz születési dátumot"}
        </span>
      </div>

      {open && (
        <div
          className="
            absolute top-full left-0 mt-2 w-72
            rounded-2xl bg-white border border-[var(--ruby-red)]/20 shadow-md p-4
            animate-[fadeIn_0.15s_ease-out] z-30
          "
        >
          {stage === "year" && (
            <YearPicker
              tempYear={tempYear}
              setTempYear={setTempYear}
              setStage={setStage}
            />
          )}

          {stage === "month" && (
            <MonthPicker
              tempYear={tempYear}
              tempMonth={tempMonth}
              setTempMonth={setTempMonth}
              setStage={setStage}
            />
          )}

          {stage === "day" && (
            <DayPicker
              tempYear={tempYear}
              tempMonth={tempMonth}
              onSelectDay={(iso) => {
                onChange(iso);
                setOpen(false);
              }}
              goBack={() => setStage("month")}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default DatePicker;
