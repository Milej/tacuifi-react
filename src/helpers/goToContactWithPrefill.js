import { buildPrefillMessage } from "./buildPrefillMessage";

export function goToContactWithPrefill(unit) {
  const msg = buildPrefillMessage(unit);

  sessionStorage.setItem(
    "contact_prefill",
    JSON.stringify({
      unidadId: unit.id,
      unidadTitle: unit.title,
      unidadSubtitle: unit.subtitle,
      message: msg,
      personasPrefill: unit?.defaultGuests || null,
      ts: Date.now(),
    })
  );

  if (window.location.hash !== "#contacto") window.location.hash = "#contacto";

  requestAnimationFrame(() => {
    const element = document.getElementById("contacto");
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  window.dispatchEvent(new Event("contact:prefill"));
}
