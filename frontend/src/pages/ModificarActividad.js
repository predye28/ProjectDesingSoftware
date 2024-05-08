import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ModificarActividad.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function ModificarActividad() {
  const { id } = useParams();
  const [actividad, setActividad] = useState(null);
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState(null);
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
        setNombre(data.nombre);
        setFecha(new Date(data.fecha));
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
          nombre,
          fecha,
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
            <label style={{ position: 'absolute', top: 180, left: 50, fontSize: 20, fontWeight: 'bold', color: 'white' }}>Nombre:</label>
            <input
              style={{ position: 'absolute', top: 180, left: 150, fontSize: 20 }}
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <label style={{ position: 'absolute', top: 450, left: 50, fontSize: 20, fontWeight: 'bold', color: 'white' }}>Fecha:</label>
            <DatePicker
              selected={fecha}
              onChange={(date) => setFecha(date)}
              dateFormat="dd/MM/yyyy"
              style={{ fontSize: 20 }}
            />
            <label style={{ position: 'absolute', top: 360, left: 500, fontSize: 20, fontWeight: 'bold', color: 'white' }}>Tipo:</label>
            <select
              className='selectTipo'
              value={tipoActividad}
              onChange={(e) => setTipoActividad(e.target.value)}
            >
              <option value="Remota">Remota</option>
              <option value="Presencial">Presencial</option>
            </select>
            <label style={{ position: 'absolute', top: 450, left: 500, fontSize: 20, fontWeight: 'bold', color: 'white' }}>Estado:</label>
            <select
              className='selectEstado'
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
        <button className='volverModificarActividad' onClick={handleVolver}>Volver</button>
        <button className='guardarCambios' onClick={handleGuardarCambios}>Guardar Cambios</button>
      </div>
    </div>
  );
}

export default ModificarActividad;
