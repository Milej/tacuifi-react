import { apiRequest } from "./api";

export function getAccountDashboard() {
  return apiRequest("/account/dashboard");
}

export function updateProfile(payload) {
  return apiRequest("/account/profile", {
    method: "PUT",
    body: payload,
  });
}

export function updatePassword(payload) {
  return apiRequest("/account/password", {
    method: "PUT",
    body: payload,
  });
}

export function quoteReservation(payload) {
  return apiRequest("/account/reservations/quote", {
    method: "POST",
    body: payload,
  });
}

export function createReservation(payload) {
  return apiRequest("/account/reservations", {
    method: "POST",
    body: payload,
  });
}

export function getReservations() {
  return apiRequest("/account/reservations");
}
