import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import './Login.css';

function Login() {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/personaRoutes/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ correo, contraseña })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('usuario', JSON.stringify({
          correo,
          contraseña,
          sede: data.sede,
          tipo: data.tipo,
          nombre: data.nombre,
          apellido1: data.apellido1,
          carne: data.carne,
          foto: data.foto,
          id: data._id, 
        }));
        window.location.href = '/MenuPrincipal';
      } else {
        const data = await response.json();
        alert(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error interno del servidor');
    }
  };

  const handleOlvidarContrasena = () => {
    window.location.href = '/OlvidarContra';
  };

  return (
    <div className="fullscreen-container">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Row>
          <Col>
            <Card className="shadow p-3 mb-5 rounded">
              <Card.Body>
                <Card.Title className="card-title-custom">
                  Login
                </Card.Title>
                <Form>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Correo:</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Ingresa tu correo"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                      className="input-dark"
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword" className="mt-3">
                    <Form.Label>Contraseña:</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Ingresa tu contraseña"
                      value={contraseña}
                      onChange={(e) => setContraseña(e.target.value)}
                      className="input-dark"
                    />
                  </Form.Group>
                  <Button variant="primary" className="mt-4 w-100 btn-custom" onClick={handleLogin}>
                    Ingresar
                  </Button>
                  <Button variant="link" className="mt-2 w-100 text-dark" onClick={handleOlvidarContrasena}>
                    ¿Olvidaste tu contraseña?
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
