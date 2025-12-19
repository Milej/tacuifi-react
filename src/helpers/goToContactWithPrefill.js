// helpers/goToContactWithPrefill.js
import { buildPrefillMessage } from "./buildPrefillMessage";

export function goToContactWithPrefill(unit) {
  const msg = buildPrefillMessage(unit);

  // ✅ defaults por unidad
  const personasPrefill =
    unit?.id === "apartamento"
      ? { adultos: 2, menores: 0 }
      : unit?.id === "piedra"
      ? { adultos: 2, menores: 1 }
      : null;

  sessionStorage.setItem(
    "contact_prefill",
    JSON.stringify({
      unidadId: unit.id,
      unidadTitle: unit.title,
      unidadSubtitle: unit.subtitle,
      message: msg,
      personasPrefill, // ✅ NUEVO
      ts: Date.now(),
    })
  );

  // hash + scroll
  if (window.location.hash !== "#contacto") window.location.hash = "#contacto";

  requestAnimationFrame(() => {
    const el = document.getElementById("contacto");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  window.dispatchEvent(new Event("contact:prefill"));
}
