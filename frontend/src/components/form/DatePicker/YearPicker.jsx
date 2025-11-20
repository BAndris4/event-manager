function YearPicker({ tempYear, setTempYear, setStage }) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);

  return (
    <div className="space-y-3">
      <h3 className="text-center text-[var(--rich-mahogany)] font-medium">
        Válassz születési évet
      </h3>

      <div className="max-h-64 overflow-y-auto pr-1 rounded-xl">
        <div className="grid grid-cols-4 gap-2">
          {years.map((y) => (
            <button
              key={y}
              onClick={() => {
                setTempYear(y);
                setStage("month");
              }}
              className={`
                py-2 rounded-xl text-sm transition-all border hover:bg-[var(--ruby-red)] hover:text-[var(--white)]
                ${
                  tempYear === y
                    ? "bg-[var(--ruby-red)] text-white border-[var(--ruby-red)]"
                    : "border-[var(--ruby-red)]/20 hover:bg-[var(--ruby-red)]/10"
                }
              `}
            >
              {y}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default YearPicker;
