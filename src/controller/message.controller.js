require('dotenv').config();
const Twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID; // Carga desde .env
const authToken = process.env.TWILIO_AUTH_TOKEN;   // Carga desde .env
const client = Twilio(accountSid, authToken);

const sendMessage = async (req, res) => {
    const { to, name, appointmentType } = req.body; // Extraemos el número, nombre y tipo de cita
  
    // Lista de tipos de citas
    const tiposDeCitas = [
      "Odontológica",
      "Medicina general",
      "Rayos X",
      "Laboratorio",
      "Oftalmología",
      "Pediatría",
      "Ginecología",
      "Dermatología",
      "Traumatología",
      "Cardiología"
    ];
  
    // Validar si el tipo de cita está en la lista
    if (!tiposDeCitas.includes(appointmentType)) {
      return res.status(400).json({ success: false, error: "Tipo de cita no válido." });
    }
  
    // Mensaje predeterminado con el nombre y tipo de cita del usuario
    const mensajePredeterminado = `Estimado/a ${name}, desde Uba Vihonco, queremos recordarte la cita de ${appointmentType} programada para el día de 28/10/2024 a las 02:00 pm. Recuerda estar 15 minutos antes.`;
  
    try {
      const msg = await client.messages.create({
        body: mensajePredeterminado, // Usamos el mensaje predeterminado con nombre y tipo de cita
        from: process.env.TWILIO_PHONE_NUMBER, // Carga desde .env
        to: to,
      });
      res.json({ success: true, sid: msg.sid });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  };
  
  module.exports = { sendMessage };
  