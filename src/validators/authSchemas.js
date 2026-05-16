import "../zod.config.js";
import { z } from "zod";
import { emailSchema, minText, passwordSchema, phoneSchema, requiredText } from "./common";

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerSchema = z
  .object({
    firstName: minText("Ingresa tu nombre.", 2),
    lastName: minText("Ingresa tu apellido.", 2),
    phone: phoneSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: requiredText("Repetí tu contraseña."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z.object({
  token: requiredText("Ingresá el token de recuperación."),
  password: passwordSchema,
});

export function getAuthSchema(mode) {
  switch (mode) {
    case "register":
      return registerSchema;
    case "forgot":
      return forgotPasswordSchema;
    case "reset":
      return resetPasswordSchema;
    case "login":
    default:
      return loginSchema;
  }
}
