import React from 'react';
import './PlanTrabajo.css';


function PlanTrabajo() {


  return (
    <div>
      <div className='menuPersona'>
        <label className='titulo'>Plan de Trabajo</label>
        <label style = {{position: 'absolute', top: 150, left: 50, fontSize: 20, fontWeight: 'bold', color:'white'}} > Cantidad de Semanas: </label>
        <label style = {{position: 'absolute', top: 250, left: 50, fontSize: 20, fontWeight: 'bold', color:'white'}} > Nombre del Plan de Trabajo: </label>
        
        <input style = {{position: 'absolute', top: 150, left: 350, fontSize: 20}}  ></input>
        <input style = {{position: 'absolute', top: 250, left: 350, fontSize: 20}}  ></input>
        
        <button className='registrarPlan'>Registrar</button>
        <button className='volverPlanTrabajo'>Volver</button>
      </div>
    </div>
  );
}

export default PlanTrabajo;