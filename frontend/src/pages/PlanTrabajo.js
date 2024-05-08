import React, { useState, useEffect } from 'react';
import './PlanTrabajo.css';

function PlanTrabajo() {
  const [nombre, setNombre] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  useEffect(() => {
    // Obtener el correo del usuario del localStorage
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const { correo } = usuario;

    // Buscar el ID del usuario en el backend
    const fetchUsuarioId = async () => {
      try {
        const response = await fetch(`/api/personaRoutes/${correo}/id`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Error al obtener el ID del usuario');
        }
        const data = await response.json();
        setResponsable(data.id);
      } catch (error) {
        console.error('Error al obtener el ID del usuario:', error);
        // Manejar el error según tu lógica
      }
    };

    fetchUsuarioId();
  }, []);

  const [responsable, setResponsable] = useState('');

  const handleVolver = () => {
    window.location.href = '/MenuPlanTrabajo';
  };

  const handleRegistrar = async () => {
    try {
      const responsePlanTrabajo = await fetch('/api/planesTrabajoRoutes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre,
          fechaInicio,
          fechaFin,
          responsable
        })
      });
      if (responsePlanTrabajo.ok) {
        // Plan de trabajo creado exitosamente
        window.location.href = '/MenuPlanTrabajo';
      } else {
        const errorData = await responsePlanTrabajo.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error('Error al registrar el plan de trabajo:', error);
      alert('Error al registrar el plan de trabajo');
    }
  };

  return (
    <div>
      <div className='menuPersona'>
        <label className='titulo'>Plan de Trabajo</label>
        <label style={{ position: 'absolute', top: 150, left: 50, fontSize: 20, fontWeight: 'bold', color: 'white' }}> Nombre del Plan de Trabajo: </label>
        <label style={{ position: 'absolute', top: 250, left: 50, fontSize: 20, fontWeight: 'bold', color: 'white' }}> Fecha de Inicio: </label>
        <label style={{ position: 'absolute', top: 350, left: 50, fontSize: 20, fontWeight: 'bold', color: 'white' }}> Fecha de Fin: </label>

        <input style={{ position: 'absolute', top: 150, left: 350, fontSize: 20 }} value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <input style={{ position: 'absolute', top: 250, left: 350, fontSize: 20 }} type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
        <input style={{ position: 'absolute', top: 350, left: 350, fontSize: 20 }} type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />

        <button className='registrarPlan' onClick={handleRegistrar}>Registrar</button>
        <button className='volverPlanTrabajo' onClick={handleVolver}>Volver</button>
      </div>
    </div>
  );
}

export default PlanTrabajo;

