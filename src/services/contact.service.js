import { apiRequest } from "./api";

export async function enviarConsultaMail({ message, subject, name, email, phone }) {
  try {
    await apiRequest("/contact/mail", {
      method: "POST",
      body: {
        message,
        subject,
        name,
        email,
        phone,
      },
    });

    return true;
  } catch (err) {
    console.error("[MAIL] Error enviando consulta:", err);
    throw err;
  }
}
