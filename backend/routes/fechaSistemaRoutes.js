const express = require('express');
const router = express.Router();

let fechaSimulada;

router.post('/', (req, res) => {
  const { fecha } = req.body;  
  if (fecha) {
    fechaSimulada = new Date(fecha);
    res.json({ message: 'Fecha del sistema cambiada exitosamente', fechaSimulada });
  } else {
    res.status(400).json({ message: 'Fecha no proporcionada' });
  }
});

router.get('/getFechaSimulada', (req, res) => {
    res.json({ fechaSimulada });
});

module.exports = router;
