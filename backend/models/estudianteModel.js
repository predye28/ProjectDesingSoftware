const mongoose = require('mongoose');

const Persona = require('./personaModel');


//Clase usuario con los datos del modelo Persona
class Usuario {
  constructor({ persona }) {
    this.nombre = persona.nombre;
    this.identificacion = persona.identificacion;
    this.apellido1 = persona.apellido1;
    this.apellido2 = persona.apellido2;
    this.correo = persona.correo;
    this.contraseña = persona.contraseña;
    this.celular = persona.celular;
    this.sede = persona.sede;
    this.tipo = persona.tipo;
    this.codigo = persona.codigo;
  }

  toObject() {
    return {
      nombre: this.nombre,
      identificacion: this.identificacion,
      apellido1: this.apellido1,
      apellido2: this.apellido2,
      correo: this.correo,
      contraseña: this.contraseña,
      celular: this.celular,
      sede: this.sede,
      tipo: this.tipo,
      codigo: this.codigo,
    };
  }
}

//Clase base Decorator de usuario
class DecoratorBase {
  constructor(persona) {
    this.persona = Usuario(persona);
  }

  getUsuario() {
    return `${this.persona.nombre} ${this.persona.apellido1} ${this.persona.apellido2}`;
  }

  toObject() {
    return { ...this.persona.toObject() };
  }
}

//Implementacion concreta del decorator para usuarios Estudiantes
class EstudianteDecorator extends DecoratorBase {
  constructor(persona) {
    super(persona);
    this.carne = persona.carne || '';
    this.foto = persona.foto || '';
  }

  getCarne() {
    return this.carne;
  }

  getFoto() {
    return this.foto;
  }

  toObject() {
    return {
      ...super.toObject(),
      carne: this.carne,
      foto: this.foto,
    };
  }
}


//Funcion Decorator para extender el esquema Persona a Estudiante
function extendPersonaForEstudiante(baseSchema) {
  return new mongoose.Schema({
    ...baseSchema.obj, 
    carne: { type: String, required: false },
    foto: { type: String },
  //  estado: { type: String, required: true }
  });
}

//Se crea Estudiante usando la funcion decorator
const estudianteSchema = extendPersonaForEstudiante(Persona.schema);

module.exports = mongoose.model('Estudiante', estudianteSchema);