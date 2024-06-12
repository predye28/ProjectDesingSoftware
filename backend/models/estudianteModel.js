const mongoose = require('mongoose');

const Persona = require('./personaModel');

// Decorator function to extend Persona schema for Estudiante
function extendPersonaForEstudiante(baseSchema) {
  return new mongoose.Schema({
    ...baseSchema.obj, // Copy base schema fields
    carne: { type: String, required: false },
    foto: { type: String },
   // nombreUsuario: { type: String, required: true },
  //  rol: { type: String, required: true },
  //  estado: { type: String, required: true }
  });
}

// Create Estudiante schema using the decorator function
const estudianteSchema = extendPersonaForEstudiante(Persona.schema);

module.exports = mongoose.model('Estudiante', estudianteSchema);

/*
const estudianteSchema = mongoose.Schema({
  nombre: { type: String, required: true },
  carne: { type: String, required: true },
  apellido1: { type: String, required: true },
  apellido2: { type: String, required: true },
  correo: { type: String, required: true },
  celular: { type: String, required: true },
  sede: { type: String, required: true },
});

module.exports = mongoose.model('Estudiante', estudianteSchema);
*/