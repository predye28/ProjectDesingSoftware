import React, { useState, useEffect } from 'react';
import './Estudiante.css';
import * as XLSX from 'xlsx';

function Estudiante() {

  const [estudiantes, setestudiantes] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [campus, setCampus] = useState('');
  const [consultarEstudiantesClicked, setConsultarEstudiantesClicked] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
 

  const handleBuscarCampus = ()=> {
    if(campus != ''){
      fetch('/api/personaRoutes/listar_estudiantes')
      .then(response => response.json())
      .then(data => {
        const estudiantesFiltrados = data.filter(estudiante => estudiante.tipo === "ES");
        const estudiantesPorSede = estudiantesFiltrados.filter(estudiante => estudiante.sede === campus);
        estudiantesPorSede.sort((a, b) => a.nombre.localeCompare(b.nombre));
        setestudiantes(estudiantesPorSede);
      })
      .catch(error => console.error('Error fetching estudiantes:', error));    
}
  
  }


  const handleBuscarAlfa = ()=> {
    /*
    fetch('/api/personaRoutes/listar_estudiantes')
    .then(response => response.json())
    .then(data => setestudiantes(data))//          .then(data => setPlanesTrabajo(data))
    .catch(error => console.error('Error fetching planes de trabajo:', error));    
  */
 /*
    fetch('/api/personaRoutes/listar_estudiantes')
    .then(response => response.json())
    .then(data => {
      const estudiantesFiltrados = data.filter(estudiante => estudiante.tipo === "ES");
      setestudiantes(estudiantesFiltrados);
    })
    .catch(error => console.error('Error fetching estudiantes:', error));*/
    fetch('/api/personaRoutes/listar_estudiantes')
  .then(response => response.json())
  .then(data => {
    const estudiantesFiltrados = data.filter(estudiante => estudiante.tipo === "ES");
    estudiantesFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
    setestudiantes(estudiantesFiltrados);
  })
  .catch(error => console.error('Error fetching estudiantes:', error));
  
  }

  const handleEditar = (estudiante) => {
      window.location.href = `/EditarEstudiante/${estudiante.identificacion}`;
  };

  const handleVolver= () => {

    window.location.href = '/MenuPrincipal'; 
  };

  const handleFileUpload= (e) =>{
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      setestudiantes(jsonData);
      // Iterate over each student in jsonData and perform a POST request
      jsonData.forEach(async (student) => {
        try {
          const response = await fetch('/api/personaRoutes/registro', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
          });
          if (!response.ok) {
            throw new Error('Error registering student');
          }
          console.log('Student registered successfully:', student);
        } catch (error) {
          console.error('Error registering student:', error);
        }
      });
      setUploadMessage('Archivo de estudiantes cargado!');
    };
    
    reader.readAsArrayBuffer(file);
  }
/*
  const handleRegistrar = (jsonData) => {
    jsonData.forEach(async (student) => {
      try {
        const response = await fetch('/api/personaRoutes/registro', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(student)
        });
        if (!response.ok) {
          throw new Error('Error registering student');
        }
        console.log('Student registered successfully:', student);
      } catch (error) {
        console.error('Error registering student:', error);
      }
    });
  };
  }*/


  return (
    <div>
      <div className='editarPersona'>
        <label className='tituloPersona'>Estudiantes</label>
        <label style = {{position: 'absolute', top: 100, left: 50, fontSize: 25, fontWeight: 'bold', color: "white" }}> Ordenar: </label>
        <label style = {{position: 'absolute', top: 200, left: 50, fontSize: 25, fontWeight: 'bold', color: "white" }}> Estudiante: </label>

        <button className='ordenAlfa' onClick={handleBuscarAlfa}>Orden Alfabetico</button>
        <button className='carnet' onClick={handleBuscarCampus}>Por Campus</button>
       {/* <button  className='registrarEstudiante' >Registrar Informacion</button>*/}
        <button  className='volverEstudiante' onClick={handleVolver}>Volver</button>

        <select className='selectCampus' onChange={(e) => setCampus(e.target.value)}>
            <option value="" >Selecciona un Campus</option>
            <option value="CA">Cartago</option>
            <option value="LM">Limon</option>
            <option value="AL">Alajuela</option>
            <option value="SJ">San Jose</option>
            <option value="SC">San Carlos</option>
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
          <input type="file" onChange={handleFileUpload}></input>
        </div>
        <div style={{ position: 'absolute', top: 300, left: 950, fontSize: 20, fontWeight: 'bold', color: 'black' }}>
          {uploadMessage && <p>{uploadMessage}</p>}
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