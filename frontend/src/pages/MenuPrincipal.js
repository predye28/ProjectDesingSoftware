import React from 'react';
import './MenuPrincipal.css';

function MenuPrincipal() {
  // Obtener los datos del usuario desde localStorage
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const { tipo, correo } = usuario;

  const handleSalir = () => {
    window.location.href = '/';
  };

  const navigationHandlers = {
    handleGestionPersonal: () => { window.location.href = '/MenuPersona'; },
    handlePlanTrabajo: () => { window.location.href = '/MenuPlanTrabajo'; },
    handleEquipoTrabajo: () => { window.location.href = '/MenuEquipoTrabajo'; },
    handleEstudiantes: () => { window.location.href = '/Estudiante'; },
    handleConsultas: () => { window.location.href = '/Consultas'; },
  };

  const buttonsConfig = {
    AD: [
      { label: 'Gestionar Personal', onClick: navigationHandlers.handleGestionPersonal, className: 'gestionar-personal' },
      { label: 'Plan de Trabajo', onClick: navigationHandlers.handlePlanTrabajo, className: 'planTrabajo' },
      { label: 'Consultas', onClick: navigationHandlers.handleConsultas, className: 'consultas' },
      { label: 'Equipo de trabajo', onClick: navigationHandlers.handleEquipoTrabajo, className: 'equipoTrabajo' },
      { label: 'Estudiantes', onClick: navigationHandlers.handleEstudiantes, className: 'estudiantes' }
    ],
    PG: [
      { label: 'Plan de Trabajo', onClick: navigationHandlers.handlePlanTrabajo, className: 'planTrabajo' },
      { label: 'Consultas', onClick: navigationHandlers.handleConsultas, className: 'consultas' }
    ],
    PGC: [
      { label: 'Consultas', onClick: navigationHandlers.handleConsultas, className: 'consultas' },
      { label: 'Estudiantes', onClick: navigationHandlers.handleEstudiantes, className: 'estudiantes' },
      { label: 'Plan de Trabajo', onClick: navigationHandlers.handlePlanTrabajo, className: 'planTrabajo' },
    ],
  };

  const buttons = buttonsConfig[tipo] || [];

  return (
    <div>
      <div className='menuPrincipal'>
        <label className='titulo'>Menu</label>
        <p className='usuario-info'>Tipo de usuario: {tipo}</p>
        <p className='usuario-info'>Correo: {correo}</p>

        {buttons.map((button, index) => (
          <button key={index} className={button.className} onClick={button.onClick}>
            {button.label}
          </button>
        ))}

        <button className='salir' onClick={handleSalir}>Salir</button>
      </div>
    </div>
  );
}

export default MenuPrincipal;
