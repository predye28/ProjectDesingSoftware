import React, { useState, useEffect } from 'react';
import './MenuPlanTrabajo.css';

function MenuPlanTrabajo() {
  const [planesTrabajo, setPlanesTrabajo] = useState([]);

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
    window.location.href = '/PlanTrabajo'; 
  };

  const handleVerPlanTrabajo = (id) => {
    window.location.href = `/VerPlanTrabajo/${id}`;
  };

  return (
    <div>
      <div className='menuPersona'>
        <label className='titulo'>Menu Plan de Trabajo</label>
        <label style={{ position: 'absolute', top: 100, left: 50, fontSize: 20, fontWeight: 'bold', color: 'white' }}> Planes de Trabajo </label>
        <div className='tablaPlanes'>
          {planesTrabajo.map(plan => (
            <button key={plan._id} onClick={() => handleVerPlanTrabajo(plan._id)}>{plan.nombre}</button>
          ))}
        </div>
        <button className='crearPlan' onClick={handleCrearPlanTrabajo}>Crear Plan de Trabajo</button>
        <button className='volverMenuPlanTrabajo' onClick={handleVolver}>Volver</button>
      </div>
    </div>
  );
}

export default MenuPlanTrabajo;
