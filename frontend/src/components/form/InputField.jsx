import React from "react";

function InputField({ icon, label, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-[var(--rich-mahogany)]/80">
        {label}
      </label>
      <div
        className="
          flex items-center gap-2 rounded-xl border bg-white
          border-[var(--ruby-red)]/20 px-3 py-2
          focus-within:border-[var(--ruby-red)]
          transition-all
        "
      >
        <div className="text-[var(--ruby-red)]/70">{icon}</div>
        <input
          {...props}
          className="
            w-full outline-none bg-transparent
            placeholder:text-[var(--rich-mahogany)]/40
          "
        />
      </div>
    </div>
  );
}

export default InputField;
