import { DateTime } from "luxon";

export const añoActual = () => DateTime.now().toFormat("yyyy");
