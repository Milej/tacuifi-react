import { getErrorMessage } from "../helpers/errors";

const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:4001/api").replace(/\/$/, "");
const IS_DEV = Boolean(import.meta.env.DEV);
let requestSequence = 0;

export async function apiRequest(path, options = {}) {
  const { method = "GET", body, headers = {}, signal } = options;
  const requestId = ++requestSequence;
  const url = `${API_BASE_URL}${path}`;
  const startedAt = Date.now();
  const requestHeaders =
    body === undefined
      ? { ...headers }
      : {
          "Content-Type": "application/json",
          ...headers,
        };

  if (IS_DEV) {
    console.info("[API REQUEST]", { requestId, method, path, url });
  }

  let response;
  try {
    response = await fetch(url, {
      method,
      headers: requestHeaders,
      body: body === undefined ? undefined : JSON.stringify(body),
      credentials: "include",
      signal,
    });
  } catch (error) {
    const networkError = new Error("No se pudo conectar con el servidor. Intenta nuevamente en unos minutos.");
    networkError.name = "ApiNetworkError";
    networkError.code = error?.name === "AbortError" ? "REQUEST_ABORTED" : "NETWORK_ERROR";
    networkError.path = path;
    networkError.method = method;
    networkError.cause = error;
    networkError.rawMessage =
      typeof error?.message === "string" && error.message.trim() ? error.message.trim() : "Network request failed";
    networkError.userMessage = getErrorMessage(
      networkError,
      "No se pudo conectar con el servidor. Intenta nuevamente en unos minutos."
    );
    networkError.message = networkError.userMessage;

    console.error("[API REQUEST FAILED]", {
      requestId,
      method,
      path,
      durationMs: Date.now() - startedAt,
      message: networkError.userMessage,
      rawMessage: networkError.rawMessage,
      code: networkError.code,
      cause: error,
    });

    throw networkError;
  }

  const responseText = await response.text();
  let data = null;
  if (responseText) {
    try {
      data = JSON.parse(responseText);
    } catch {
      data = null;
    }
  }

  if (IS_DEV) {
    console.info("[API RESPONSE]", {
      requestId,
      method,
      path,
      status: response.status,
      ok: response.ok,
      durationMs: Date.now() - startedAt,
    });
  }

  if (!response.ok) {
    const firstDetail = Array.isArray(data?.details) ? data.details.find((detail) => detail?.message)?.message : null;
    const rawMessage = firstDetail || data?.message || responseText || "No se pudo completar la solicitud.";
    const error = new Error(rawMessage);
    error.status = response.status;
    error.details = data?.details || null;
    error.path = path;
    error.method = method;
    error.rawMessage = rawMessage;
    error.userMessage = getErrorMessage(
      error,
      response.status >= 500
        ? "No se pudo completar la accion. Intenta nuevamente en unos minutos."
        : "No se pudo completar la solicitud."
    );
    error.message = error.userMessage;

    console.error("[API RESPONSE ERROR]", {
      requestId,
      method,
      path,
      status: response.status,
      durationMs: Date.now() - startedAt,
      message: error.userMessage,
      rawMessage,
      details: error.details,
    });

    throw error;
  }

  return data?.data ?? data;
}
