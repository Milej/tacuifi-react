import { forwardRef } from "react";

const FieldInput = forwardRef(function FieldInput(
  {
    label,
    error,
    hint,
    className = "",
    inputClassName = "",
    ...props
  },
  ref
) {
  return (
    <label className={`block ${className}`}>
      {label ? <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">{label}</span> : null}
      <input
        ref={ref}
        {...props}
        className={[
          "w-full rounded-2xl border bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition",
          "focus:border-emerald-800/30 focus:ring-2 focus:ring-emerald-900/10",
          error ? "border-rose-300" : "border-zinc-200",
          inputClassName,
        ].join(" ")}
      />
      {error ? <span className="mt-1.5 block text-xs text-rose-600">{error}</span> : null}
      {!error && hint ? <span className="mt-1.5 block text-xs text-zinc-500">{hint}</span> : null}
    </label>
  );
});

export default FieldInput;
