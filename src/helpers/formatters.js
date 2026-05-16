export function formatCurrency(value, currency = "ARS") {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

export function formatDate(value) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("es-AR", {
    dateStyle: "medium",
  }).format(new Date(`${value}T12:00:00`));
}

export function formatDateTime(value) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("es-AR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function titleCase(value = "") {
  return String(value)
    .replaceAll("_", " ")
    .replaceAll("-", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function formatPercentage(value) {
  return `${Number(value || 0)}%`;
}

export function getFullName(profile = {}) {
  return [profile.firstName, profile.lastName].filter(Boolean).join(" ").trim();
}
