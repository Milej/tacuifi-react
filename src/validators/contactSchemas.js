import "../zod.config.js";
import { z } from "zod";
import { dateSchema, emailSchema, minText, optionalText, phoneSchema, positiveInt } from "./common";

export const contactSchema = z.object({
  nombre: minText("Decinos tu nombre", 2).max(60, "Máximo 60 caracteres"),
  email: emailSchema,
  telefono: phoneSchema.refine((value) => /^[0-9+()\-\s]+$/.test(value), {
    message: "Usá solo números, espacios y símbolos + - ( )",
  }),
  unidad: minText("Seleccioná una unidad", 2),
  fechas: z
    .object(
      {
        desde: dateSchema,
        hasta: dateSchema,
      },
      { error: "Completa las fechas." }
    )
    .refine((value) => value.hasta > value.desde, {
      message: "La salida no puede ser antes que la entrada",
      path: ["hasta"],
    }),
  personas: z
    .object(
      {
        adultos: positiveInt("Indicá al menos 1 adulto").max(20, "Máximo 20 personas"),
        menores: z.coerce.number({ error: "Menores inválido" }).int("Menores inválido").min(0, "Menores inválido").max(20, "Máximo 20 personas"),
      },
      { error: "Completa la cantidad de personas." }
    )
    .refine((value) => value.adultos + value.menores <= 20, {
      message: "Máximo 20 personas (si son más, escribinos el detalle)",
      path: ["adultos"],
    }),
  mensaje: optionalText({
    invalidMessage: "Ingresá un mensaje válido.",
    max: 5000,
    maxMessage: "El mensaje es demasiado largo",
  }),
});
