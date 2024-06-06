import React, { useState, useEffect, useCallback } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import './EquipoTrabajo.css';

function EquipoTrabajo() {
  const [nombreEquipo, setNombreEquipo] = useState('');
  const [sedes] = useState(['SJ', 'CA', 'SC', 'LM', 'AL']);
  const [profesoresPorSede, setProfesoresPorSede] = useState({});
  const [profesoresCoordinadores, setProfesoresCoordinadores] = useState([]);
  const [años, setAños] = useState([]);
  const [semestre, setSemestre] = useState('');
  const [profesoresSeleccionados, setProfesoresSeleccionados] = useState({});
  const [añoSeleccionado, setAñoSeleccionado] = useState('');

  const cargarDatosIniciales = useCallback(async () => {
    try {
      const profesores = {};
      for (const sede of sedes) {
        const response = await fetch(`/api/personaRoutes/profesores/${sede}`);
        if (!response.ok) {
          throw new Error('Error al obtener profesores');
        }
        const data = await response.json();
        profesores[sede] = data;
      }
      setProfesoresPorSede(profesores);

      const responseCoordinadores = await fetch(`/api/personaRoutes/profesoresPGC/PGC`);
      if (!responseCoordinadores.ok) {
        throw new Error('Error al obtener profesores coordinadores');
      }
      const dataCoordinadores = await responseCoordinadores.json();
      setProfesoresCoordinadores(dataCoordinadores);

      cargarAños();
    } catch (error) {
      console.error('Error:', error);
    }
  }, [sedes]);

  const cargarAños = () => {
    const añoActual = new Date().getFullYear();
    const añosDisponibles = [añoActual, añoActual + 1];
    setAños(añosDisponibles);
  };

  useEffect(() => {
    cargarDatosIniciales();
  }, [cargarDatosIniciales]);

  const handleAñoSeleccionado = (e) => {
    setAñoSeleccionado(e.target.value);
  };

  const handleVolver = () => {
    window.location.href = '/MenuEquipoTrabajo';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const integrantesIds = Object.values(profesoresSeleccionados);
    const liderId = integrantesIds.shift();

    const equipoData = {
      nombre: nombreEquipo,
      integrantes: integrantesIds,
      lider_id: liderId,
      año: añoSeleccionado,
      semestre: semestre
    };

    try {
      const response = await fetch('/api/personaRoutes/equipoTrabajo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(equipoData)
      });

      if (!response.ok) {
        throw new Error('Error al registrar equipo de trabajo');
      }

      const data = await response.json();
      alert(data.message);

      window.location.href = '/MenuEquipoTrabajo';
    } catch (error) {
      alert('Error:', error);
    }
  };

  const handleProfesorSeleccionado = (sede, profesorId) => {
    setProfesoresSeleccionados({
      ...profesoresSeleccionados,
      [sede]: profesorId
    });
  };

  return (
    <Container className='equipo-trabajo-container'>
      <h2 className='title'>Registrar Equipo de Trabajo</h2>
      <div className='form-container'>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Nombre equipo de trabajo:</Form.Label>
            <Form.Control
              type='text'
              value={nombreEquipo}
              onChange={(e) => setNombreEquipo(e.target.value)}
              required
            />
          </Form.Group>

          {sedes.map((sede) => (
            <Form.Group key={sede}>
              <Form.Label>{`Profesor ${sede}:`}</Form.Label>
              <Form.Control
                as='select'
                value={profesoresSeleccionados[sede] || ''}
                onChange={(e) => handleProfesorSeleccionado(sede, e.target.value)}
                required
              >
                <option value=''>Selecciona un profesor</option>
                {profesoresPorSede[sede] && profesoresPorSede[sede].map((profesor) => (
                  <option key={profesor._id} value={profesor._id}>{profesor.nombre}</option>
                ))}
              </Form.Control>
            </Form.Group>
          ))}

          <Form.Group>
            <Form.Label>Profesor Coordinador:</Form.Label>
            <Form.Control
              as='select'
              value={profesoresSeleccionados['coordinador'] || ''}
              onChange={(e) => handleProfesorSeleccionado('coordinador', e.target.value)}
              required
            >
              <option value=''>Selecciona un profesor coordinador</option>
              {profesoresCoordinadores.map((profesor) => (
                <option key={profesor._id} value={profesor._id}>{profesor.nombre}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Año:</Form.Label>
                <Form.Control
                  as='select'
                  value={añoSeleccionado}
                  onChange={handleAñoSeleccionado}
                  required
                >
                  <option value=''>Selecciona un año</option>
                  {años.map((año) => (
                    <option key={año} value={año}>{año}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Semestre:</Form.Label>
                <Form.Control
                  as='select'
                  value={semestre}
                  onChange={(e) => setSemestre(e.target.value)}
                  required
                >
                  <option value=''>Selecciona un semestre</option>
                  <option value='1'>Primer Semestre</option>
                  <option value='2'>Segundo Semestre</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </div>
      <div className='botones-container'>
        <Button variant="outline-dark" className='registrarEquipo' onClick={handleSubmit}>Registrar Equipo</Button>
        <Button variant='danger' className='volverEquipo' onClick={handleVolver}>Volver</Button>
      </div>
    </Container>
  );
}

export default EquipoTrabajo;
