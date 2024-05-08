import React from 'react';
import './Consultas.css';


function Consultas() {


  return (
    <div>
      <div className='menuPersona'>
        <label className='titulo'>Consultas</label>
        <label style = {{position: 'absolute', top: 150, left: 30, fontSize: 20, fontWeight: 'bold', color:'white'}} > Seleccione el año que desea consultar: </label>
        <label style = {{position: 'absolute', top: 250, left: 30, fontSize: 20, fontWeight: 'bold', color:'white'}} > Seleccione el periodo: </label>
        
        <div className='tablaConsultas'></div>
        

        <select className='selectAño'>
            <option value="">Selecciona una opción</option>
            <option value="opcion1">Opción 1</option>
            <option value="opcion2">Opción 2</option>
            <option value="opcion3">Opción 3</option>
        </select>

        <select className='selectPeriodo'>
            <option value="">Selecciona una opción</option>
            <option value="opcion1">Opción 1</option>
            <option value="opcion2">Opción 2</option>
            <option value="opcion3">Opción 3</option>
        </select>
        
        <button className='listaEstudiantes'>Lista de estudiantes</button>
        <button className='consultarProfesores'>Consultar Profesores</button>
        <button className='consultarPlanTrabajo'>Consultar Plan de Trabajo</button>
        <button className='volverConsultas'>Volver</button>
      </div>
    </div>
  );
}

export default Consultas;