// helpers/buildPrefillMessage.js
export function buildPrefillMessage(unit) {
  return `Hola! Quiero consultar disponibilidad para ${unit.title} (${unit.subtitle}).
Fechas: ____ a ____
Cantidad de personas: ____
Gracias!`;
}
