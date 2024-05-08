import React from 'react';
import './ConsultaPlanTrabajo.css';


function ConsultaPlanTrabajo() {


  return (
    <div>
      <div className='menuPersona'>
        <label className='titulo'>Consulta Plan de Trabajo</label>
        <label style = {{position: 'absolute', top: 100, left: 50, fontSize: 20, fontWeight: 'bold', color:'white'}} > Plan de Trabajo: </label>
        <label style = {{position: 'absolute', top: 100, left: 250, fontSize: 20, fontWeight: 'bold', color:'white'}} > "Aqui va el nombre" </label>
        <label style = {{position: 'absolute', top: 150, left: 50, fontSize: 20, fontWeight: 'bold', color:'white'}} > Nombre del responsable: </label>
        <label style = {{position: 'absolute', top: 150, left: 300, fontSize: 20, fontWeight: 'bold', color:'white'}} > "Aqui va el nombre" </label>
        <div className='tablaConsultaPlanes'></div>

        <button className='volverConsultaPlanTrabajo'>Volver</button>
      </div>
    </div>
  );
}

export default ConsultaPlanTrabajo;