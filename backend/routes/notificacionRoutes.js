const express = require('express');
const router = express.Router();
const Notificacion = require('../models/notificacionModel');
const Estudiante = require('../models/estudianteModel');


//Crear nueva noti
router.post('/crear_notificacion', async (req, res) => {
  try {
    const notificacion = new Notificacion(req.body);
    await notificacion.save();
    res.status(201).json(notificacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Obtener notificaciones en base a carne estudiante
router.get('/obtener/:estudianteId', async (req, res) => {
  try {
    const notificaciones = await Notificacion.find({ estudianteId: req.params.estudianteId }).sort({ fechaHora: -1 });
    res.json(notificaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Actualizar a leido notificacion
router.put('/actualizar/:id/leido', async (req, res) => {
  try {
    const notificacion = await Notificacion.findByIdAndUpdate(req.params.id, { estado: 'leído' }, { new: true });
    res.json(notificacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Borrar noti leida
router.delete('/borrar/:id', async (req, res) => {
  try {
    const notificacion = await Notificacion.findByIdAndDelete(req.params.id);
    res.json({ message: 'notificacion borrada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
