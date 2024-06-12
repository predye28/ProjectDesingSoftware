import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Spinner, ListGroup, Alert } from 'react-bootstrap';
import * as XLSX from 'xlsx';
import './Estudiante.css';

function Estudiante() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [campus, setCampus] = useState('');
  const [consultarEstudiantesClicked, setConsultarEstudiantesClicked] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');

  const handleBuscarCampus = () => {
    if (campus !== '') {
      setLoading(true);
      fetch('/api/estudianteRoutes/listar_estudiantes')
        .then((response) => response.json())
        .then((data) => {
          const estudiantesPorSede = data.filter((estudiante) => estudiante.sede === campus);
          estudiantesPorSede.sort((a, b) => a.nombre.localeCompare(b.nombre));
          setEstudiantes(estudiantesPorSede);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching estudiantes:', error);
          setLoading(false);
        });
    }
  };
  

  const handleBuscarAlfa = () => {
    setLoading(true);
    fetch('/api/estudianteRoutes/listar_estudiantes')
      .then((response) => response.json())
      .then((data) => {
        data.sort((a, b) => a.nombre.localeCompare(b.nombre));
        setEstudiantes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error obteniendo estudiantes:', error);
        setLoading(false);
      });
  };
  

  const handleEditar = (estudiante) => {
    window.location.href = `/EditarEstudiante/${estudiante.identificacion}`;
  };

  const handleVolver = () => {
    window.location.href = '/MenuPrincipal';
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      setEstudiantes(jsonData);

      jsonData.forEach(async (student) => {
        // Convert carne and celular to strings
        student.carne = student.carne.toString();
        student.celular = student.celular.toString();

        try {
          const response = await fetch('/api/estudianteRoutes/registro', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(student),
          });
          if (!response.ok) {
            throw new Error('Error registering student');
          }
          console.log('Student registered successfully:', student);
        } catch (error) {
          console.error('Error registering student:', error);
          setUploadMessage(JSON.stringify(student));
        }
      });
    };

    reader.readAsArrayBuffer(file);
};


  return (
    <Container className="estudiante-container">
      <h2 className="title">Estudiantes</h2>
      <div className="form-container">
        <Form>
          <Form.Group>
            <Form.Label>Ordenar:</Form.Label>
            <div className="d-flex justify-content-around">
              <Button variant="primary" onClick={handleBuscarAlfa}>
                Orden Alfabético
              </Button>
              <Button variant="secondary" onClick={handleBuscarCampus}>
                Por Campus
              </Button>
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Label>Selecciona un Campus:</Form.Label>
            <Form.Control as="select" value={campus} onChange={(e) => setCampus(e.target.value)} required>
              <option value="">Selecciona un Campus</option>
              <option value="CA">Cartago</option>
              <option value="LM">Limon</option>
              <option value="AL">Alajuela</option>
              <option value="SJ">San Jose</option>
              <option value="SC">San Carlos</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </div>

      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
<div className="list-container">
  <ListGroup className="scrollable-list">
    {estudiantes.length > 0 ? (
      estudiantes.map((estudiante) => {
        const sedeMap = {
          SJ: "San Jose",
          CA: "Cartago",
          LM: "Limon",
          AL: "Alajuela",
          SC: "San Carlos",
        };
        const sedeFullName = sedeMap[estudiante.sede] || estudiante.sede;

        return (
          <ListGroup.Item
            key={estudiante._id}
            className="pointer-cursor"
            onClick={() => handleEditar(estudiante)}
          >
            <div><strong>Nombre:</strong> {estudiante.nombre}</div>
            <div><strong>Carne:</strong> {estudiante.carne}</div>
            <div><strong>Primer apellido:</strong> {estudiante.apellido1}</div>
            <div><strong>Segundo apellido:</strong> {estudiante.apellido2}</div>
            <div><strong>Correo:</strong> {estudiante.correo}</div>
            <div><strong>Celular:</strong> {estudiante.celular}</div>
            <div><strong>Sede:</strong> {sedeFullName}</div>
          </ListGroup.Item>
        );
      })
    ) : (
      <ListGroup.Item>No hay estudiantes</ListGroup.Item>
    )}
  </ListGroup>
</div>
)}

      <div className="upload-container">
        <Form.Group>
          <Form.Label>Cargar un archivo de estudiantes:</Form.Label>
          <Form.Control type="file" onChange={handleFileUpload} />
        </Form.Group>
        {uploadMessage && <Alert variant="success">{uploadMessage}</Alert>}
      </div>
      
      <div className="botones-container">
        <Button variant="secondary" onClick={handleVolver}>
          Volver
        </Button>
      </div>
    </Container>
  );
}

export default Estudiante;
