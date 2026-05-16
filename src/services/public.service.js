import { apiRequest } from "./api";

export function getPublicAccommodations() {
  return apiRequest("/public/accommodations");
}

export function getPublicHomeContent() {
  return apiRequest("/tacuifi/contenido");
}
