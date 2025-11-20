function DayPicker({ tempYear, tempMonth, onSelectDay, goBack }) {
  const today = new Date();
  const daysInMonth = new Date(tempYear, tempMonth + 1, 0).getDate();

  const months = [
    "Január", "Február", "Március", "Április", "Május", "Június",
    "Július", "Augusztus", "Szeptember", "Október", "November", "December",
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-center text-[var(--rich-mahogany)] font-medium">
        {tempYear}. {months[tempMonth]}
      </h3>

      <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-[var(--rich-mahogany)]/70 mb-1">
        <span>H</span><span>K</span><span>Sze</span>
        <span>Cs</span><span>P</span><span>Szo</span><span>V</span>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;

          const iso = `${tempYear}-${String(tempMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

          const isToday =
            new Date().toISOString().slice(0, 10) === iso;

          return (
            <button
              key={day}
              onClick={() => onSelectDay(iso)}
              className={`
                py-1 rounded-lg text-sm transition-all hover:bg-[var(--ruby-red)] hover:text-[var(--white)]
                ${
                  isToday
                    ? "bg-[var(--ruby-red)]/20"
                    : "hover:bg-[var(--ruby-red)]/10"
                }
              `}
            >
              {day}
            </button>
          );
        })}
      </div>

      <button
        onClick={goBack}
        className="text-[var(--ruby-red)] text-sm mt-2 hover:underline"
      >
        ← Vissza a hónapválasztáshoz
      </button>
    </div>
  );
}

export default DayPicker;
