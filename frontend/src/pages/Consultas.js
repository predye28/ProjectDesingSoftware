import React, { useState, useEffect } from 'react';
import './Consultas.css';
import axios from 'axios';
import * as XLSX from 'xlsx';


function Consultas() {
  const [año, setAnio] = useState('');
  const [semestre, setSemestre] = useState('');
  const [consultas, setconsultas] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [consultarPlanTrabajoClicked, setConsultarPlanTrabajoClicked] = useState(false);
  const [consultarProfesoresClicked, setConsultarProfesoresClicked] = useState(false);
  const [consultarEstudiantesClicked, setConsultarEstudiantesClicked] = useState(false);
  const [planesTrabajo, setPlanesTrabajo] = useState([]); 
  const [excelVisible, setExcelVisible] = useState(false); 
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
  /*
  //fetchconsultas();
  if(consultarPlanTrabajoClicked){
        fetch('/api/planesTrabajoRoutes')
          .then(response => response.json())
          .then(data => setconsultas(data))//          .then(data => setPlanesTrabajo(data))
          .catch(error => console.error('Error fetching planes de trabajo:', error));
    }
  else if(consultarProfesoresClicked){
    fetch('/api/personaRoutes/listar_estudiantes')
  .then(response => response.json())
  .then(data => {
    const estudiantesFiltrados = data.filter(estudiante => (estudiante.tipo === "AD" || estudiante.tipo === "PGC" || estudiante.tipo === "PG"));
    estudiantesFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
    setconsultas(estudiantesFiltrados);
  })
  .catch(error => console.error('Error fetching estudiantes:', error));  
  }
  else if(consultarEstudiantesClicked){
    fetch('/api/personaRoutes/listar_estudiantes')
  .then(response => response.json())
  .then(data => {
    const estudiantesFiltrados = data.filter(estudiante => estudiante.tipo === "ES");
    estudiantesFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
    setconsultas(estudiantesFiltrados);
  })
  .catch(error => console.error('Error fetching estudiantes:', error));
  }
  */
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

const handleProfesores = () => {
  fetch('/api/personaRoutes/listar_estudiantes')
  .then(response => response.json())
  .then(data => {
    const estudiantesFiltrados = data.filter(estudiante => (estudiante.tipo === "AD" || estudiante.tipo === "PGC" || estudiante.tipo === "PG"));
    estudiantesFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
    setconsultas(estudiantesFiltrados);
    setExcelVisible(true); 
  })
    .catch(error => console.error('Error fetching estudiantes:', error));  
}

const handlePlanes = () =>{
  fetch('/api/planesTrabajoRoutes')
  .then(response => response.json())
  .then(data => setconsultas(data))//          .then(data => setPlanesTrabajo(data))
  .catch(error => console.error('Error fetching planes de trabajo:', error));
  setExcelVisible(true); 
}

const handleBuscarAlfa = ()=> {
  fetch('/api/personaRoutes/listar_estudiantes')
.then(response => response.json())
.then(data => {
  const estudiantesFiltrados = data.filter(estudiante => estudiante.tipo === "ES");
  estudiantesFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
  setconsultas(estudiantesFiltrados);
  setExcelVisible(true); 
})
.catch(error => console.error('Error fetching estudiantes:', error));

}


const handleDescargarExcel = () =>{
  const wb = XLSX.utils.book_new();
  wb.Props = {
    Title: "Consultas",
    Subject: "Consultas Info",
    Author: "Equipo Guia Primer Ingreso",
    CreatedDate: new Date()
  };

  const ws = XLSX.utils.json_to_sheet(consultas);
  XLSX.utils.book_append_sheet(wb, ws, "Consultas");

  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

  const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  const url = URL.createObjectURL(data);
  const link = document.createElement("a");
  link.href = url;
  link.download = "consultas.xlsx";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

  return (
    <div>
      <div className='menuPersona'>
        <label className='titulo'>Consultas</label>
        <label style = {{position: 'absolute', top: 150, left: 30, fontSize: 20, fontWeight: 'bold', color:'white'}} > </label>{/* Seleccione el año que desea consultar: \n Seleccione el periodo\n*/}
        <label style = {{position: 'absolute', top: 250, left: 30, fontSize: 20, fontWeight: 'bold', color:'white'}} > </label>
        

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
  {/* 
        <select className='selectAño' onChange={handleAnioChange}>
            <option value="">_</option>
           
            <option value="2024">2024</option>
            <option value="2025">2025</option>
        
        </select>    
        */
          }
 {/* 
        <select className='selectPeriodo' onChange={handleSemestreChange}>
            <option value="">_</option>
           
            <option value="1">Semestre 1</option>
            <option value="2">Semestre 2</option>
          
        </select>  */
          }
        
        <button className='listaEstudiantes' onClick={handleBuscarAlfa}>Lista de estudiantes</button>
        <button className='consultarProfesores' onClick={handleProfesores}>Consultar Profesores</button>
        <button className='consultarPlanTrabajo' onClick={handlePlanes}>Consultar Plan de Trabajo</button>
        {excelVisible && <button className='descargarExcel' onClick={handleDescargarExcel}>Descargar Excel</button>}
        <button className='volverConsultas' onClick={handleVolver}> Volver</button>
      </div>
    </div>
  );
}

export default Consultas;