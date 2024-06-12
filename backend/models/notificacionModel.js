const mongoose = require('mongoose');


const notificacionSchema = mongoose.Schema({
  Titulo: {
    type: String,
    required: true
  },
  Fecha: {
    type: Date,
    default: Date.now
  },
  Emisor: {
    type: String,
    required: true,
    maxlength: 100
  },
  Contenido: {
    type: String,
    required: true
  },
  IDactividad: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Actividad',
    required: true
  }
});


module.exports  = mongoose.model('Notificacion', notificacionSchema);