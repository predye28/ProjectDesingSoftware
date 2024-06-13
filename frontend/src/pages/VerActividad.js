import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './VerActividad.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function VerActividad() {
  const { id } = useParams();
  const [actividad, setActividad] = useState(null);

  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const { tipo } = usuario;

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

  const handleVolver = () => {
    window.history.back();
  };

  const handleEliminarActividad = async () => {
    if (tipo === 'PGC') {
      try {
        const response = await fetch(`/api/actividadesRoutes/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Error al eliminar la actividad');
        }
        window.history.back();
      } catch (error) {
        console.error('Error al eliminar la actividad:', error);
      }
    } else {
      alert('Solo el Profesor Guia Coordinador puede realizar esta acción.');
    }
  };

  const handleModificarActividad = () => {
    if (tipo === 'PGC') {
      window.location.href = `/ModificarActividad/${id}`;
    } else {
      alert('Solo el Profesor Guia Coordinador puede realizar esta acción.');
    }
  };

  return (
    <div>
      <div className='menuPersona'>
        <label className='title'>Actividad</label>
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
                <DatePicker
                  className='input'
                  selected={actividad.fechaHoraProgramada}
                  dateFormat="dd/MM/yyyy HH:mm"
                  readOnly
                />
              </div>
              <div className='actividadDetails'>
                <label className='label'>Fecha de Publicación:</label>
                <DatePicker
                  className='input'
                  selected={actividad.fechaPublicacion}
                  dateFormat="dd/MM/yyyy"
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
                        <DatePicker
                          className='input'
                          selected={fecha}
                          dateFormat="dd/MM/yyyy"
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
              <div className='actividadDetails'>
                <label className='label'>Profesores Responsables:</label>
                {actividad.personasResponsables && actividad.personasResponsables.length > 0 ? (
                  <ul>
                    {actividad.personasResponsables.map((profesor) => (
                      <li key={profesor._id}>{`${profesor.nombre} ${profesor.apellido1}`}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No hay profesores responsables asignados.</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p>Cargando información de la actividad...</p>
        )}
        <button className='volverVerActividad' onClick={handleVolver}>Volver</button>
        <button className='comentarActividad'>Comentar Actividad</button>
        <button className='eliminarActividad' onClick={handleEliminarActividad}>Eliminar Actividad</button>
        <button className='modificarActividad' onClick={handleModificarActividad}>Modificar Actividad</button>
      </div>
    </div>
  );
}

export default VerActividad;
