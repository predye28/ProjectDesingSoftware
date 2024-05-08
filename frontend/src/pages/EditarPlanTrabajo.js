import React from 'react';
import './EditarPlanTrabajo.css';


function EditarPlanTrabajo() {

  const handleCrearActividad= () => {

    window.location.href = '/CrearActividad'; 
  };
  const handleVolver= () => {

    window.location.href = '/MenuPlanTrabajo'; 
  };
  return (
    <div>
      <div className='menuPersona'>
        <label className='titulo'>Crear Plan de Trabajo</label>
        <label style = {{position: 'absolute', top: 100, left: 50, fontSize: 20, fontWeight: 'bold', color:'white'}} > Cantidad de Semanas: </label>
        <label style = {{position: 'absolute', top: 200, left: 50, fontSize: 20, fontWeight: 'bold', color:'white'}} > Nombre del Plan de Trabajo: </label>
        <label style = {{position: 'absolute', top: 300, left: 50, fontSize: 20, fontWeight: 'bold', color:'white'}} > Actividades: </label>
        
        <input style = {{position: 'absolute', top: 100, left: 350, fontSize: 20}}  ></input>
        <input style = {{position: 'absolute', top: 200, left: 350, fontSize: 20}}  ></input>

        <div className='tablaActividades'></div>
        
        <button className='crearActividad' onClick={handleCrearActividad}>Crear Actvidad</button>
        <button className='guardarPlan'>Guardar</button>
        <button className='editarPlanTrabajo' onClick={handleVolver}>Volver</button>
      </div>
    </div>
  );
}

export default EditarPlanTrabajo;