const express = require('express');
const router = express.Router();
const Persona = require('../models/personaModel');
const EquipoTrabajo = require('../models/equipoTrabajoModel');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const mongoose = require('mongoose');

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
    res.status(200).json({
      message: 'Autenticación exitosa',
      sede: usuario.sede,
      tipo: usuario.tipo,
    });
  } catch (error) {
    res.status(500).json({ error: error.message  });
  }
});


// personaRoutes.js
router.post('/registro', async (req, res) => {
  try {
    // Validar que todos los campos estén presentes
    const { identificacion, nombre, apellido1, apellido2, celular, correo, contraseña, sede, tipo } = req.body;
   
    if (!identificacion || !nombre || !apellido1 || !apellido2 || !celular || !correo || !contraseña || !sede || !tipo) {
      return res.status(400).json({ error: 'Por favor complete todos los camposs' });
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



router.get('/listar_estudiantes', async(request, response) =>{
  try{
      const personas = await Persona.find({});

      return response.json(personas);
  } catch (error){
      console.log(error.message);
      response.status(500).send({message: error.message});
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
      console.log('Epapa');
      return res.status(404).json({ error: 'Persona no encontrada' });
    }
    res.json(persona);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/obtener/:identificacion', async (req, res) => {
  try {
    const { identificacion } = req.params;
    if (!mongoose.Types.ObjectId.isValid(identificacion)) {
      return res.status(404).json({ error: 'Identificacion no valida' });
    }
    const persona = await Persona.findOne({ _id: identificacion});
    if (!persona) {
      console.log('Epapa');
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
router.get('/:correo/id', async (req, res) => {
  try {
    const { correo } = req.params;
    const persona = await Persona.findOne({ correo }, '_id');
    if (!persona) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ id: persona._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
/////////////////////////////////////////////////////


router.get('/profesores/:sede', async (req, res) => {
  try {
    const { sede } = req.params;
    const profesores = await Persona.find({ sede });
    res.json(profesores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/profesoresPGC/:tipo', async (req, res) => {
  try {
    const { tipo } = req.params;
    const profesores = await Persona.find({ tipo }); // Obtener profesores coordinadores
    res.json(profesores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/equipoTrabajo', async (req, res) => {
  try {
    const { nombre, integrantes, lider_id, año, semestre } = req.body;

    // Verifica si el líder del equipo existe
    const liderExistente = await Persona.findById(lider_id);
    if (!liderExistente) {
      return res.status(400).json({ error: 'El líder del equipo no existe' });
    }

    // Verifica si los integrantes del equipo existen y obtén sus IDs
    const integrantesIds = [];
    for (const integranteId of integrantes) {
      const integranteExistente = await Persona.findById(integranteId);
      if (!integranteExistente) {
        return res.status(400).json({ error: 'Uno de los integrantes del equipo no existe' });
      }
      integrantesIds.push(integranteId);
    }

    // Crea el nuevo equipo de trabajo
    const nuevoEquipoTrabajo = new EquipoTrabajo({
      nombre,
      integrantes: integrantesIds,
      lider_id,
      año,
      semestre
    });

    // Guarda el equipo de trabajo en la base de datos
    await nuevoEquipoTrabajo.save();

    res.status(201).json({ message: 'Equipo de trabajo registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/enviar_correo', async (req,res) => {
  const { email, codigo } = req.body;
  //const codigo = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  let config = {
      service : 'gmail',
      auth : {
          user: 'juanemallma@gmail.com',
          pass: 'oyth mtls wzds qcmr'
      },
      tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false
      },
  }

  let transporter = nodemailer.createTransport(
          config
      );

  let MailGenerator = new Mailgen({
      theme: "salted",
      product : {
          name: "Mailgen",
          link : 'https://mailgen.js/'
      }
  })

  let response = {
      body: {
          name : "/Hola...",
          intro: "Su código de verificación es: " + codigo,
          code: codigo,
          outro: "Estamos atentos ante cualquier duda. Equipo Guía de Primer Ingreso",
      }
  }

  let mail = MailGenerator.generate(response)

  let message = {
      from : "juanemallma@gmail.com",
      to : email,
      subject: "Guia de Primer Ingreso",
      html: mail
  }

  transporter.sendMail(message).then(() => {
    return res.status(201).json({
        msg: "you should receive an email",
        codema: codigo

    })
  }).catch(error => {
      return res.status(500).json({ error })
  })

});


router.get('/profesores', async (req, res) => {
  try {
    console.log("aAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    const profesoresPorSede = {};
    const sedes = ['SJ', 'CA', 'SC', 'LM', 'AL'];
    
    // Obtener profesores por sede
    for (const sede of sedes) {
      const profesoresSede = await Persona.find({ sede });
      profesoresPorSede[sede] = profesoresSede;
    }
    
    // Obtener profesores PGC
    const profesoresPGC = await Persona.find({ tipo: 'PGC' });

    res.json({ profesoresPorSede, profesoresPGC });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//////////////////////////////////////////////////////////////////


module.exports = router;