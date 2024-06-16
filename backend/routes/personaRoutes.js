const express = require('express');
const router = express.Router();
const Persona = require('../models/personaModel');
const Estudiante = require('../models/estudianteModel');
const EstudianteDecorator = require('../models/estudianteModel');
const DecoratorBase = require('../models/estudianteModel');
const EquipoTrabajo = require('../models/equipoTrabajoModel');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const mongoose = require('mongoose');



router.post('/decorated/auth', async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    //Se verifica si usuario existe en la coleccion Persona
    let usuario = await Persona.findOne({ correo });
    let esEstudiante = false;

    if (!usuario) {
      //No se encontro en Persona
      usuario = await Estudiante.findOne({ correo });
      esEstudiante = true;
    }

    if (!usuario) {
      //No se encontró ni persona ni estudiante
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    //Verificar contrasenia
    let match;
    if (esEstudiante) {
      match = contraseña === user.contraseña;
    } else {
      match = await bcrypt.compare(contraseña, user.contraseña);
    }

    if (!match) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    //Se usa el decorator dependiendo si es estudiante o usuario base(persona)
    let decoratedUsuario;
    if (esEstudiante) {
      decoratedUsuario = new EstudianteDecorator(usuario);
    } else {
      decoratedUsuario = new DecoratorBase(usuario);
    }

    res.json(decoratedUsuario.toObject());
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});




//personaRoutes.js
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

/*
router.put('/editarContra/:correo', async (req, res) => {
  try {
    const { nombre, apellido1, apellido2, correo, celular, sede, tipo, contraseña } = req.body;
    const personaActualizada = await Estudiante.findOneAndUpdate(
      { correo: req.params.correo },
      { nombre, apellido1, apellido2, correo, celular, sede, tipo, contraseña },
      { new: true }
    );
    res.json(personaActualizada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
*/

router.put('/editarContra/:correo', async (req, res) => {
  try {
    const { correo } = req.params;
    const { newPassword } = req.body;

    // Find the student by email
    const estudiante = await Estudiante.findOne({ correo });

    // If student not found, return an error
    if (!estudiante) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Update the password
    estudiante.contraseña = newPassword;

    // Save the updated student
    await estudiante.save();

    // Return a success message
    return res.json({ message: 'Contraseña cambiada exitosamente' });
  } catch (error) {
    // Return an error message
    return res.status(500).json({ error: error.message });
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

router.get('/:correo/sede', async (req, res) => {
  try {
    const { correo } = req.params;
    const persona = await Persona.findOne({ correo }, 'sede'); // Changed to return 'sede'
    if (!persona) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ sede: persona.sede });
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

router.get('/profesores/:sede', async (req, res) => {
  try {
    const { sede } = req.params;
    // Filtrar por sede y tipo de persona
    const profesores = await Persona.find({ sede, tipo: 'PGC' }, 'nombre apellido1 _id');
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


router.post('/auth', async (req, res) => {


  const { correo, contraseña } = req.body;

  try {
    // Check if the user exists in Persona collection
    let user = await Persona.findOne({ correo });
    let tipoES = false;
    if (!user) {
      // If not found in Persona, check in Estudiante collection
      user = await Estudiante.findOne({ correo });
      tipoES = true;
    }

    if (!user) {//No se encontro ni persona ni estudiante
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Check the password
    let isMatch;
    if(tipoES === false){
      isMatch = await bcrypt.compare(contraseña, user.contraseña);
    }else{
      isMatch = contraseña === user.contraseña;
    }


    if (!isMatch) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    // If everything is correct, return the user data
    if(tipoES === false){
      res.json({
        _id: user._id,
        nombre: user.nombre,
        apellido1: user.apellido1,
        sede: user.sede,
        tipo: user.tipo,
        correo: user.correo
      });
    } else {
      res.json({
        nombre: user.nombre,
        apellido1: user.apellido1,
        sede: user.sede,
        tipo: user.tipo,
        correo: user.correo,
        carne: user.carne
      });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
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