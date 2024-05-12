const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const EquipoTrabajo = require('../models/equipoTrabajoModel');



router.get('/', async (request, response) => {
  try {
    const equipos = await EquipoTrabajo.find({});

    return response.status(200).json({
      count: equipos.length,
      data: equipos,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.get('/listar_equipos', async(request, response) =>{
  try{
      const equipos = await EquipoTrabajo.find({});

      return response.json(equipos);
  } catch (error){
      console.log(error.message);
      response.status(500).send({message: error.message});
  }
});


router.put('/editar_equipo/:identificacion', async (req, res) => {
  try {
    const { identificacion } = req.params;
    if (!mongoose.Types.ObjectId.isValid(identificacion)) {
      return res.status(404).json({ error: 'Identificacion no valida' });
    }
    const { nombre, integrantes, lider_id, año, semestre } = req.body;
    const equipoActualizado = await EquipoTrabajo.findOneAndUpdate(
      { _id: identificacion },
      { nombre, integrantes, lider_id, año, semestre },
      { new: true }
    );
    res.json(equipoActualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:identificacion', async (req, res) => {
  try {
    const { identificacion } = req.params;
    if (!mongoose.Types.ObjectId.isValid(identificacion)) {
      return res.status(404).json({ error: 'Identificacion no valida' });
    }

    const equipo = await EquipoTrabajo.findOne({ _id: identificacion });
    if (!equipo) {
      return res.status(404).json({ error: 'Equipo no encontrado' });
    }

    res.json(equipo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  /*
  try {
    const { identificacion} = req.params;
    const nombre = 'Germenes';
    const equipo = await EquipoTrabajo.findOne({ nombre });
    if (!equipo) {
      console.log(identificacion);
      console.log("europapa")
      return res.status(404).json({ error: 'Persona no encontrada' });
    }

    res.json(equipo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }*/
});


router.get('obtener_equipo', async (req, res) => {
  try {
    const { identificacion} = req.body;
    const equipo = await EquipoTrabajo.findOne({ identificacion });
    if (!equipo) {
      console.log(identificacion);
      return res.status(404).json({ error: 'Persona no encontrada' });
    }

    res.json(equipo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/equipos_trabajo/:año/:semestre', async (req, res) => {
//router.get('/equipos_trabajo', async (req, res) => {
    try {
     const { año, semestre } = req.parameters; // Assuming año and semestre are sent as query parameters
     // console.log('Query parameters:', año, semestre);  
      if (!año || !semestre) {
        return res.status(400).json({ message: 'Parámetros "año" (string) y "semestre" (string) son obligatorios' });
      }
  
      const equipos = await EquipoTrabajo.find({ año, semestre });
  
      if (!equipos.length) {
        return res.status(204).send({ message: 'No se encontraron equipos de trabajo' });
      }
      return res.status(200).json(equipos);
    } catch (error) {
      console.error('Error getting equipos de trabajo:', error);
      return res.status(500).send({ message: 'Error al consultar equipos de trabajo' });
    }
  });





module.exports = router;
