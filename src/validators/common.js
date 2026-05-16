import "../zod.config.js";
import { z } from "zod";

export function requiredText(message) {
  return z.string({ error: message }).trim().min(1, message);
}

export function minText(message, min) {
  return z.string({ error: message }).trim().min(min, message);
}

export function optionalText({ invalidMessage = "Ingresá un texto válido.", max, maxMessage } = {}) {
  let schema = z.string({ error: invalidMessage }).trim();

  if (typeof max === "number") {
    schema = schema.max(max, maxMessage || invalidMessage);
  }

  return schema.optional().or(z.literal(""));
}

export function positiveInt(message) {
  return z.coerce.number({ error: message }).int(message).positive(message);
}

export function nonNegativeInt(message) {
  return z.coerce.number({ error: message }).int(message).nonnegative(message);
}

export function nonNegativeNumber(message) {
  return z.coerce.number({ error: message }).nonnegative(message);
}

export function booleanField(message) {
  return z.boolean({ error: message });
}

export const emailSchema = requiredText("Ingresa tu email.")
  .email("Ingresá un email válido.")
  .transform((value) => value.toLowerCase());

export const passwordSchema = z.string({ error: "Ingresá tu contraseña." }).min(8, "La contraseña debe tener al menos 8 caracteres.");

export const phoneSchema = z
  .string({ error: "Ingresá un teléfono válido." })
  .trim()
  .min(8, "Ingresá un teléfono válido.")
  .max(40, "El teléfono es demasiado largo.");

export const optionalPhoneSchema = phoneSchema.optional().or(z.literal(""));

export const dateSchema = requiredText("Ingresá una fecha válida.")
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Ingresá una fecha válida.")
  .refine((value) => {
    const [year, month, day] = value.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return (
      Number.isFinite(year) &&
      Number.isFinite(month) &&
      Number.isFinite(day) &&
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  }, "Ingresá una fecha válida.");
