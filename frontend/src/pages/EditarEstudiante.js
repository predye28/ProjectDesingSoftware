import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import './EditarEstudiante.css';

function EditarEstudiante() {
  const { id } = useParams();
  const [identificacion, setIdentificacion] = useState(id || '');
  const [persona, setPersona] = useState(null);
  const [error, setError] = useState('');
  const [edicionPersona, setEdicionPersona] = useState({
    nombre: '',
    identificacion: '',
    apellido1: '',
    apellido2: '',
    correo: '',
    contraseña: '',
    celular: '',
    sede: '',
    tipo: ''
  });

  const obtenerPersona = useCallback(async () => {
    try {
      const response = await fetch(`/api/personaRoutes/${identificacion}`);
      if (!response.ok) {
        throw new Error('Persona no encontrada');
      }
      const data = await response.json();
      setPersona(data);
      setEdicionPersona(data);
    } catch (error) {
      setError(error.message);
      setPersona(null);
    }
  }, [identificacion]);

  const handleBuscarUsuario = () => {
    obtenerPersona();
  };

  const handleGuardarCambios = async () => {
    try {
      const response = await fetch(`/api/personaRoutes/editar/${identificacion}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(edicionPersona)
      });
      if (!response.ok) {
        throw new Error('Error al guardar los cambios');
      }
      alert('Cambios guardados exitosamente');
      window.location.href = '/Estudiante'; 
    } catch (error) {
      setError(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEdicionPersona(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleVolver = () => {
    window.history.back();
  };

  useEffect(() => {
    if (id) {
      obtenerPersona();
    }
  }, [id, obtenerPersona]);

  return (
    <Container className="editar-estudiante-container">
      <h2 className="title">Editar Estudiante</h2>
      <Form>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4" className="subtitulo">
            Identificación de la persona a editar:
          </Form.Label>
          <Col sm="6">
            <Form.Control
              type="text"
              value={identificacion}
              onChange={(e) => setIdentificacion(e.target.value)}
              placeholder={id}
            />
          </Col>
          <Col sm="2">
            <Button variant="primary" onClick={handleBuscarUsuario}>Buscar Usuario</Button>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col sm="12">
            <Button variant="secondary" onClick={handleVolver}>Volver</Button>
          </Col>
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
        {persona && (
          <div className="detalle-persona">
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">Nombre:</Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  name="nombre"
                  value={edicionPersona.nombre}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">Identificación:</Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  name="identificacion"
                  value={edicionPersona.identificacion}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">Primer Apellido:</Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  name="apellido1"
                  value={edicionPersona.apellido1}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">Segundo Apellido:</Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  name="apellido2"
                  value={edicionPersona.apellido2}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">Correo:</Form.Label>
              <Col sm="10">
                <Form.Control
                  type="email"
                  name="correo"
                  value={edicionPersona.correo}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">Celular:</Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  name="celular"
                  value={edicionPersona.celular}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">Sede:</Form.Label>
              <Col sm="10">
                <Form.Control
                  as="select"
                  name="sede"
                  value={edicionPersona.sede}
                  onChange={(e) => setEdicionPersona({ ...edicionPersona, sede: e.target.value })}
                >
                  <option value="LM">Limon</option>
                  <option value="CA">Cartago</option>
                  <option value="SJ">San Jose</option>
                  <option value="AL">Alajuela</option>
                  <option value="SC">San Carlos</option>
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">Tipo:</Form.Label>
              <Col sm="10">
                <Form.Control
                  as="select"
                  name="tipo"
                  value={edicionPersona.tipo}
                  onChange={(e) => setEdicionPersona({ ...edicionPersona, tipo: e.target.value })}
                >
                  <option value="AD">Asistente Administrativo</option>
                  <option value="PG">Profesor Guia</option>
                  <option value="PGC">Profesor Guia Coordinador</option>
                  <option value="ES">Estudiante</option>
                </Form.Control>
              </Col>
            </Form.Group>
            <Button variant="success" onClick={handleGuardarCambios}>Guardar Cambios</Button>
          </div>
        )}
      </Form>
    </Container>
  );
}

export default EditarEstudiante;
