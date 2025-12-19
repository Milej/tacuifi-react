const MAIL_API_URL = "http://localhost:4000/api/contact/mail";

async function parseError(res) {
  try {
    const data = await res.json();
    return data?.message || data?.error || "No se pudo enviar el email.";
  } catch {
    return "No se pudo enviar el email.";
  }
}

export async function enviarConsultaMail({ message, meta }) {
  try {
    const res = await fetch(MAIL_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        meta, 
      }),
    });

    if (!res.ok) {
      const msg = await parseError(res);
      throw new Error(msg);
    }

    return true;
  } catch (err) {
    console.error("[MAIL] Error enviando consulta:", err);
    throw err;
  }
}
