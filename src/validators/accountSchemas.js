import "../zod.config.js";
import { z } from "zod";
import { dateSchema, minText, optionalPhoneSchema, optionalText, passwordSchema, positiveInt } from "./common";

export const profileSchema = z.object({
  firstName: minText("Ingresa tu nombre.", 2),
  lastName: minText("Ingresa tu apellido.", 2),
  phone: optionalPhoneSchema,
  documentNumber: optionalText({
    invalidMessage: "Ingresa un documento valido.",
    max: 40,
    maxMessage: "El documento es demasiado largo.",
  }),
  birthDate: dateSchema.optional().or(z.literal("")),
});

export const profilePasswordSchema = z.object({
  password: passwordSchema,
});

export const reservationFormSchema = z.object({
  accommodationId: positiveInt("Elegi un alojamiento."),
  fechas: z
    .object(
      {
        desde: dateSchema,
        hasta: dateSchema,
      },
      { error: "Completa las fechas de la reserva." }
    )
    .refine((value) => value.hasta > value.desde, {
      message: "La salida debe ser posterior a la entrada.",
      path: ["hasta"],
    }),
  personas: z
    .object(
      {
        adultos: positiveInt("Debe haber al menos un adulto.").max(20, "Maximo 20 personas."),
        menores: z.coerce.number({ error: "Cantidad invalida." }).int("Cantidad invalida.").min(0, "Cantidad invalida.").max(20, "Maximo 20 personas."),
      },
      { error: "Completa la cantidad de personas." }
    )
    .refine((value) => value.adultos + value.menores <= 20, {
      message: "La reserva admite hasta 20 personas.",
      path: ["adultos"],
    }),
  notes: optionalText({
    invalidMessage: "Ingresa una observacion valida.",
    max: 1000,
    maxMessage: "Las observaciones son demasiado largas.",
  }),
});
