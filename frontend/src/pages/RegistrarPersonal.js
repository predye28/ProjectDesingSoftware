import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './RegistrarPersonal.css';

function RegistrarPersonal() {
  const [identificacion, setIdentificacion] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido1, setApellido1] = useState('');
  const [apellido2, setApellido2] = useState('');
  const [celular, setCelular] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [sede, setSede] = useState('LM');
  const [tipo, setTipo] = useState('');

  const handleVolver = () => {
    window.location.href = '/MenuPersona';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!identificacion.trim() || !nombre.trim() || !apellido1.trim() || !apellido2.trim() || !celular.trim() || !correo.trim() || !contraseña.trim() || !sede.trim() || !tipo.trim()) {
      alert('Por favor complete todos los campos');
      return;
    }

    const data = {
      identificacion,
      nombre,
      apellido1,
      apellido2,
      celular,
      correo,
      contraseña,
      sede,
      tipo
    };

    try {
      const response = await fetch('/api/personaRoutes/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert('Persona registrada exitosamente');
        window.location.href = '/MenuPersona';
      } else {
        const responseData = await response.json();
        alert(responseData.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error interno del servidor');
    }
  };

  return (
    <Container className="registrar-personal-container">
      <Row className="mb-2">
        <Col>
          <h1 className="text-center mb-4 title">Registrar Personal</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8}>
          <Form className="form-container" onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formIdentificacion">
                  <Form.Label>Identificación:</Form.Label>
                  <Form.Control type="text" value={identificacion} onChange={(e) => setIdentificacion(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formNombre">
                  <Form.Label>Nombre:</Form.Label>
                  <Form.Control type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formApellido1">
                  <Form.Label>Primer apellido:</Form.Label>
                  <Form.Control type="text" value={apellido1} onChange={(e) => setApellido1(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formApellido2">
                  <Form.Label>Segundo apellido:</Form.Label>
                  <Form.Control type="text" value={apellido2} onChange={(e) => setApellido2(e.target.value)} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formCelular">
                  <Form.Label>Celular:</Form.Label>
                  <Form.Control type="text" value={celular} onChange={(e) => setCelular(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formCorreo">
                  <Form.Label>Correo:</Form.Label>
                  <Form.Control type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formContraseña">
                  <Form.Label>Contraseña:</Form.Label>
                  <Form.Control type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formSede">
                  <Form.Label>Sede:</Form.Label>
                  <Form.Control as="select" value={sede} onChange={(e) => setSede(e.target.value)}>
                    <option value='LM'>LM</option>
                    <option value='CA'>CA</option>
                    <option value='SJ'>SJ</option>
                    <option value='AL'>AL</option>
                    <option value='SC'>SC</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formTipo">
                  <Form.Label>Tipo:</Form.Label>
                  <Form.Control as="select" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                    <option value='AD'>Asistente Administrativo</option>
                    <option value='PG'>Profesor Guía</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formArchivo">
                  <Form.Label>Adjuntar archivo:</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="outline-dark" type="submit" className="mt-3">
              Guardar
            </Button>
            <Button variant="danger" type="button" className="mt-3 ml-3" onClick={handleVolver}>
              Volver
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default RegistrarPersonal;
