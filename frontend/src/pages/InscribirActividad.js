import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function InscribirActividad() {
  const { id } = useParams();
  const [actividad, setActividad] = useState(null);
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  useEffect(() => {
    const fetchActividad = async () => {
      try {
        const response = await fetch(`/api/actividadesRoutes/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Error al obtener la actividad');
        }
        const data = await response.json();

        // Asegurarse de que las fechas sean objetos Date válidos
        if (data.fechaHoraProgramada) {
          data.fechaHoraProgramada = new Date(data.fechaHoraProgramada);
        }
        if (data.fechaPublicacion) {
          data.fechaPublicacion = new Date(data.fechaPublicacion);
        }
        if (data.fechasRecordatorio) {
          data.fechasRecordatorio = data.fechasRecordatorio.map(fecha => new Date(fecha));
        }

        setActividad(data);
      } catch (error) {
        console.error('Error al obtener la actividad:', error);
      }
    };

    fetchActividad();
  }, [id]);

  const handleInscribirse = async () => {
    try {
      const response = await fetch(`/api/actividadesRoutes/${id}/inscribirse`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          estudianteId: usuario.id  
        })
      });
      if (!response.ok) {
        throw new Error('Error al inscribirse en la actividad');
      }
      alert('¡Inscripción exitosa!');
      window.history.back();
    } catch (error) {
      console.error('Error al inscribirse en la actividad:', error);
      alert('Hubo un error al intentar inscribirse en la actividad.');
    }
  };

  const handleVolver = () => {
    window.history.back();
  };

  return (
    <div>
      <div className='menuPersona'>
        <label className='title'>Inscripción en Actividad</label>
        {actividad ? (
          <div className="actividadDetailsContainer">
            <div className="actividadCard">
              <div className='actividadDetails'>
                <label className='label'>Semana:</label>
                <input
                  className='input'
                  value={actividad.numeroSemana}
                  readOnly
                />
              </div>
              <div className='actividadDetails'>
                <label className='label'>Nombre:</label>
                <input
                  className='input'
                  value={actividad.nombre}
                  readOnly
                />
              </div>
              <div className='actividadDetails'>
                <label className='label'>Fecha y Hora programada:</label>
                <input
                  className='input'
                  value={new Date(actividad.fechaHoraProgramada).toLocaleString()}
                  readOnly
                />
              </div>
              <div className='actividadDetails'>
                <label className='label'>Fecha de Publicación:</label>
                <input
                  className='input'
                  value={new Date(actividad.fechaPublicacion).toLocaleString()}
                  readOnly
                />
              </div>
              <div className='actividadDetails'>
                <label className='label'>Días Previos Para Publicación:</label>
                <input
                  className='input'
                  value={actividad.cantDiasPreviosAnunciar}
                  readOnly
                />
              </div>
              <div className='actividadDetails'>
                <label className='label'>Días Previos Recordar:</label>
                <input
                  className='input'
                  value={actividad.cantDiasPreviosRecordar}
                  readOnly
                />
              </div>
              <div className='actividadDetails'>
                <label className='label'>Fechas de Recordatorio:</label>
                {actividad.fechasRecordatorio && actividad.fechasRecordatorio.length > 0 ? (
                  <ul>
                    {actividad.fechasRecordatorio.map((fecha, index) => (
                      <li key={index}>
                        <input
                          className='input'
                          value={new Date(fecha).toLocaleString()}
                          readOnly
                        />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No hay fechas de recordatorio asignadas.</p>
                )}
              </div>
              <div className='actividadDetails'>
                <label className='label'>Tipo Actividad:</label>
                <input
                  className='input'
                  value={actividad.tipoActividad}
                  readOnly
                />
              </div>
              <div className='actividadDetails'>
                <label className='label'>Modalidad:</label>
                <input
                  className='input'
                  value={actividad.modalidad}
                  readOnly
                />
              </div>
              {actividad.modalidad.toLowerCase() === 'remota' && (
                <div className='actividadDetails'>
                  <label className='label'>Link de Reunión:</label>
                  <input
                    className='input'
                    value={actividad.linkDeReunion}
                    readOnly
                  />
                </div>
              )}
              <div className='actividadDetails'>
                <label className='label'>Estado:</label>
                <input
                  className='input'
                  value={actividad.estadoActividad}
                  readOnly
                />
              </div>
            </div>
          </div>
        ) : (
          <p>Cargando información de la actividad...</p>
        )}
        <button className='volverVerActividad' onClick={handleInscribirse}>Inscribirse</button>
        <button className='volverVerActividad' onClick={handleVolver}>Volver</button>
        
      </div>
    </div>
  );
}

export default InscribirActividad;
