const express = require('express');
const router = express.Router();
const Actividad = require('../models/actividadModel');


// Ruta para crear una nueva actividad
router.post('/', async (req, res) => {
  try {
    const nuevaActividad = new Actividad(req.body);
    await nuevaActividad.save();
    res.status(201).json(nuevaActividad);
  } catch (error) {
    console.error('Error al crear la actividad:', error);
    res.status(500).json({ error: 'Error al crear la actividad.' });
  }
});

// Ruta para obtener todas las actividades
router.get('/listar_actividades', async (req, res) => {
  try {
      const actividades = await Actividad.find();
      res.json(actividades);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

router.get('/:id/actividades', async (req, res) => {
    try {
      const actividades = await Actividad.find({ planTrabajo_id: req.params.id });
      res.json(actividades);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.get('/:id', async (req, res) => {
    try {
      const actividad = await Actividad.findById(req.params.id)
        .populate('personasResponsables', 'nombre apellido1'); // Poblar con nombre y apellido
      if (!actividad) {
        return res.status(404).json({ message: 'Actividad no encontrada' });
      }
      res.json(actividad);
    } catch (error) {
      console.error('Error al obtener la actividad:', error);
      res.status(500).json({ error: 'Error al obtener la actividad.' });
    }
  });

router.delete('/:id', async (req, res) => {
    try {
      const actividad = await Actividad.findByIdAndDelete(req.params.id);
      if (!actividad) {
        return res.status(404).json({ error: 'Actividad no encontrada' });
      }
      res.json({ message: 'Actividad eliminada correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Ruta para actualizar una actividad
router.put('/:id', async (req, res) => {
    try {
      const { nombre, fechaHoraProgramada, cantDiasPreviosAnunciar, cantDiasPreviosRecordar, modalidad, linkDeReunion, fechasRecordatorio, personasResponsables, numeroSemana, tipoActividad, estadoActividad } = req.body;
  
      // Verificar si la actividad existe
      const actividadExistente = await Actividad.findById(req.params.id);
      if (!actividadExistente) {
        return res.status(404).json({ error: 'Actividad no encontrada' });
      }
  
      // Actualizar los campos de la actividad
      actividadExistente.nombre = nombre;
      actividadExistente.numeroSemana = numeroSemana;
      actividadExistente.fechaHoraProgramada = fechaHoraProgramada;
      actividadExistente.cantDiasPreviosAnunciar = cantDiasPreviosAnunciar;
      actividadExistente.cantDiasPreviosRecordar = cantDiasPreviosRecordar;
      actividadExistente.modalidad = modalidad;
      actividadExistente.linkDeReunion = linkDeReunion;
      actividadExistente.estadoActividad = estadoActividad;
      actividadExistente.tipoActividad = tipoActividad;
      actividadExistente.fechasRecordatorio = fechasRecordatorio;
      actividadExistente.personasResponsables = personasResponsables;
  
      // Guardar la actividad actualizada
      await actividadExistente.save();
  
      res.json(actividadExistente);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.put('/:id/inscribirse', async (req, res) => {
    try {
      const actividad = await Actividad.findById(req.params.id);
      if (!actividad) {
        return res.status(404).json({ error: 'Actividad no encontrada' });
      }
  
      const { estudianteId } = req.params.id;
      console.log(estudianteId)
  
      // Verificar si el estudianteId está presente y es válido
      if (!estudianteId) {
        return res.status(400).json({ error: 'ID de estudiante no proporcionado' });
      }
  
      // Verificar si el estudiante ya está inscrito
      if (actividad.estudiantesInscritos.includes(estudianteId)) {
        return res.status(400).json({ error: 'El estudiante ya está inscrito en esta actividad' });
      }
  
      // Inscribir al estudiante
      actividad.estudiantesInscritos.push(estudianteId);
  
      // Guardar la actividad actualizada
      await actividad.save();
  
      res.json({ message: 'Estudiante inscrito correctamente', actividad });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;