const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

let ciclos = 0;

app.get('/estado', (req, res) => {
  ciclos++;

  // "Reloj" que va de 0 a 1 cada 60 segundos
  const t = ((Date.now() / 1000) % 60) / 60;

  // Energía: sube y baja en triángulo, entre ~10 y ~95
  const frac = t < 0.5 ? t * 2 : 2 - t * 2;     // 0 -> 1 -> 0
  const nivelEnergia = Math.round(10 + frac * 85);

  // Prensa: casi siempre TRABAJANDO, con un ratito de ERROR
  let estadoPrensa = "TRABAJANDO";
  if (t > 0.70 && t < 0.85) estadoPrensa = "ERROR";

  // Alarma: se activa en el tramo final del ciclo
  const alarma = (t > 0.90);

  // Estado del generador según la energía
  let estadoGen = "NORMAL";
  if (nivelEnergia < 25) estadoGen = "CRITICO";
  else if (nivelEnergia <= 50) estadoGen = "BAJO";

  const estadoFabrica = {
    modoFabrica: "AUTOMATICO",
    alarma: alarma,
    nivelEnergia: nivelEnergia,
    puerta: { estado: alarma ? "BLOQUEADA" : "CERRADA", ultimoAcceso: "RFID" },
    prensa: { estado: estadoPrensa, ciclos: ciclos },
    generador: { estado: estadoGen, consumo: 100 - nivelEnergia }
  };

  res.json(estadoFabrica);
});

app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});
