const enviarNotificacion = require('./actualizarActividades').enviarNotificacion; 

class Visitor {
  visitActividad(actividad) {}
}

class PublishVisitor extends Visitor {
  visitActividad(actividad) {
    const fechaSimulada = require('./actualizarActividades').getFechaSimulada(); 
    const ahora = fechaSimulada || new Date();
    const { fechaPublicacion, estadoActividad, notificado } = actividad;

    if (estadoActividad === 'Planeada' && ahora >= fechaPublicacion && !notificado) {
      actividad.estadoActividad = 'Notificada';
      actividad.notificado = true;
      enviarNotificacion(actividad, 'Actividad Publicada');
    }
  }
}

class ReminderVisitor extends Visitor {
  visitActividad(actividad) {
    const fechaSimulada = require('./actualizarActividades').getFechaSimulada(); 
    const ahora = fechaSimulada || new Date();
    const { fechasRecordatorio, estadoActividad, recordatoriosEnviados } = actividad;

    for (let fechaRecordatorio of fechasRecordatorio) {
      const fechaRecordatorioTime = new Date(fechaRecordatorio).getTime();
      const yaEnviado = recordatoriosEnviados.some(fecha => new Date(fecha).getTime() === fechaRecordatorioTime);

      if (estadoActividad === 'Notificada' && ahora >= fechaRecordatorio && !yaEnviado) {
        actividad.recordatoriosEnviados.push(fechaRecordatorio);
        enviarNotificacion(actividad, 'Recordatorio de Actividad');
      }
    }
  }
}

module.exports = {
  PublishVisitor,
  ReminderVisitor
};
