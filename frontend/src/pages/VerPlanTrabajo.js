import React from 'react';
import './VerPlanTrabajo.css';


function VerPlanTrabajo() {


  return (
    <div>
      <div className='menuPersona'>
        <label className='titulo'>Actividades</label>
        <label style = {{position: 'absolute', top: 150, left: 50, fontSize: 20, fontWeight: 'bold', color:'white'}} > *NOMBRE DEL RESPONSABLE DEL PLAN DE TRABAJO* </label>
        <label className='nombrePlan'> *NOMBRE PLAN DE TRABAJO *</label>
        <div className='tablaVerPlan'></div>

        
        <button className='editarPlan'>Editar Plan de Trabajo</button>
        <button className='eliminarPlan'>Eliminar Plan de Trabajo</button>
        
        <button className='volverVerPlanTrabajo'>Volver</button>
      </div>
    </div>
  );
}

export default VerPlanTrabajo;