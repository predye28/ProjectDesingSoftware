
import React from 'react';
import './Estudiante.css';


function Estudiante() {


  const handleVolver= () => {

    window.location.href = '/MenuPrincipal'; 
  };
  return (
    <div>
      <div className='editarPersona'>
        <label className='tituloPersona'>Persona en linea</label>
        <label style = {{position: 'absolute', top: 100, left: 50, fontSize: 25, fontWeight: 'bold', color: "white" }}> Ordenar: </label>
        <label style = {{position: 'absolute', top: 200, left: 50, fontSize: 25, fontWeight: 'bold', color: "white" }}> Estudiante: </label>

        <button className='ordenAlfa' >Orden Alfabetico</button>
        <button className='carnet' >Carnet</button>
        <button  className='registrarEstudiante' >Registrar Informacion</button>
        <button  className='volverEstudiante' onClick={handleVolver}>Volver</button>

        <select className='selectCampus'>
            <option value="">Selecciona un Campus</option>
            <option value="opcion1">Opción 1</option>
            <option value="opcion2">Opción 2</option>
            <option value="opcion3">Opción 3</option>
        </select>
        
        <div className='tabla'></div>
        
        <label style = {{position: 'absolute', top: 200, left: 950, fontSize: 20, fontWeight: 'bold', color: "white" }}> Cargar un archivo de estudiantes: </label>

        <div  style = {{position: 'absolute', top: 250, left: 950, fontSize: 20, fontWeight: 'bold', color:'black'}}>
          <input type="file" ></input>
        </div>


      </div>
    </div>
  );

}

export default Estudiante;