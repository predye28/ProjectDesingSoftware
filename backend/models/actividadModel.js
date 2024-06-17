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
    tipoActividad: {
        type: String,
        required: true
    },
    fechaPublicacion: {
        type: Date,
        required: true
    },
    personasResponsables: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Persona'
    }],
    fechasRecordatorio: [{
        type: Date,
        required: true
    }],
    estudiantesInscritos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Estudiante'
    }],
    notificado: {
        type: Boolean,
        default: false
    },
    recordatoriosEnviados: [{
        type: Date
    }]
});

module.exports = mongoose.model('Actividad', actividadSchema);

