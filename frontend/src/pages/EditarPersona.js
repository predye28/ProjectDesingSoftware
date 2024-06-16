import React, { useState, useCallback, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './EditarPersona.css';

function EditarPersona() {
  const [identificacion, setIdentificacion] = useState('');
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

  const usuario = JSON.parse(localStorage.getItem('usuario'));

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
      window.location.href = '/MenuPersona'; 
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

  return (
    <Container className="editar-persona-container">
      <Row className="mb-2">
        <Col>
          <h1 className="text-center mb-4 title">Editar Persona</h1>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form className="form-container">
            <Form.Group controlId="formIdentificacion">
              <Form.Label>Identificación de la persona a editar:</Form.Label>
              <Form.Control
                type="text"
                value={identificacion}
                onChange={(e) => setIdentificacion(e.target.value)}
              />
            </Form.Group>
            <Button variant="outline-dark" onClick={handleBuscarUsuario}>
              Buscar Usuario
            </Button>
            <Button variant="danger" className="ml-3" onClick={handleVolver}>
              Volver
            </Button>
            {error && <p className='error'>{error}</p>}
          </Form>
        </Col>
        <Col md={6}>
          {persona && (
            <div className='detallePersona'>
              <Form.Group controlId="formNombre">
                <Form.Label>Nombre:</Form.Label>
                <Form.Control
                  type='text'
                  name='nombre'
                  value={edicionPersona.nombre}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formIdentificacionEditable">
                <Form.Label>Identificación:</Form.Label>
                <Form.Control
                  type='text'
                  name='identificacion'
                  value={edicionPersona.identificacion}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formApellido1">
                <Form.Label>Primer Apellido:</Form.Label>
                <Form.Control
                  type='text'
                  name='apellido1'
                  value={edicionPersona.apellido1}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formApellido2">
                <Form.Label>Segundo Apellido:</Form.Label>
                <Form.Control
                  type='text'
                  name='apellido2'
                  value={edicionPersona.apellido2}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formCorreo">
                <Form.Label>Correo:</Form.Label>
                <Form.Control
                  type='text'
                  name='correo'
                  value={edicionPersona.correo}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formCelular">
                <Form.Label>Celular:</Form.Label>
                <Form.Control
                  type='text'
                  name='celular'
                  value={edicionPersona.celular}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formSede">
                <Form.Label>Sede:</Form.Label>
                <Form.Control
                  as="select"
                  value={edicionPersona.sede}
                  onChange={(e) => setEdicionPersona({ ...edicionPersona, sede: e.target.value })}
                >
                  <option value='LM'>LM</option>
                  <option value='CA'>CA</option>
                  <option value='SJ'>SJ</option>
                  <option value='AL'>AL</option>
                  <option value='SC'>SC</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formTipo">
                <Form.Label>Tipo:</Form.Label>
                <Form.Control
                  as="select"
                  value={edicionPersona.tipo}
                  onChange={(e) => setEdicionPersona({ ...edicionPersona, tipo: e.target.value })}
                >
                  <option value='AD'>Asistente Administrativo</option>
                  <option value='PG'>Profesor Guia</option>
                  {usuario.sede === 'CA' && <option value='PGC'>Profesor Guia Coordinador</option>}
                </Form.Control>
              </Form.Group>
              <Button variant="outline-dark" onClick={handleGuardarCambios}>
                Guardar Cambios
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default EditarPersona;
