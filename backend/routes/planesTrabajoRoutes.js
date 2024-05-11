// planesTrabajoRoutes.js
const express = require('express');
const router = express.Router();
const PlanTrabajo = require('../models/planTrabajoModel');



// Obtener todos los planes de trabajo
router.get('/', async (req, res) => {
    try {
        const planesTrabajo = await PlanTrabajo.find();
        res.json(planesTrabajo);
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
});

// Obtener un plan de trabajo por ID
router.get('/:id', async (req, res) => {
    try {
      const planTrabajo = await PlanTrabajo.findById(req.params.id);
      if (!planTrabajo) {
        return res.status(404).json({ error: 'Plan de trabajo no encontrado' });
      }
      res.json(planTrabajo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

// Crear un nuevo plan de trabajo
router.post('/', async (req, res) => {
    try {
      const { nombre, fechaInicio, fechaFin, responsable } = req.body;
      if (!nombre || !fechaInicio || !fechaFin || !responsable) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
      }
      const nuevoPlanTrabajo = new PlanTrabajo({
        nombre,
        fechaInicio,
        fechaFin,
        responsable
      });
      await nuevoPlanTrabajo.save();
      res.status(201).json({ message: 'Plan de trabajo creado exitosamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

// Actualizar un plan de trabajo existente
router.put('/:id', async (req, res) => {
  try {
    const { fechaInicio, fechaFin, actividades, responsable } = req.body;
    const planTrabajoActualizado = await PlanTrabajo.findByIdAndUpdate(req.params.id, {
      fechaInicio,
      fechaFin,
      actividades,
      responsable
    }, { new: true });
    res.json(planTrabajoActualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar un plan de trabajo
router.delete('/:id', async (req, res) => {
  try {
    await PlanTrabajo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Plan de trabajo eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/:id/actividades', async (req, res) => {
  try {
    const planTrabajo = await PlanTrabajo.findById(req.params.id);
    if (!planTrabajo) {
      return res.status(404).json({ error: 'Plan de trabajo no encontrado' });
    }
    // Obtener las actividades asociadas al plan de trabajo
    const actividades = await Actividad.find({ planTrabajo_id: req.params.id });
    res.json(actividades);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
