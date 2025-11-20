function MonthPicker({ tempYear, tempMonth, setTempMonth, setStage }) {
  const months = [
    "Január", "Február", "Március", "Április", "Május", "Június",
    "Július", "Augusztus", "Szeptember", "Október", "November", "December",
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-center text-[var(--rich-mahogany)] font-medium">
        {tempYear} – válassz hónapot
      </h3>

      <div className="grid grid-cols-3 gap-2">
        {months.map((m, i) => (
          <button
            key={m}
            onClick={() => {
              setTempMonth(i);
              setStage("day");
            }}
            className={`
              py-2 rounded-xl text-sm transition-all border hover:bg-[var(--ruby-red)] hover:text-[var(--white)]
              ${
                tempMonth === i
                  ? "bg-[var(--ruby-red)] text-white border-[var(--ruby-red)]"
                  : "border-[var(--ruby-red)]/20 hover:bg-[var(--ruby-red)]/10"
              }
            `}
          >
            {m.slice(0, 3)}.
          </button>
        ))}
      </div>

      <button
        onClick={() => setStage("year")}
        className="text-[var(--ruby-red)] text-sm mt-1 hover:underline"
      >
        ← Vissza az évekhez
      </button>
    </div>
  );
}

export default MonthPicker;
