import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import { DateTime } from "luxon";

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const transport = nodemailer.createTransport({
  host: "vps-2032666-x.dattaweb.com",
  port: 465,
  secure: true,
  auth: {
    user: "no-reply@tacuifi.com.ar",
    pass: "41089042Max*",
  },
});

app.post("/mail", async (req, res) => {
  const { name, phone, email, paxAdult, paxChildren, paxBaby, paxPet, checkin, checkout, message } = req.body;
  const checkInLuxon = DateTime.fromISO(checkin).toFormat("dd/MM/yyyy");
  const checkOutLuxon = DateTime.fromISO(checkout).toFormat("dd/MM/yyyy");

  let result = await transport.sendMail({
    from: email,
    to: "consultas@tacuifi.com.ar",
    subject: `Nueva consulta de ${name}`,
    html: `<h3><b>Check-in:</b> ${checkInLuxon} | <b>Check-out:</b> ${checkOutLuxon}</h3>
    <p><b>Nombre:</b> ${name}</p>
    <p><b>Telefóno:</b> ${phone}</p>
    <p><b>Email:</b> ${email}</p>
    <h5><b>Cantidad de huéspedes</b></h5>
    <p>${paxAdult && paxAdult + " Adultos"} ${paxChildren && " | " + paxChildren + " Menores"} ${
      paxBaby && " | " + paxBaby + " Menores de 3 años"
    }</p>

    ${
      paxPet &&
      `<h5><b>Mascotas</b></h5>
    <p>${paxPet} mascotas</p>`
    }

    <h5><b>Consulta</b></h5>
    <p>${message}</p>`,
  });

  res.send(result);
});

app.listen(4000, () => console.log("Servidor montado en el puerto 4000"));

app.get("/", (req, res) => {
  res.send("Api running...");
});
