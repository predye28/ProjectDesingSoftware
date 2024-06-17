const express = require('express');
const router = express.Router();
const Notificacion = require('../models/notificacionModel');

// Crear nueva notificación
router.post('/crear_notificacion', async (req, res) => {
  try {
    const notificacion = new Notificacion(req.body);
    await notificacion.save();
    res.status(201).json(notificacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener notificaciones en base al ID del estudiante
router.get('/obtener/:id', async (req, res) => {
  try {
    const notificaciones = await Notificacion.find({ estudiantesInscritos: req.params.id }).sort({ fechaHora: -1 });
    res.json(notificaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar a leído una notificación
router.put('/actualizar/:id/leido', async (req, res) => {
  try {
    const notificacion = await Notificacion.findByIdAndUpdate(req.params.id, { estado: 'leído' }, { new: true });
    res.json(notificacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Borrar una notificación leída
router.delete('/borrar/:id', async (req, res) => {
  try {
    const notificacion = await Notificacion.findByIdAndDelete(req.params.id);
    res.json({ message: 'notificación borrada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

