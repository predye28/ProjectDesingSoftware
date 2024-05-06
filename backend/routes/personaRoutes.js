const express = require('express');
const router = express.Router();
const Persona = require('../models/personaModel');
const bcrypt = require('bcrypt');

router.post('/auth', async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const usuario = await Persona.findOne({ correo });

    if (!usuario) {
      return res.status(401).json({ error: 'Correo electrónico no encontrado' });
    }

    const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!contraseñaValida) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Autenticación exitosa
    res.status(200).json({ message: 'Autenticación exitosa' });
  } catch (error) {
    res.status(500).json({ error: error.message  });
  }
});


// personaRoutes.js

router.post('/registro', async (req, res) => {
  try {
    // Validar que todos los campos estén presentes
    const { identificacion, nombre, apellido1, apellido2, celular, correo, contraseña, numeroOficina, sede, tipo } = req.body;
    if (!identificacion || !nombre || !apellido1 || !apellido2 || !celular || !correo || !contraseña || !numeroOficina || !sede || !tipo) {
      return res.status(400).json({ error: 'Por favor complete todos los campos' });
    }

    // Verificar si ya existe un usuario con el mismo correo o identificación
    const existeCorreo = await Persona.findOne({ correo });
    if (existeCorreo) {
      return res.status(400).json({ error: 'Ya existe un usuario con este correo electrónico' });
    }

    const existeIdentificacion = await Persona.findOne({ identificacion });
    if (existeIdentificacion) {
      return res.status(400).json({ error: 'Ya existe un usuario con esta identificación' });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    // Crear una nueva instancia de Persona con los datos proporcionados
    const nuevaPersona = new Persona({
      identificacion,
      nombre,
      apellido1,
      apellido2,
      celular,
      correo,
      contraseña: hashedPassword, // Guardar la contraseña hasheada
      numeroOficina,
      sede,
      tipo
    });

    // Guardar la nueva persona en la base de datos
    await nuevaPersona.save();

    res.status(201).json({ message: 'Persona registrada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




router.get('/:correo/nombre', async (req, res) => {
  try {
    const { correo } = req.params;
    const persona = await Persona.findOne({ correo });
    if (!persona) {
      return res.status(404).json({ error: 'Persona no encontrada' });
    }
    res.json({ nombre: persona.nombre });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/eliminar/:identificacion', async (req, res) => {
  const identificacion = req.params.identificacion;

  try {
    // Buscar y eliminar la persona por identificación
    const personaEliminada = await Persona.findOneAndDelete({ identificacion });

    if (!personaEliminada) {
      return res.status(404).json({ error: 'No se encontró ninguna persona con la identificación proporcionada' });
    }

    res.status(200).json({ message: 'Persona eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:identificacion', async (req, res) => {
  try {
    const { identificacion } = req.params;
    const persona = await Persona.findOne({ identificacion });
    if (!persona) {
      return res.status(404).json({ error: 'Persona no encontrada' });
    }
    res.json(persona);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/editar/:identificacion', async (req, res) => {
  try {
    const { nombre, apellido1, apellido2, correo, celular, sede, tipo } = req.body;
    const personaActualizada = await Persona.findOneAndUpdate(
      { identificacion: req.params.identificacion },
      { nombre, apellido1, apellido2, correo, celular, sede, tipo },
      { new: true }
    );
    res.json(personaActualizada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;