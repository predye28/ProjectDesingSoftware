const mongoose = require('mongoose');

const actividadSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    tipoActividad: {
        type: String,
        required: true
    },
    estadoActividad: {
        type: String,
        required: true
    },
    planTrabajo_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlanTrabajo',
        required: true
    }
});
module.exports = mongoose.model('Actividad', actividadSchema);

