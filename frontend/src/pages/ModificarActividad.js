import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ModificarActividad.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';

function ModificarActividad() {
  const { id } = useParams();
  const [actividad, setActividad] = useState(null);
  const [numeroSemana, setNumeroSemana] = useState('');
  const [nombre, setNombre] = useState('');
  const [fechaHoraProgramada, setFechaHoraProgramada] = useState(null);
  const [cantDiasPreviosAnunciar, setCantDiasPreviosAnunciar] = useState('');
  const [cantDiasPreviosRecordar, setCantDiasPreviosRecordar] = useState('');
  const [modalidad, setModalidad] = useState('');
  const [linkDeReunion, setLinkDeReunion] = useState('');
  const [tipoActividad, setTipoActividad] = useState('');
  const [estadoActividad, setEstadoActividad] = useState('');
  const [fechaPublicacion, setFechaPublicacion] = useState(null);
  const [profesores, setProfesores] = useState([]);
  const [profesoresSeleccionados, setProfesoresSeleccionados] = useState([]);

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

        const fechaHoraProgramada = data.fechaHoraProgramada ? new Date(data.fechaHoraProgramada) : null;
        const fechaPublicacion = data.fechaPublicacion ? new Date(data.fechaPublicacion) : null;

        setActividad(data);
        setNumeroSemana(data.numeroSemana);
        setNombre(data.nombre);
        setFechaHoraProgramada(fechaHoraProgramada);
        setCantDiasPreviosAnunciar(data.cantDiasPreviosAnunciar);
        setCantDiasPreviosRecordar(data.cantDiasPreviosRecordar);
        setModalidad(data.modalidad);
        setLinkDeReunion(data.linkDeReunion);
        setTipoActividad(data.tipoActividad);
        setEstadoActividad(data.estadoActividad);
        setFechaPublicacion(fechaPublicacion);
        setProfesoresSeleccionados(data.personasResponsables.map((profesor) => ({
          value: profesor._id,
          label: `${profesor.nombre} ${profesor.apellido1}`
        })));
      } catch (error) {
        console.error('Error al obtener la actividad:', error);
      }
    };

    fetchActividad();
  }, [id]);

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

  const handleGuardarCambios = async () => {
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
      const response = await fetch(`/api/actividadesRoutes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          numeroSemana: numeroSemanaInt,
          nombre,
          fechaHoraProgramada,
          cantDiasPreviosAnunciar: cantDiasAnunciarInt,
          cantDiasPreviosRecordar: cantDiasRecordarInt,
          modalidad,
          linkDeReunion,
          tipoActividad,
          estadoActividad,
          fechaPublicacion,
          personasResponsables: profesoresSeleccionados.map((profesor) => profesor.value)
        })
      });
      if (!response.ok) {
        throw new Error('Error al guardar los cambios');
      }
      // Redirigir al usuario a la página de ver actividad después de guardar los cambios
      window.location.href = `/VerActividad/${id}`;
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    }
  };

  const handleVolver = () => {
    window.history.back();
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
        <label className='title'>Modificar Actividad</label>
        {actividad ? (
          <div className="actividadDetailsContainer">
            <div className="actividadCard">
              <div className='actividadDetails'>
                <label className='label'>Semana:</label>
                <input
                  className='input'
                  value={numeroSemana}
                  onChange={handleNumeroSemanaChange}
                />
              </div>
              <div className='actividadDetails'>
                <label className='label'>Nombre:</label>
                <input
                  className='input'
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className='actividadDetails'>
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
              <div className='actividadDetails'>
                <label className='label'>Fecha de Publicación:</label>
                <DatePicker
                  className='input'
                  selected={fechaPublicacion}
                  onChange={(date) => setFechaPublicacion(date)}
                  dateFormat="dd/MM/yyyy"
                />
              </div>
              <div className='actividadDetails'>
                <label className='label'>Días Previos Anunciar:</label>
                <input
                  className='input'
                  type='number'
                  value={cantDiasPreviosAnunciar}
                  onChange={(e) => setCantDiasPreviosAnunciar(e.target.value)}
                />
              </div>
              <div className='actividadDetails'>
                <label className='label'>Días Previos Recordar:</label>
                <input
                  className='input'
                  type='number'
                  value={cantDiasPreviosRecordar}
                  onChange={(e) => setCantDiasPreviosRecordar(e.target.value)}
                />
              </div>
              <div className='actividadDetails'>
                <label className='label'>Modalidad:</label>
                <input
                  className='input'
                  value={modalidad}
                  onChange={(e) => setModalidad(e.target.value)}
                />
              </div>
              {modalidad.toLowerCase() === 'virtual' && (
                <div className='actividadDetails'>
                  <label className='label'>Link de la Reunión:</label>
                  <input
                    className='input'
                    type='text'
                    value={linkDeReunion}
                    onChange={(e) => setLinkDeReunion(e.target.value)}
                  />
                </div>
              )}
              <div className='actividadDetails'>
                <label className='label'>Tipo de Actividad:</label>
                <input
                  className='input'
                  type='text'
                  value={tipoActividad}
                  onChange={(e) => setTipoActividad(e.target.value)}
                />
              </div>
              <div className='actividadDetails'>
                <label className='label'>Estado de la Actividad:</label>
                <select
                  className='select'
                  value={estadoActividad}
                  onChange={(e) => setEstadoActividad(e.target.value)}
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="Realizada">Realizada</option>
                  <option value="Cancelada">Cancelada</option>
                </select>
              </div>
              <div className='actividadDetails'>
                <label className='label'>Profesores Responsables:</label>
                <Select
                  className='select'
                  options={profesores}
                  isMulti
                  value={profesoresSeleccionados}
                  onChange={(selected) => setProfesoresSeleccionados(selected)}
                />
              </div>
            </div>
            <div className="button-group">
              <button className='button' onClick={handleGuardarCambios}>Guardar</button>
              <button className='button' onClick={handleVolver}>Volver</button>
            </div>
          </div>
        ) : (
          <p>Cargando actividad...</p>
        )}
      </div>
    </div>
  );
}

export default ModificarActividad;
