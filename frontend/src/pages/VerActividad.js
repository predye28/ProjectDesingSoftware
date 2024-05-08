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
    // Redirigir al usuario a la página anterior
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
      // Redirigir al usuario a la página anterior o a la página de inicio
      window.history.back();
    } catch (error) {
      console.error('Error al eliminar la actividad:', error);
      // Manejar el error según tu lógica
    }
  };
  const handleModificarActividad = () => {
    // Redirigir al usuario a la página de modificar actividad con el ID de la actividad
    window.location.href = `/ModificarActividad/${id}`;
  };
  return (
    <div>
      <div className='menuPersona'>
        <label className='titulo'>Ver Actividad</label>
        {actividad ? (
          <div>
            <label style={{ position: 'absolute', top: 180, left: 50, fontSize: 20, fontWeight: 'bold', color: 'white' }}>Nombre:</label>
            <input
              style={{ position: 'absolute', top: 180, left: 150, fontSize: 20 }}
              value={actividad.nombre}
              readOnly
            />
            <label style={{ position: 'absolute', top: 450, left: 50, fontSize: 20, fontWeight: 'bold', color: 'white' }}>Fecha:</label>
            <DatePicker
              selected={new Date(actividad.fecha)}
              onChange={(date) => {}}
              dateFormat="dd/MM/yyyy"
              style={{ fontSize: 20 }}
              readOnly
            />
            <label style={{ position: 'absolute', top: 360, left: 500, fontSize: 20, fontWeight: 'bold', color: 'white' }}>Tipo:</label>
            <input
              style={{ position: 'absolute', top: 360, left: 600, fontSize: 20 }}
              value={actividad.tipoActividad}
              readOnly
            />
            <label style={{ position: 'absolute', top: 450, left: 500, fontSize: 20, fontWeight: 'bold', color: 'white' }}>Estado:</label>
            <input
              style={{ position: 'absolute', top: 450, left: 600, fontSize: 20 }}
              value={actividad.estadoActividad}
              readOnly
            />
          </div>
        ) : (
          <p>Cargando información de la actividad...</p>
        )}
        <button className='volverVerActividad' onClick={handleVolver}>Volver</button>
        <button className='comentarActividad'>Comentar Actividad</button>
        <button className='eliminarActividad'  onClick={handleEliminarActividad}>Eliminar Actividad</button>
        <button className='modificarActividad' onClick={handleModificarActividad}>Modificar Actividad</button>
      </div>
    </div>
  );
}

export default VerActividad;