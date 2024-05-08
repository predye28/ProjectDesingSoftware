import React from 'react';
import './ConsultaEstudiante.css';


function ConsultaEstudiante() {


  return (
    <div>
      <div className='menuPersona'>
        <label className='titulo'>Consulta Estudiantes</label>
        <label style = {{position: 'absolute', top: 130, left: 30, fontSize: 20, fontWeight: 'bold', color:'white'}} > Seleccione el año que desea consultar: </label>
        <label style = {{position: 'absolute', top: 230, left: 30, fontSize: 20, fontWeight: 'bold', color:'white'}} > Seleccione el periodo: </label>
        <label style = {{position: 'absolute', top: 330, left: 30, fontSize: 20, fontWeight: 'bold', color:'white'}} > Seleccione el campus: </label>
        
        <div className='tablaConsultaEstudiantes'></div>
        

        <select className='selectAñoEstudiante'>
            <option value="">Selecciona una opción</option>
            <option value="opcion1">Opción 1</option>
            <option value="opcion2">Opción 2</option>
            <option value="opcion3">Opción 3</option>
        </select>

        <select className='selectPeriodoEstudiante'>
            <option value="">Selecciona una opción</option>
            <option value="opcion1">Opción 1</option>
            <option value="opcion2">Opción 2</option>
            <option value="opcion3">Opción 3</option>
        </select>

        <select className='selectCampusEstudiante'>
            <option value="">Selecciona una opción</option>
            <option value="opcion1">Opción 1</option>
            <option value="opcion2">Opción 2</option>
            <option value="opcion3">Opción 3</option>
        </select>
        
        <button className='consultarEstudiante'>Consultar Estudiante</button>
        <button className='generarExcel'>Generar Excel</button>
        <button className='volverConsultaEstudiante'>Volver</button>
      </div>
    </div>
  );
}

export default ConsultaEstudiante;