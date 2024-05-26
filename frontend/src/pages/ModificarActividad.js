import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ModificarActividad.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
        setNumeroSemana(data.numeroSemana);
        setNombre(data.nombre);
        setFechaHoraProgramada(new Date(data.fechaHoraProgramada));
        setCantDiasPreviosAnunciar(data.cantDiasPreviosAnunciar);
        setCantDiasPreviosRecordar(data.cantDiasPreviosRecordar);
        setModalidad(data.modalidad);
        setLinkDeReunion(data.linkDeReunion);
        setTipoActividad(data.tipoActividad);
        setEstadoActividad(data.estadoActividad);
      } catch (error) {
        console.error('Error al obtener la actividad:', error);
        // Manejar el error según tu lógica
      }
    };

    fetchActividad();
  }, [id]);

  const handleGuardarCambios = async () => {
    try {
      const response = await fetch(`/api/actividadesRoutes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          numeroSemana,
          nombre,
          fechaHoraProgramada,
          cantDiasPreviosAnunciar,
          cantDiasPreviosRecordar,
          modalidad,
          linkDeReunion,
          tipoActividad,
          estadoActividad
        })
      });
      if (!response.ok) {
        throw new Error('Error al guardar los cambios');
      }
      // Redirigir al usuario a la página de ver actividad después de guardar los cambios
      window.location.href = `/VerActividad/${id}`;
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
      // Manejar el error según tu lógica
    }
  };

  const handleVolver = () => {
    // Redirigir al usuario a la página anterior
    window.history.back();
  };

  return (
    <div>
      <div className='menuPersona'>
        <label className='titulo'>Modificar Actividad</label>
        {actividad ? (
          <div>
            <label className='label'>Semana:</label>
            <input
              className='input'
              value={numeroSemana}
              onChange={(e) => setNumeroSemana(e.target.value)}
            />
            <label className='label'>Nombre:</label>
            <input
              className='input'
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
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
            <label className='label'>Días Previos Anunciar:</label>
            <input
              className='input'
              type='number'
              value={cantDiasPreviosAnunciar}
              onChange={(e) => setCantDiasPreviosAnunciar(e.target.value)}
            />
            <label className='label'>Días Previos Recordar:</label>
            <input
              className='input'
              type='number'
              value={cantDiasPreviosRecordar}
              onChange={(e) => setCantDiasPreviosRecordar(e.target.value)}
            />
            <label className='label'>Modalidad:</label>
            <select
              className='select'
              value={modalidad}
              onChange={(e) => setModalidad(e.target.value)}
            >
              <option value="Remota">Remota</option>
              <option value="Presencial">Presencial</option>
            </select>
            <label className='label'>Link de Reunión:</label>
            <input
              className='input'
              value={linkDeReunion}
              onChange={(e) => setLinkDeReunion(e.target.value)}
            />
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
        ) : (
          <p>Cargando información de la actividad...</p>
        )}
        <button className='button' onClick={handleVolver}>Volver</button>
        <button className='button' onClick={handleGuardarCambios}>Guardar Cambios</button>
      </div>
    </div>
  );
}

export default ModificarActividad;
