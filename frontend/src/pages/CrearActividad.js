// CrearActividad.js

import React, { useState } from 'react';
import './CrearActividad.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function CrearActividad() {
  const [numeroSemana, setNumeroSemana] = useState('');
  const [nombre, setNombre] = useState('');
  const [tipoActividad, setTipoActividad] = useState('Remota');
  const [fechaHoraProgramada, setFechaHoraProgramada] = useState(null);
  const [cantDiasPreviosAnunciar, setCantDiasPreviosAnunciar] = useState('');
  const [cantDiasPreviosRecordar, setCantDiasPreviosRecordar] = useState('');
  const [modalidad, setModalidad] = useState('Online');
  const [linkDeReunion, setLinkDeReunion] = useState('');
  const [estadoActividad, setEstadoActividad] = useState('Planeada');

  const handleVolver = () => {
    const urlParts = window.location.href.split('/');
    const idPlanTrabajo = urlParts[urlParts.length - 1];
    window.location.href = `/VerPlanTrabajo/${idPlanTrabajo}`;
  };

  const handleRegistrarActividad = async () => {
    if (!numeroSemana || !nombre || !fechaHoraProgramada || !cantDiasPreviosAnunciar || !cantDiasPreviosRecordar || !modalidad || !estadoActividad) {
      alert('Por favor complete todos los campos requeridos.');
      return;
    }

    const numeroSemanaInt = parseInt(numeroSemana);
    const cantDiasAnunciarInt = parseInt(cantDiasPreviosAnunciar);
    const cantDiasRecordarInt = parseInt(cantDiasPreviosRecordar);

    if (isNaN(numeroSemanaInt) || numeroSemanaInt < 1 || numeroSemanaInt > 18) {
      alert('El número de semana debe ser un número entre 1 y 18.');
      return;
    }

    if (isNaN(cantDiasAnunciarInt) || isNaN(cantDiasRecordarInt)) {
      alert('Los días previos a anunciar y a recordar deben ser números.');
      return;
    }

    try {
      const urlParts = window.location.href.split('/');
      const idPlanTrabajo = urlParts[urlParts.length - 1];
      
      const response = await fetch(`/api/actividadesRoutes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          numeroSemana: numeroSemanaInt,
          nombre,
          tipoActividad,
          fechaHoraProgramada,
          cantDiasPreviosAnunciar: cantDiasAnunciarInt,
          cantDiasPreviosRecordar: cantDiasRecordarInt,
          modalidad,
          linkDeReunion,
          estadoActividad,
          planTrabajo_id: idPlanTrabajo
        })
      });

      if (!response.ok) {
        throw new Error('Error al registrar la actividad.');
      }

      window.location.href = `/VerPlanTrabajo/${idPlanTrabajo}`;
    } catch (error) {
      console.error('Error al registrar la actividad:', error);
    }
  };

  return (
    <div>
      <div className='menuPersona'>
        <label className='title'>Crear Actividad</label>
        
        <div className='columnas'>
          <div className='columna'>
            <div className='inputContainer'>
              <label className='label'>Semana:</label>
              <input
                className='input'
                value={numeroSemana}
                onChange={(e) => setNumeroSemana(e.target.value)}
              />
            </div>
            <div className='inputContainer'>
              <label className='label'>Nombre:</label>
              <input
                className='input'
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className='inputContainer'>
              <label className='label'>Fecha y Hora programada:</label>
              <DatePicker
                className='input'
                selected={fechaHoraProgramada}
                onChange={(date) => setFechaHoraProgramada(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="dd/MM/yyyy HH:mm"
              />
            </div>
            <div className='inputContainer'>
              <label className='label'>Días Previos Anunciar:</label>
              <input
                className='input'
                type='number'
                value={cantDiasPreviosAnunciar}
                onChange={(e) => setCantDiasPreviosAnunciar(e.target.value)}
              />
            </div>
          </div>
          
          <div className='columna'>
            <div className='inputContainer'>
              <label className='label'>Días Previos Recordar:</label>
              <input
                className='input'
                type='number'
                value={cantDiasPreviosRecordar}
                onChange={(e) => setCantDiasPreviosRecordar(e.target.value)}
              />
            </div>
            <div className='inputContainer'>
              <label className='label'>Modalidad:</label>
              <select
                className='select'
                value={modalidad}
                onChange={(e) => setModalidad(e.target.value)}
              >
                <option value="Remota">Remota</option>
                <option value="Presencial">Presencial</option>
              </select>
            </div>
            <div className='inputContainer'>
              <label className='label'>Link de Reunión (opcional):</label>
              <input
                className='input'
                value={linkDeReunion}
                onChange={(e) => setLinkDeReunion(e.target.value)}
              />
            </div>
            <div className='inputContainer'>
              <label className='label'>Tipo:</label>
              <select
                className='select'
                value={tipoActividad}
                onChange={(e) => setTipoActividad(e.target.value)}
              >
                <option value="Orientadora">Orientadora</option>
                <option value="Motivacional">Motivacional</option>
                <option value="ApoyoEstudiantil">Apoyo a la vida estudiantil</option>
                <option value="Tecnica">Tecnica</option>
                <option value="Recreacional">Recreacional</option>
              </select>
            </div>
            <div className='inputContainer'>
              <label className='label'>Estado:</label>
              <select
                className='select'
                value={estadoActividad}
                onChange={(e) => setEstadoActividad(e.target.value)}
              >
                <option value="Planeada">Planeada</option>
                <option value="Notificada">Notificada</option>
                <option value="Realizada">Realizada</option>
                <option value="Cancelada">Cancelada</option>
              </select>
            </div>
          </div>
        </div>

        <button className='button' onClick={handleRegistrarActividad}>Registrar Actividad</button>
        <button className='button' onClick={handleVolver}>Volver</button>
      </div>
    </div>
  );
}

export default CrearActividad;