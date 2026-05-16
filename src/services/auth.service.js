import { apiRequest } from "./api";

export function register(payload) {
  return apiRequest("/auth/register", {
    method: "POST",
    body: payload,
  });
}

export function login(payload) {
  return apiRequest("/auth/login", {
    method: "POST",
    body: payload,
  });
}

export function logout() {
  return apiRequest("/auth/logout", {
    method: "POST",
  });
}

export function getCurrentUser() {
  return apiRequest("/auth/me");
}

export function forgotPassword(email) {
  return apiRequest("/auth/forgot-password", {
    method: "POST",
    body: { email },
  });
}

export function resetPassword(payload) {
  return apiRequest("/auth/reset-password", {
    method: "POST",
    body: payload,
  });
}
