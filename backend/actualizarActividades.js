const Actividad = require('./models/actividadModel');
const Notificacion = require('./models/notificacionModel'); 
//const { PublishVisitor, ReminderVisitor } = require('./visitor');
//const { NotificationCenter } = require('./Observer'); // Importamos NotificationCenter
let fechaSimulada;

const enviarNotificacion = async (actividad, tipo) => {
    const nuevaNotificacion = new Notificacion({
        contenido: `${tipo}: ${actividad.nombre}`,
        emisor: 'Sistema',
        fechaHora: new Date(),
        estado: 'no leído',
        estudiantesInscritos: actividad.estudiantesInscritos
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


//const notificationCenter = new NotificationCenter();
//class NotificacionObserver extends Observer {
    //update(actividad, tipo) {
        //enviarNotificacion(actividad, tipo); // Llama a la función de enviarNotificacion
    //}
//}


//const notificacionObserver = new NotificacionObserver();


//notificationCenter.attach(notificacionObserver);



const actualizarEstadoActividades = async () => {
    try {
        const actividades = await Actividad.find();
        const ahora = fechaSimulada || new Date();

        //const publishVisitor = new PublishVisitor();
        //const reminderVisitor = new ReminderVisitor();

        for (let actividad of actividades) {
            const { fechaPublicacion, fechasRecordatorio, estadoActividad, notificado, recordatoriosEnviados } = actividad;

            // VERIFICAR PARA PUBLICAR
            if (estadoActividad === 'Planeada' && ahora >= fechaPublicacion && !notificado) {
                actividad.estadoActividad = 'Notificada';
                actividad.notificado = true;
                await actividad.save();
                await enviarNotificacion(actividad, 'Actividad Publicada');
                //NotificationCenter.notify(actividad, 'Actividad Publicada'); // Notificar al NotificationCenter
            }

            // VERIFICAR PARA HACER EL RECORDATORIO
            for (let fechaRecordatorio of fechasRecordatorio) {
                const fechaRecordatorioTime = new Date(fechaRecordatorio).getTime();
                const yaEnviado = recordatoriosEnviados.some(fecha => new Date(fecha).getTime() === fechaRecordatorioTime);

                if (estadoActividad === 'Notificada' && ahora >= fechaRecordatorio && !yaEnviado) {
                    actividad.recordatoriosEnviados.push(fechaRecordatorio);
                    await actividad.save();
                    await enviarNotificacion(actividad, 'Recordatorio de Actividad');
                    //NotificationCenter.notify(actividad, 'Recordatorio de Actividad'); // Notificar al NotificationCenter
                }
            }
            //actividad.accept(publishVisitor); // Publicar actividad
            //actividad.accept(reminderVisitor); // Enviar recordatorio
        }
    } catch (error) {
        console.error('Error actualizando actividades:', error);
    }
};

module.exports = { actualizarEstadoActividades, setFechaSimulada };