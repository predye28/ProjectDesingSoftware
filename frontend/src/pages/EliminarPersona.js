import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './EliminarPersona.css';

function EliminarPersona() {
  const [identificacion, setIdentificacion] = useState('');

  const handleEliminar = async () => {
    try {
      const response = await fetch(`/api/personaRoutes/eliminar/${identificacion}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        alert('Persona eliminada exitosamente');
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

  const handleVolver = () => {
    window.location.href = '/MenuPersona'; 
  };

  return (
    <Container className="eliminar-persona-container">
      <Row className="mb-2">
        <Col>
          <h1 className="text-center mb-4 title">Eliminar Persona</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6}>
          <Form className="form-container" onSubmit={(e) => { e.preventDefault(); handleEliminar(); }}>
            <Form.Group controlId="formIdentificacion">
              <Form.Label>Identificación de la persona a eliminar:</Form.Label>
              <Form.Control
                type="text"
                value={identificacion}
                onChange={(e) => setIdentificacion(e.target.value)}
              />
            </Form.Group>
            <div className="button-group">
              <Button variant="outline-dark" type="submit">
                Eliminar
              </Button>
              <Button variant="danger" className="ml-3" onClick={handleVolver}>
                Volver
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default EliminarPersona;
