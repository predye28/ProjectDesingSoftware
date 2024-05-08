import mongoose from "mongoose";

const comentarioSchema = mongoose.Schema({
    actividad_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Actividad',
        required: true
    },
    persona_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Persona',
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    texto: {
        type: String,
        required: true
    }
});

export const Comentario = mongoose.model('Comentario', comentarioSchema);
