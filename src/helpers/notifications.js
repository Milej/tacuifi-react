import { getErrorMessage } from "./errors";

const listeners = new Set();
let toastId = 0;

const DEFAULT_DURATION = {
  success: 4200,
  error: 6200,
  info: 4600,
  warning: 5200,
};

function emitNotification(payload) {
  const normalizedType = payload.type || "info";
  const normalizedText =
    normalizedType === "error"
      ? getErrorMessage(payload.text, "No se pudo completar la accion. Intenta nuevamente.")
      : String(payload.text || "").trim();

  const toast = {
    id: ++toastId,
    type: normalizedType,
    title: String(payload.title || "").trim(),
    text: normalizedText,
    duration: payload.duration ?? DEFAULT_DURATION[normalizedType] ?? DEFAULT_DURATION.info,
  };

  listeners.forEach((listener) => listener(toast));
  return Promise.resolve(toast);
}

export function subscribeNotifications(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function notifySuccess(title, text = "", options = {}) {
  return emitNotification({ ...options, type: "success", title, text });
}

export function notifyError(title, text = "", options = {}) {
  return emitNotification({ ...options, type: "error", title, text });
}

export function notifyInfo(title, text = "", options = {}) {
  return emitNotification({ ...options, type: "info", title, text });
}

export function notifyWarning(title, text = "", options = {}) {
  return emitNotification({ ...options, type: "warning", title, text });
}
