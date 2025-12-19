// ContactTextarea.jsx
export default function ContactTextarea({
  label,
  placeholder,
  error,
  rows = 4,
  value,
  onChange,
  name,
  onBlur,
  inputRef,
}) {
  return (
    <div>
      <label className="block text-xs text-zinc-600 mb-1">{label}</label>

      <textarea
        rows={rows}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        ref={inputRef}
        className={[
          "w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none whitespace-pre-wrap",
          "focus:ring-2 focus:ring-zinc-900/10",
          error ? "border-red-300" : "border-zinc-200",
        ].join(" ")}
      />

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
