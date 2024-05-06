import React from 'react';
import './MenuEquipoTrabajo.css';


function MenuEquipoTrabajo() {

  const handleVolver= () => {

    window.location.href = '/MenuPrincipal'; 
  };
  return (
    <div>
      <div className='menuEquipoTrabajo'>
        <label className='titulo'>Menu Equipo de Trabajo</label>
        <button className='registrar-equipo'>Registrar Personal</button>
        <button className='editar-equipo'>Editar Personal</button>
        <button className='volverMenuEquipo' onClick={handleVolver}>Volver</button>
      </div>
    </div>
  );
}

export default MenuEquipoTrabajo;