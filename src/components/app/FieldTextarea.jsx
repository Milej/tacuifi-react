import { forwardRef } from "react";

const FieldTextarea = forwardRef(function FieldTextarea({ label, error, className = "", ...props }, ref) {
  return (
    <label className={`block ${className}`}>
      {label ? <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">{label}</span> : null}
      <textarea
        ref={ref}
        {...props}
        className={[
          "w-full rounded-2xl border bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition",
          "focus:border-emerald-800/30 focus:ring-2 focus:ring-emerald-900/10",
          error ? "border-rose-300" : "border-zinc-200",
        ].join(" ")}
      />
      {error ? <span className="mt-1.5 block text-xs text-rose-600">{error}</span> : null}
    </label>
  );
});

export default FieldTextarea;
