import React, { useState, useEffect } from 'react';
import './MenuPlanTrabajo.css';

function MenuPlanTrabajo() {
  const [planesTrabajo, setPlanesTrabajo] = useState([]);

  // Obtener el tipo de usuario desde localStorage
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const { tipo } = usuario;

  useEffect(() => {
    fetch('/api/planesTrabajoRoutes')
      .then(response => response.json())
      .then(data => setPlanesTrabajo(data))
      .catch(error => console.error('Error fetching planes de trabajo:', error));
  }, []);

  const handleVolver = () => {
    window.location.href = '/MenuPrincipal';
  };

  const handleCrearPlanTrabajo = () => {
    if (tipo === 'PGC') {
      window.location.href = '/PlanTrabajo';
    } else {
      alert('Solo el Profesor Guia Coordinador puede acceder a este botón.');
    }
  };

  const handleVerPlanTrabajo = (id) => {
    window.location.href = `/VerPlanTrabajo/${id}`;
  };

  return (
    <div>
      <div className='menuPersona'>
        <h1 className='title'> Planes de Trabajo</h1>
        <div className='tablaPlanes'>
          {planesTrabajo.map(plan => (
            <button key={plan._id} onClick={() => handleVerPlanTrabajo(plan._id)}>{plan.nombre}</button>
          ))}
        </div>
        <button className='crearPlan' onClick={handleCrearPlanTrabajo}>Registrar Plan de Trabajo</button>
        <button className='volverMenuPlanTrabajo' onClick={handleVolver}>Volver</button>
      </div>
    </div>
  );
}

export default MenuPlanTrabajo;
