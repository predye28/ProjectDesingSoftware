// Importa el modelo de Actividad aquí
const Actividad = require('./models/actividadModel'); // Asegúrate de usar la ruta correcta según tu estructura de archivos
const Notificacion = require('./models/notificacionModel'); // Asegúrate de usar la ruta correcta según tu estructura de archivos

let fechaSimulada;

const enviarNotificacion = async (actividad, tipo) => {
    // Implementar la lógica de envío de notificación
    const nuevaNotificacion = new Notificacion({
        contenido: `${tipo}: ${actividad.nombre}`,
        emisor: 'Sistema',
        receptor: actividad.personasResponsables,
        fechaHora: new Date(),
        estado: 'no leído'
    });
    await nuevaNotificacion.save();
};

const setFechaSimulada = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/fechaSistemaRoutes/getFechaSimulada', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (!response.ok) {
        throw new Error('Error al obtener la fecha simulada');
      }
      const data = await response.json();
      fechaSimulada = new Date(data.fechaSimulada);
      console.log('Fecha simulada actualizada:', fechaSimulada);
    } catch (error) {
      console.error('Error al obtener fecha simulada:', error);
    }
  };

const actualizarEstadoActividades = async () => {
  try {
    console.log("a")
    const actividades = await Actividad.find();
    const ahora = fechaSimulada || new Date();

    for (let actividad of actividades) {
      const { fechaPublicacion, fechasRecordatorio, estadoActividad } = actividad;
      if (estadoActividad === 'Planeada' && ahora >= fechaPublicacion) {
        
        actividad.estadoActividad = 'Notificada';
        await actividad.save();
        await enviarNotificacion(actividad, 'Actividad Publicada');
      }

      for (let fechaRecordatorio of fechasRecordatorio) {
        console.log(fechaRecordatorio)
        if (estadoActividad === 'Notificada' && ahora >= fechaRecordatorio) {
          console.log("recorda")
          await enviarNotificacion(actividad, 'Recordatorio de Actividad');
        }
      }
    }
  } catch (error) {
    console.error('Error actualizando actividades:', error);
  }
};

module.exports = { actualizarEstadoActividades, setFechaSimulada };
