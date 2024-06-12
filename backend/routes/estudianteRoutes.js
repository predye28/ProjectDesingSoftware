const express = require('express');
const router = express.Router();
const Persona = require('../models/personaModel');
const Estudiante = require('../models/estudianteModel');
const EquipoTrabajo = require('../models/equipoTrabajoModel');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const mongoose = require('mongoose');


// Configure multer for file uploads
/*
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../frontend/src/imgEstudiantes'));
  },
  filename: (req, file, cb) => {
    cb(null, `${req.params.identificacion}.jpg`);
  }
});

const upload = multer({ storage: storage });
*/


const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage });

router.post('/auth', async (req, res) => {
    const { correo, carne } = req.body;
  
    try {
      const estudiante = await Estudiante.findOne({ correo });
  
      if (!estudiante) {
        return res.status(401).json({ error: 'Correo electrónico no encontrado' });
      }
  
      const contraseñaValida = await bcrypt.compare(contraseña, estudiante.carne);
      if (!contraseñaValida) {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
      }
  
      // Autenticación exitosa
      res.status(200).json({
        message: 'Autenticación exitosa',
        sede: estudiante.sede,
        nombre: estudiante.nombre,
        apellido1: estudiante.apellido1,
      });
    } catch (error) {
      res.status(500).json({ error: error.message  });
    }
});
  

router.post('/registro', async (req, res) => {
    try {
      // Validar que todos los campos estén presentes

      const { carne, nombre, apellido1, apellido2, celular, correo, sede} = req.body
//      const { identificacion, nombre, apellido1, apellido2, celular, correo, contraseña, sede, tipo } = req.body;
     


      if (!carne || !nombre || !apellido1 || !apellido2 || !celular || !correo || !sede) {
        return res.status(400).json({ error: 'Por favor complete todos los camposs' });
      }
  
      const identificacion = carne;
      const tipo = "ES";
      const contraseña = carne; 
  
      // Verificar si ya existe un usuario con el mismo correo o identificación
      const existeCorreo = await Estudiante.findOne({ correo });
      if (existeCorreo) {
        return res.status(400).json({ error: 'Ya existe un usuario con este correo electrónico' });
      }
  
      const existeIdentificacion = await Estudiante.findOne({ carne });
      if (existeIdentificacion) {
        return res.status(400).json({ error: 'Ya existe un usuario con este carne' });
      }
  
      // Hash de la contraseña
     // const hashedPassword = await bcrypt.hash(carne, 10);
  
      // Crear una nueva instancia de Persona con los datos proporcionados
      const nuevoEstudiante = new Estudiante({
        nombre,
        carne,
        apellido1,
        apellido2,
        celular,
        correo,
        sede,
        identificacion,
        tipo,
        contraseña,
      });
  
      // Guardar la nueva persona en la base de datos
      await nuevoEstudiante.save();
  
      res.status(201).json({ message: 'Estudiante registrada exitosamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  
  
  router.get('/listar_estudiantes', async(request, response) =>{
    try{
        const estudiantes = await Estudiante.find({});
  
        return response.json(estudiantes);
    } catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
  });


  router.get('/:correo/nombre', async (req, res) => {
    try {
      const { correo } = req.params;
      const estudiante = await Estudiante.findOne({ correo });
      if (!estudiante) {
        return res.status(404).json({ error: 'Estudiante no encontrada' });
      }
      res.json({ nombre: estudiante.nombre });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


  router.put('/editar/:identificacion', upload.single('foto'), async (req, res) => {
    try {
      const { identificacion } = req.params;
      const { nombre, apellido1, apellido2, correo, celular, sede, tipo } = req.body;
  
      let fotoBase64 = '';
  
      if (req.file) {
        // Convert the uploaded photo to a Base64 string
        fotoBase64 = req.file.buffer.toString('base64');
      }
  
      // Update the student's information in the database
      const personaActualizada = await Estudiante.findOneAndUpdate(
        { identificacion },
        { nombre, apellido1, apellido2, correo, celular, sede, tipo, foto: fotoBase64 },
        { new: true }
      );
  
      if (!personaActualizada) {
        return res.status(404).json({ message: 'Estudiante no encontrado' });
      }
  
      res.json(personaActualizada);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

/*
  router.put('/editar/:identificacion', async (req, res) => {
    try {
      /*
      const { nombre, apellido1, apellido2, correo, celular, sede, tipo } = req.body;
      const personaActualizada = await Persona.findOneAndUpdate(
        { identificacion: req.params.identificacion },
        { nombre, apellido1, apellido2, correo, celular, sede, tipo },
        { new: true }
      );*/
      /*
      const { nombre, apellido1, apellido2, correo, celular, sede, tipo, foto } = req.body;
      const personaActualizada = await Estudiante.findOneAndUpdate(
        { identificacion: req.params.identificacion },
        { nombre, apellido1, apellido2, correo, celular, sede, tipo, foto },
        { new: true }
      );

        // Check if there's a new photo to upload
        if (foto) {
          // Save the photo to the imgEstudiantes folder
          // You can use a function like fs.rename to move the file
          // Make sure to handle errors and overwrite existing files
          // For simplicity, this example assumes the file is saved directly
          fs.rename(foto.path, `./frontend/src/imgEstudiantes/${identificacion}.jpg`, (err) => {
            if (err) console.log('Photo uploaded badly');
            console.log('Photo uploaded successfully');
          });
        }
      res.json(personaActualizada);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
*/


  router.get('/:identificacion', async (req, res) => {
    try {
      const { identificacion } = req.params;
      const persona = await Estudiante.findOne({ identificacion });
      if (!persona) {
        console.log('Epapa');
        return res.status(404).json({ error: 'Persona no encontrada' });
      }
      res.json(persona);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


module.exports = router;