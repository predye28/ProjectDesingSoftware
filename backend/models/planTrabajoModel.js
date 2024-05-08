const mongoose = require('mongoose');

const planTrabajoSchema = mongoose.Schema({
    nombre: { 
        type: String,
        required: true 
    },
    fechaInicio: {
        type: Date,
        required: true
    },
    fechaFin: {
        type: Date,
        required: true
    },
    actividades: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Actividad'
    }],
    responsable: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Persona',
        required: true
    }
});
module.exports = mongoose.model('PlanTrabajo', planTrabajoSchema);
