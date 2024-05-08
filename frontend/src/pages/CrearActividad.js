import React, { useState } from 'react';
import './CrearActividad.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function CrearActividad() {
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState(null);
  const [tipoActividad, setTipoActividad] = useState('Remota');
  const [estadoActividad, setEstadoActividad] = useState('Planeada');

  const handleVolver = () => {
    // Extraer el ID del plan de trabajo de la URL actual
    const urlParts = window.location.href.split('/');
    const idPlanTrabajo = urlParts[urlParts.length - 1];
    
    // Redirigir al usuario a la página anterior con el ID del plan de trabajo
    window.location.href = `/VerPlanTrabajo/${idPlanTrabajo}`;
  };

  const handleRegistrarActividad = async () => {
    // Validar que todos los campos estén llenos
    if (!nombre || !fecha || !tipoActividad || !estadoActividad) {
      alert('Por favor complete todos los campos.');
      return;
    }

    try {
      // Extraer el ID del plan de trabajo de la URL actual
      const urlParts = window.location.href.split('/');
      const idPlanTrabajo = urlParts[urlParts.length - 1];
      
      // Realizar la solicitud para crear una nueva actividad
      const response = await fetch(`/api/actividadesRoutes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre,
          fecha,
          tipoActividad,
          estadoActividad,
          planTrabajo_id: idPlanTrabajo
        })
      });

      if (!response.ok) {
        throw new Error('Error al registrar la actividad.');
      }

      // Redirigir al usuario a la página de ver plan de trabajo con el ID del plan de trabajo
      window.location.href = `/VerPlanTrabajo/${idPlanTrabajo}`;
    } catch (error) {
      console.error('Error al registrar la actividad:', error);
      // Manejar el error según tu lógica
    }
  };

  return (
    <div>
      <div className='menuPersona'>
        <label className='titulo'>Crear Actividad</label>
        <label style={{ position: 'absolute', top: 180, left: 50, fontSize: 20, fontWeight: 'bold', color: 'white' }}> Nombre: </label>

        <label style={{ position: 'absolute', top: 450, left: 50, fontSize: 20, fontWeight: 'bold', color: 'white' }}> Fecha: </label>

        <label style={{ position: 'absolute', top: 360, left: 500, fontSize: 20, fontWeight: 'bold', color: 'white' }}> Tipo: </label>
        <label style={{ position: 'absolute', top: 450, left: 500, fontSize: 20, fontWeight: 'bold', color: 'white' }}> Estado: </label>

        <input
          style={{ position: 'absolute', top: 180, left: 150, fontSize: 20 }}
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <div className='contenedorDatePicker'>
          <DatePicker
            selected={fecha}
            onChange={(date) => setFecha(date)}
            dateFormat="dd/MM/yyyy"
            style={{ fontSize: 20 }}
          />
        </div>

        <select
          className='selectTipo'
          value={tipoActividad}
          onChange={(e) => setTipoActividad(e.target.value)}
        >
          <option value="Remota">Remota</option>
          <option value="Presencial">Presencial</option>
        </select>

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

        <button className='registrarActividad' onClick={handleRegistrarActividad}>Registrar Actividad</button>
        <button className='volverCrearActividad' onClick={handleVolver}>Volver</button>
      </div>
    </div>
  );
}

export default CrearActividad;

