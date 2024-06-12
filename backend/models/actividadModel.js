const mongoose = require('mongoose');

const actividadSchema = mongoose.Schema({
    numeroSemana: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    tipoActividad: {
        type: String,
        required: true
    },
    fechaHoraProgramada: {
        type: Date,
        required: true
    },
    cantDiasPreviosAnunciar: {
        type: String,
        required: true
    },
    cantDiasPreviosRecordar: {
        type: String,
        required: true
    },
    planTrabajo_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlanTrabajo',
        required: true
    },
    modalidad: {
        type: String,
        required: true
    },
    linkDeReunion: {
        type: String,
        required: false
    },
    estadoActividad: {
        type: String,
        required: true
    },
    personasResponsables: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Persona'
    }],
});
module.exports = mongoose.model('Actividad', actividadSchema);

