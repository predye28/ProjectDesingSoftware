import React from 'react';
import './MenuEquipoTrabajo.css';


function MenuEquipoTrabajo() {

  const handleVolver= () => {

    window.location.href = '/MenuPrincipal'; 
  };
  const handleRegistrarEquipo = () => {

    window.location.href = '/EquipoTrabajo'; 
  };
  const handleEditarEquipo = () => {

    window.location.href = '/BuscarEditarEquipo'; 
  };
  return (
    <div>
      <div className='menuEquipoTrabajo'>
        <label className='titulo'>Menu Equipo de Trabajo</label>
        <button className='registrar-equipo' onClick={handleRegistrarEquipo}>Registrar Equipo de trabajo</button>
        <button className='editar-equipo' onClick={handleEditarEquipo}>Editar Equipo de trabajo</button>
        <button className='volverMenuEquipo' onClick={handleVolver}>Volver</button>
      </div>
    </div>
  );
}

export default MenuEquipoTrabajo;