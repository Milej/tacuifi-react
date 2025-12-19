import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function UnidadDropdownMobile({
  label = "Unidades",
  items = [],
  onNavigate,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Botón principal (mismo padding que los links normales) */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm
                   text-zinc-700 hover:text-emerald-900 hover:bg-emerald-900/5 transition"
        aria-expanded={open}
      >
        <span>{label}</span>
        <ChevronDown
          className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Sub-items */}
      {open && (
        <div className="mt-1">
          {items.map((it) => (
            <a
              key={it.href}
              href={it.href}
              onClick={() => {
                setOpen(false);
                onNavigate?.();
              }}
              className="block px-6 py-2 rounded-xl text-sm
                         text-zinc-700 hover:text-emerald-900 hover:bg-emerald-900/5 transition"
            >
              {it.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
