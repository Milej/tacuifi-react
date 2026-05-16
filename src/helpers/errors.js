const TECHNICAL_MESSAGE_PATTERNS = [
  /\bcors\b/i,
  /\bsmtp\b/i,
  /\bmysql\b/i,
  /\bsql\b/i,
  /\bnetwork\s?error\b/i,
  /\bfailed to fetch\b/i,
  /\bload failed\b/i,
  /\bfetch failed\b/i,
  /\borigen no permitido\b/i,
  /\binternal server error\b/i,
  /\btimeout\b/i,
  /\beconn|enotfound|ehost|eauth|esocket|enoent|epipe\b/i,
];

function findFirstDetailMessage(error) {
  return Array.isArray(error?.details)
    ? error.details.find((detail) => typeof detail?.message === "string" && detail.message.trim())?.message || ""
    : "";
}

export function extractErrorMessage(error, fallback = "Ocurrio un error inesperado.") {
  if (typeof error === "string" && error.trim()) {
    return error.trim();
  }

  if (typeof error?.rawMessage === "string" && error.rawMessage.trim()) {
    return error.rawMessage.trim();
  }

  const firstDetailMessage = findFirstDetailMessage(error);
  if (firstDetailMessage) {
    return firstDetailMessage.trim();
  }

  if (typeof error?.payload?.message === "string" && error.payload.message.trim()) {
    return error.payload.message.trim();
  }

  if (typeof error?.message === "string" && error.message.trim()) {
    return error.message.trim();
  }

  return fallback;
}

function isTechnicalMessage(message) {
  return TECHNICAL_MESSAGE_PATTERNS.some((pattern) => pattern.test(message));
}

export function getErrorMessage(error, fallback = "Ocurrio un error inesperado.") {
  if (typeof error?.userMessage === "string" && error.userMessage.trim()) {
    return error.userMessage.trim();
  }

  const rawMessage = extractErrorMessage(error, fallback);
  const status = Number.isInteger(error?.status) ? error.status : null;
  const code = typeof error?.code === "string" ? error.code : "";

  if (code === "REQUEST_ABORTED") {
    return "La solicitud fue cancelada. Intenta nuevamente.";
  }

  if (code === "NETWORK_ERROR") {
    return "No se pudo conectar con el servidor. Intenta nuevamente en unos minutos.";
  }

  if (status >= 500) {
    return fallback;
  }

  if (isTechnicalMessage(rawMessage)) {
    return fallback;
  }

  return rawMessage || fallback;
}

export function toErrorPayload(error, fallbackMessage = "Ocurrio un error inesperado.") {
  return {
    message: getErrorMessage(error, fallbackMessage),
    rawMessage: extractErrorMessage(error, fallbackMessage),
    status: Number.isInteger(error?.status) ? error.status : null,
    code: error?.code || null,
    path: error?.path || null,
    method: error?.method || null,
    details: Array.isArray(error?.details) ? error.details : null,
  };
}

export function logClientError(scope, error, extra = {}) {
  const payload = {
    scope,
    ...extra,
    ...toErrorPayload(error),
  };

  console.error("[FE ERROR]", payload, error);
}
