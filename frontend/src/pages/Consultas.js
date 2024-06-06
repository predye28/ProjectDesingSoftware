import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './Consultas.css';
import axios from 'axios';
import * as XLSX from 'xlsx';


function Consultas() {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const { tipo, correo} = usuario;


  const [nombrePersona, setNombrePersona] = useState('');
  const [año, setAnio] = useState('');
  const [semestre, setSemestre] = useState('');
  const [sede, setSede] = useState('');
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
    window.location.href = `/EditarEstudiante/${equipo.identificacion}`;
    //window.location.href = `/EditarPersona/${equipo.identificacion}`;
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
  fetch(`/api/personaRoutes/${correo}/sede`)
  .then(response => response.json())
  .then(data => {
    setSede(data.sede); // Set the user's sede
   // fetchStudentsBySede(data.sede); // Fetch students once we have the 'sede'
  })
  .catch(error => console.error('Error fetching sede:', error));

}, [correo]);//año, semestre

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
  handleConsultProfesoresClick();
  fetch('/api/personaRoutes/listar_estudiantes')
  .then(response => response.json())
  .then(data => {
    //const estudiantesFiltrados = data.filter(estudiante => (estudiante.tipo === "AD" || estudiante.tipo === "PGC" || estudiante.tipo === "PG"));
    const estudiantesFiltrados = data.filter(estudiante => (estudiante.tipo === "PG" && estudiante.sede === sede));
    estudiantesFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
    setconsultas(estudiantesFiltrados);
    setExcelVisible(true); 
  })
    .catch(error => console.error('Error fetching estudiantes:', error));  
}

const handlePlanes = () =>{
  handleConsultarPlanTrabajoClick();
  fetch('/api/planesTrabajoRoutes')
  .then(response => response.json())
  .then(data => setconsultas(data))//          .then(data => setPlanesTrabajo(data))
  .catch(error => console.error('Error fetching planes de trabajo:', error));
  setExcelVisible(true); 
}

const handleBuscarAlfa = ()=> {
  handleConsultarEstudiantesClick();
    // Hacer una solicitud al servidor para obtener el nombre de la persona asociada con el correo electrónico
  fetch('/api/personaRoutes/listar_estudiantes')
.then(response => response.json())
.then(data => {
  //const estudiantesFiltrados = data.filter(estudiante => estudiante.tipo === "ES");
  const estudiantesFiltrados = data.filter(estudiante => estudiante.tipo === "ES" && estudiante.sede === sede);
  estudiantesFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
  setconsultas(estudiantesFiltrados);
  setExcelVisible(true); 
})
.catch(error => console.error('Error fetching estudiantes:', error));

}


 const handleBuscarESTodos = () => {
  handleConsultarEstudiantesClick();
  fetch('/api/personaRoutes/listar_estudiantes')
  .then(response => response.json())
  .then(data => {
    //const estudiantesFiltrados = data.filter(estudiante => estudiante.tipo === "ES");
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

  const buttonsConfig = {
    AD: [
      //{ label: 'Consultar Plan de Trabajo', onClick: handlePlanes, className: 'consultarPlanTrabajo' },
      { label: 'Consultar Profesores por sede', onClick: handleProfesores, className: 'consultarProfesores' },
      { label: 'Lista de Estudiantes', onClick: handleBuscarAlfa, className: 'listaEstudiantes' }
    ],
    PG: [
      { label: 'Consultar Plan de Trabajo', onClick: handlePlanes, className: 'consultarPlanTrabajo' },
      { label: 'Listar todos los Estudiantes', onClick: handleBuscarESTodos, className: 'listaEstudiantesTodos' },
      { label: 'Lista Estudiantes x Sede', onClick: handleBuscarAlfa, className: 'listaEstudiantes' }
    ],
    PGC: [
      { label: 'Consultar Profesores', onClick: handleProfesores, className: 'consultarProfesores' },
      { label: 'Lista de Estudiantes', onClick: handleBuscarAlfa, className: 'listaEstudiantes' }
    ],
  };

  const buttons = buttonsConfig[tipo] || []

  return (
    <Container className="consultas-container fullscreen-container">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center mb-4 title">Consultas</h1>
        </Col>
      </Row>
      <Row>
        <Col md={3} className="d-flex flex-column align-items-start">
          {buttons.map((button, index) => (
            <Button key={index} variant="outline-dark" className="menu-button mb-3" onClick={button.onClick} block>
              {button.label}
            </Button>
          ))}
          {excelVisible && <Button variant="outline-dark" className="menu-button mb-3" onClick={handleDescargarExcel} block>Descargar Excel</Button>}
          <Button variant="danger" className="volver-button" onClick={handleVolver} block>Volver</Button>
        </Col>
        <Col md={9}>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="scrollable-list-container">
              <ul className="scrollable-list">
                {consultas.length > 0 ? (
                  consultas.map(equipo => (
                    <li key={equipo._id} className="scrollable-list-item pointer-cursor" onClick={() => handleEditar(equipo)}>{equipo.nombre}</li>
                  ))
                ) : (
                  <li className="scrollable-list-item">No hay datos</li>
                )}
              </ul>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Consultas;