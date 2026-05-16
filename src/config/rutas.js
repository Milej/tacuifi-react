export const INICIO = "/";
export const LOGIN = "/login";
export const REGISTRO = "/registro";
export const RECUPERAR_PASSWORD = "/recuperar";
export const RESTABLECER_PASSWORD = "/restablecer";

export function buildHomeSectionPath(section) {
  return `/#${section}`;
}

export const MI_CUENTA = "/mi-cuenta";
export const MI_PERFIL = "/mi-cuenta/perfil";
export const MI_RESERVAS = "/mi-cuenta/reservas";

export const accountRoutes = [
  { label: "Resumen", to: MI_CUENTA },
  { label: "Perfil", to: MI_PERFIL },
  { label: "Reservas", to: MI_RESERVAS },
];
