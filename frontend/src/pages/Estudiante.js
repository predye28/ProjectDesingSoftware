import React, { useState, useEffect } from 'react';
import './Estudiante.css';


function Estudiante() {

  const [estudiantes, setestudiantes] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [campus, setCampus] = useState('');
  const [consultarEstudiantesClicked, setConsultarEstudiantesClicked] = useState(false);

  const handleBuscarAlfa = ()=> {
    fetch('/api/personaRoutes/listar_estudiantes')
    .then(response => response.json())
    .then(data => setestudiantes(data))//          .then(data => setPlanesTrabajo(data))
    .catch(error => console.error('Error fetching planes de trabajo:', error));    
  }

  const handleEditar = (estudiante) => {
      window.location.href = `/EditarPersona/${estudiante.identificacion}`;
  };

  const handleVolver= () => {

    window.location.href = '/MenuPrincipal'; 
  };
  return (
    <div>
      <div className='editarPersona'>
        <label className='tituloPersona'>Persona en linea</label>
        <label style = {{position: 'absolute', top: 100, left: 50, fontSize: 25, fontWeight: 'bold', color: "white" }}> Ordenar: </label>
        <label style = {{position: 'absolute', top: 200, left: 50, fontSize: 25, fontWeight: 'bold', color: "white" }}> Estudiante: </label>

        <button className='ordenAlfa' onClick={handleBuscarAlfa}>Orden Alfabetico</button>
        <button className='carnet' >Carnet</button>
        <button  className='registrarEstudiante' >Registrar Informacion</button>
        <button  className='volverEstudiante' onClick={handleVolver}>Volver</button>

        <select className='selectCampus'>
            <option value="">Selecciona un Campus</option>
            <option value="opcion1">Cartago</option>
            <option value="opcion2">Limon</option>
            <option value="opcion3">Alajuela</option>
            <option value="opcion3">San Jose</option>
        </select>
        
        {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='scrollable-list-container'>
          <ul className='scrollable-list'>
            {estudiantes.length > 0 ? (
              estudiantes.map(equipo => (
                <li key={equipo._id} className='scrollable-list-item pointer-cursor' onClick={() => handleEditar(equipo)}>{equipo.nombre}</li>
              ))
            ) : (
              <li className='scrollable-list-item'></li>
            )}
          </ul>
        </div>
      )}

        
        <label style = {{position: 'absolute', top: 200, left: 950, fontSize: 20, fontWeight: 'bold', color: "white" }}> Cargar un archivo de estudiantes: </label>

        <div  style = {{position: 'absolute', top: 250, left: 950, fontSize: 20, fontWeight: 'bold', color:'black'}}>
          <input type="file" ></input>
        </div>


      </div>
    </div>
  );

}

export default Estudiante;

/**
<div className='tabla'></div>
        

antes de label style 


 */