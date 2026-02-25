export default function GuestsPicker({ value, onChange, error }) {
  const adultos = Number(value?.adultos ?? 1);
  const menores = Number(value?.menores ?? 0);

  const set = (a, m) => onChange({ adultos: a, menores: m });

  const fieldBase = [
    "w-full rounded-2xl border bg-white px-4 h-[48px] text-sm",
    "flex items-center justify-between",
    "focus-within:ring-2 focus-within:ring-zinc-900/10",
    error ? "border-red-300" : "border-zinc-200",
  ].join(" ");

  const btnBase =
    "h-7 w-7 rounded-full border border-zinc-200 hover:bg-zinc-50 focus:outline-none";

  return (
    <div className="h-full">
      <div className="grid grid-cols-2 gap-3">
        {/* Adultos */}
        <div>
          <p className="text-[11px] text-zinc-500 mb-1">Adultos</p>

          <div className={fieldBase}>
            <span className="font-semibold text-zinc-900">{adultos}</span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => set(Math.max(1, adultos - 1), menores)}
                className={btnBase}
              >
                −
              </button>

              <button
                type="button"
                onClick={() => set(adultos + 1, menores)}
                className={btnBase}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Menores */}
        <div>
          <p className="text-[11px] text-zinc-500 mb-1">Menores</p>

          <div className={fieldBase}>
            <span className="font-semibold text-zinc-900">{menores}</span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => set(adultos, Math.max(0, menores - 1))}
                className={btnBase}
              >
                −
              </button>

              <button
                type="button"
                onClick={() => set(adultos, menores + 1)}
                className={btnBase}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}