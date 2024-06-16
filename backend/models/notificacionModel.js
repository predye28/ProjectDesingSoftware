const mongoose = require('mongoose');


const notificacionSchema = mongoose.Schema({
  emisor: { type: String, required: true },
  fechaHora: { type: Date, default: Date.now },
  contenido: { type: String, required: true },
  estado: { type: String, enum: ['leído', 'no leído'], default: 'no leído' },

});


module.exports  = mongoose.model('Notificacion', notificacionSchema);