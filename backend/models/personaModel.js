const mongoose = require('mongoose');

const personaSchema = mongoose.Schema({
  nombre: { type: String, required: true },
  identificacion: { type: String, required: true },
  apellido1: { type: String, required: true },
  apellido2: { type: String, required: true },
  correo: { type: String, required: true },
  contraseña: { type: String, required: true },
  celular: { type: String, required: true },
  sede: { type: String, required: true },
  tipo: { type: String, required: true },
  codigo: { type: String, required: false },
});

module.exports = mongoose.model('Persona', personaSchema);