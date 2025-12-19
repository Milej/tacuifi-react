// ContactField.jsx
export default function ContactField({ label, placeholder, error, register, type = "text" }) {
  return (
    <div>
      <label className="block text-xs text-zinc-600 mb-1">{label}</label>

      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className={[
          "w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none",
          "focus:ring-2 focus:ring-zinc-900/10",
          error ? "border-red-300" : "border-zinc-200",
        ].join(" ")}
      />

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
