// VerActividad.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './VerActividad.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function VerActividad() {
  const { id } = useParams();
  const [actividad, setActividad] = useState(null);

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
        setActividad(data);
      } catch (error) {
        console.error('Error al obtener la actividad:', error);
        // Manejar el error según tu lógica
      }
    };

    fetchActividad();
  }, [id]);

  const handleVolver = () => {
    window.history.back();
  };

  const handleEliminarActividad = async () => {
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
      // Manejar el error según tu lógica
    }
  };

  const handleModificarActividad = () => {
    window.location.href = `/ModificarActividad/${id}`;
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
                  selected={new Date(actividad.fechaHoraProgramada)}
                  dateFormat="dd/MM/yyyy HH:mm"
                  readOnly
                />
              </div>
              <div className='actividadDetails'>
                <label className='label'>Días Previos Anunciar:</label>
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
                <label className='label'>Modalidad:</label>
                <input
                  className='input'
                  value={actividad.modalidad}
                  readOnly
                />
              </div>
              <div className='actividadDetails'>
                <label className='label'>Link de Reunión:</label>
                <input
                  className='input'
                  value={actividad.linkDeReunion}
                  readOnly
                />
              </div>
              <div className='actividadDetails'>
                <label className='label'>Tipo:</label>
                <input
                  className='input'
                  value={actividad.tipoActividad}
                  readOnly
                />
              </div>
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
        <button className='volverVerActividad' onClick={handleVolver}>Volver</button>
        <button className='comentarActividad'>Comentar Actividad</button>
        <button className='eliminarActividad' onClick={handleEliminarActividad}>Eliminar Actividad</button>
        <button className='modificarActividad' onClick={handleModificarActividad}>Modificar Actividad</button>
      </div>
    </div>
  );
}

export default VerActividad;
