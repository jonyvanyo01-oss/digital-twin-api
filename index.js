const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const estadoFabrica = {
  modoFabrica: "AUTOMATICO",
  alarma: false,
  nivelEnergia: 72,
  puerta: { estado: "ABIERTA", ultimoAcceso: "RFID" },
  prensa: { estado: "TRABAJANDO", ciclos: 24 },
  generador: { estado: "NORMAL", consumo: 35 }
};

app.get('/estado', (req, res) => {
  res.json(estadoFabrica);
});

app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});