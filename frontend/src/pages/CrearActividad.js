import React, { useState, useEffect } from 'react';
import './CrearActividad.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';

function CrearActividad() {
  const [numeroSemana, setNumeroSemana] = useState('');
  const [nombre, setNombre] = useState('');
  const [tipoActividad] = useState('Remota');
  const [fechaHoraProgramada, setFechaHoraProgramada] = useState(null);
  const [cantDiasPreviosAnunciar, setCantDiasPreviosAnunciar] = useState('');
  const [cantDiasPreviosRecordar, setCantDiasPreviosRecordar] = useState('');
  const [modalidad, setModalidad] = useState('Online');
  const [linkDeReunion, setLinkDeReunion] = useState('');
  const [estadoActividad, setEstadoActividad] = useState('Planeada');
  const [fechaPublicacion, setFechaPublicacion] = useState(null);
  const [profesores, setProfesores] = useState([]);
  const [profesoresSeleccionados, setProfesoresSeleccionados] = useState([]);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const sedeUsuario = usuario?.sede;

    const fetchProfesores = async () => {
      try {
        const response = await fetch(`/api/personaRoutes/profesores/${sedeUsuario}`);
        const data = await response.json();
        const opcionesProfesores = data.map((profesor) => ({
          value: profesor._id,
          label: `${profesor.nombre} ${profesor.apellido1}`
        }));
        setProfesores(opcionesProfesores);
      } catch (error) {
        console.error('Error al obtener los profesores:', error);
      }
    };

    fetchProfesores();
  }, []);

  const handleVolver = () => {
    const urlParts = window.location.href.split('/');
    const idPlanTrabajo = urlParts[urlParts.length - 1];
    window.location.href = `/VerPlanTrabajo/${idPlanTrabajo}`;
  };

  const handleRegistrarActividad = async () => {
    if (!numeroSemana || !nombre || !fechaHoraProgramada || !cantDiasPreviosAnunciar || !cantDiasPreviosRecordar || !modalidad || !estadoActividad || profesoresSeleccionados.length === 0) {
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

    if (fechaPublicacion && fechaHoraProgramada) {
      const diffDays = Math.floor((fechaHoraProgramada - fechaPublicacion) / (1000 * 60 * 60 * 24));
      if (cantDiasRecordarInt > diffDays) {
        alert('La cantidad de días requeridos para realizar recordatorios no puede ser mayor a la diferencia entre la fecha de la actividad y la fecha de la primera publicación.');
        return;
      }
    } else {
      alert('Por favor, seleccione la fecha de publicación y la fecha de la actividad.');
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
          planTrabajo_id: idPlanTrabajo,
          fechaPublicacion,
          personasResponsables: profesoresSeleccionados.map((profesor) => profesor.value)
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

  const handleNumeroSemanaChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      const intValue = parseInt(value, 10);
      if (intValue >= 1 && intValue <= 18) {
        setNumeroSemana(value);
      } else if (value === '') {
        setNumeroSemana('');
      }
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
                onChange={handleNumeroSemanaChange}
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
              <label className='label'>Fecha de Publicación:</label>
              <DatePicker
                className='input'
                selected={fechaPublicacion}
                onChange={(date) => setFechaPublicacion(date)}
                dateFormat="dd/MM/yyyy"
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
                <option value="Presencial">Presencial</option>
                <option value="Remota">Remota</option>
              </select>
            </div>
            {modalidad === 'Remota' && (
              <div className='inputContainer'>
                <label className='label'>Link de Reunión (opcional):</label>
                <input
                  className='input'
                  value={linkDeReunion}
                  onChange={(e) => setLinkDeReunion(e.target.value)}
                />
              </div>
            )}
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
            <div className='inputContainer'>
              <label className='label'>Profesor Responsable:</label>
              <Select
                isMulti
                options={profesores}
                value={profesoresSeleccionados}
                onChange={setProfesoresSeleccionados}
                className='input'
                classNamePrefix='select'
              />
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
