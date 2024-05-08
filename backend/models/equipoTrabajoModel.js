const mongoose = require('mongoose');

const equipoTrabajoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    integrantes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Persona'
    }],
    lider_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Persona'
    },
    año: {
        type: String,
        required: true
    },
    semestre: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('EquipoTrabajo', equipoTrabajoSchema);