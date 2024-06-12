import React, { useState, useEffect } from 'react';
import './MenuActividades.css';

function MenuActividades() {
  const [actividades, setActividades] = useState([]);

  // Obtener el tipo de usuario desde localStorage
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const { tipo } = usuario;

  useEffect(() => {
    fetch('/api/actividadesRoutes/listar_actividades')
      .then(response => response.json())
      .then(data => setActividades(data))
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

  const handleVerActividad = (id) => {
//    window.location.href = `/VerPlanTrabajo/${id}`;
    window.location.href = `/VerActividad/${id}`;
  };
//window.location.href = `/VerActividad/${idActividad}`;
  return (
    <div>
      <div className='menuPersona'>
        <h1 className='title'> Actividades</h1>
        <div className='tablaPlanes'>
          {actividades.map(actividad => (
            <button key={actividad._id} onClick={() => handleVerActividad(actividad._id)}>{actividad.nombre}</button>
          ))}
        </div>
        <button className='crearPlan' onClick={handleCrearPlanTrabajo}>Registrar Plan de Trabajo</button>
        <button className='volverMenuPlanTrabajo' onClick={handleVolver}>Volver</button>
      </div>
    </div>
  );
}

export default MenuActividades;
