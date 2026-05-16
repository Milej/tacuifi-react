function normalizeUnitLabel(input) {
  return String(input || "").trim();
}

export default function UnitSelect({ value, onChange, error, options = [] }) {
  const normalizedValue = normalizeUnitLabel(value);
  const isValid = options.includes(normalizedValue);
  const selectValue = isValid ? normalizedValue : "";

  return (
    <div>
      <label className="mb-1 block text-xs text-zinc-600">Unidad</label>

      <select
        value={selectValue}
        onChange={(event) => onChange(event.target.value)}
        className={[
          "w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none",
          "focus:ring-2 focus:ring-zinc-900/10",
          error ? "border-red-300" : "border-zinc-200",
        ].join(" ")}
      >
        <option value="" disabled>
          Elegi una unidad
        </option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
