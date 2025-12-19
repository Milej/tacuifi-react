export default function GuestsPicker({ value, onChange, error }) {
  const adultos = Number(value?.adultos ?? 1);
  const menores = Number(value?.menores ?? 0);

  const set = (a, m) => onChange({ adultos: a, menores: m });

  return (
    <div>
      <label className="block text-xs text-zinc-600 mb-1">Personas</label>

      <div className="grid md:grid-cols-2 gap-3">
        <Counter label="Adultos" value={adultos} min={1} onChange={(v) => set(v, menores)} />
        <Counter label="Menores" value={menores} min={0} onChange={(v) => set(adultos, v)} />
      </div>

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function Counter({ label, value, min, onChange }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 flex items-center justify-between">
      <div>
        <p className="text-xs text-zinc-500">{label}</p>
        <p className="text-sm font-semibold text-zinc-900">{value}</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="h-9 w-9 rounded-full border border-zinc-200 hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
          aria-label={`Restar ${label}`}
        >
          −
        </button>

        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="h-9 w-9 rounded-full border border-zinc-200 hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
          aria-label={`Sumar ${label}`}
        >
          +
        </button>
      </div>
    </div>
  );
}
