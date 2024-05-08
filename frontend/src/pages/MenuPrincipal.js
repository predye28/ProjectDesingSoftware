import React from 'react';
import './MenuPrincipal.css';

function MenuPrincipal() {

  const handleSalir = () => {

    window.location.href = '/'; 
  };
  const handleGestionPersonal = () => {

    window.location.href = '/MenuPersona'; 
  };
  const handlePlanTrabajo = () => {

    window.location.href = '/MenuPlanTrabajo'; 
  };
  const handleEquipoTrabajo = () => {

    window.location.href = '/MenuEquipoTrabajo'; 
  };
  const handleEstudiantes = () => {

    window.location.href = '/Estudiante'; 
  };
  const handleConsultas = () => {

    window.location.href = '/'; 
  };
  return (
    <div>
      <div className='menuPrincipal'>
        <label className='titulo'>Menu</label>
        <button className='gestionar-personal' onClick={handleGestionPersonal}>Gestionar Personal</button>
        <button className='planTrabajo' onClick={handlePlanTrabajo}>Plan de Trabajo</button>
        <button className='equipoTrabajo' onClick={handleEquipoTrabajo}>Equipo de trabajo</button>
        <button className='estudiantes' onClick={handleEstudiantes}>Estudiantes</button>
        <button className='consultas' onClick={handleConsultas}>Consultas</button>
        <button className='salir' onClick={handleSalir}>Salir</button>
      </div>
    </div>
  );
}

export default MenuPrincipal;