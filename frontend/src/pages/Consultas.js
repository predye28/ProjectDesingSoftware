import React, { useState, useEffect } from 'react';
import './Consultas.css';
import axios from 'axios';


function Consultas() {
  const [año, setAnio] = useState('');
  const [semestre, setSemestre] = useState('');
  const [consultas, setconsultas] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [consultarPlanTrabajoClicked, setConsultarPlanTrabajoClicked] = useState(false);
  const [consultarProfesoresClicked, setConsultarProfesoresClicked] = useState(false);
  const [consultarEstudiantesClicked, setConsultarEstudiantesClicked] = useState(false);
  const [planesTrabajo, setPlanesTrabajo] = useState([]); 
  const handleAnioChange = (e) => {
  if (e.target.value !== "") {
    setAnio(e.target.value);
  }
};

const handleSemestreChange = (e) => {
  if (e.target.value !== "") {
    setSemestre(e.target.value);
  }
};

const handleEditar = (equipo) => {
  if(consultarPlanTrabajoClicked){
   window.location.href = `/VerPlanTrabajo/${equipo._id}`;
  }
  else if(consultarProfesoresClicked){
    window.location.href = `/EditarPersona/${equipo._id}`;
  }
  else if(consultarEstudiantesClicked){
    window.location.href = `/EditarPersona/${equipo.identificacion}`;
  }
};

const handleVolver = () => {
  window.location.href = '/MenuPrincipal'; 
};

useEffect(() => {
  //fetchconsultas();
  if(consultarPlanTrabajoClicked){
        fetch('/api/planesTrabajoRoutes')
          .then(response => response.json())
          .then(data => setconsultas(data))//          .then(data => setPlanesTrabajo(data))
          .catch(error => console.error('Error fetching planes de trabajo:', error));
    }
  else if(consultarProfesoresClicked){
    fetch('/api/personaRoutes/profesores')
    .then(response => response.json())
    .then(data => setconsultas(data))//          .then(data => setPlanesTrabajo(data))
    .catch(error => console.error('Error fetching planes de trabajo:', error));    
  }
  else if(consultarEstudiantesClicked){
    fetch('/api/personaRoutes/listar_estudiantes')
    .then(response => response.json())
    .then(data => setconsultas(data))//          .then(data => setPlanesTrabajo(data))
    .catch(error => console.error('Error fetching planes de trabajo:', error));    
  }
}, [año, semestre, consultarPlanTrabajoClicked]);//año, semestre

const handleConsultarPlanTrabajoClick = () => {
  setConsultarPlanTrabajoClicked(true);
  setConsultarProfesoresClicked(false);
  setConsultarEstudiantesClicked(false);

};

const handleConsultProfesoresClick = () =>{
  setConsultarProfesoresClicked(true);
  setConsultarPlanTrabajoClicked(false);
  setConsultarEstudiantesClicked(false);
};

const handleConsultarEstudiantesClick = () => {
  setConsultarEstudiantesClicked(true);
  setConsultarProfesoresClicked(false);
  setConsultarPlanTrabajoClicked(false);
}

  return (
    <div>
      <div className='menuPersona'>
        <label className='titulo'>Consultas</label>
        <label style = {{position: 'absolute', top: 150, left: 30, fontSize: 20, fontWeight: 'bold', color:'white'}} > Seleccione el año que desea consultar: </label>
        <label style = {{position: 'absolute', top: 250, left: 30, fontSize: 20, fontWeight: 'bold', color:'white'}} > Seleccione el periodo: </label>
        

        {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='scrollable-list-container'>
          <ul className='scrollable-list'>
            {consultas.length > 0 ? (
              consultas.map(equipo => (
                <li key={equipo._id} className='scrollable-list-item pointer-cursor' onClick={() => handleEditar(equipo)}>{equipo.nombre}</li>
              ))
            ) : (
              <li className='scrollable-list-item'></li>
            )}
          </ul>
        </div>
      )}

        <select className='selectAño' onChange={handleAnioChange}>
            <option value="">Selecciona un año</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>

        </select>

        <select className='selectPeriodo' onChange={handleSemestreChange}>
            <option value="">Seleccionar Semestre</option>
            <option value="1">Semestre 1</option>
            <option value="2">Semestre 2</option>
        </select>
        
        <button className='listaEstudiantes' onClick={handleConsultarEstudiantesClick}>Lista de estudiantes</button>
        <button className='consultarProfesores' onClick={handleConsultProfesoresClick}>Consultar Profesores</button>
        <button className='consultarPlanTrabajo' onClick={handleConsultarPlanTrabajoClick}>Consultar Plan de Trabajo</button>
        <button className='volverConsultas' onClick={handleVolver}> Volver</button>
      </div>
    </div>
  );
}

export default Consultas;