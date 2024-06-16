import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

const CambiarFecha = () => {
  const [nuevaFecha, setNuevaFecha] = useState('');

  const handleFechaChange = (e) => {
    setNuevaFecha(e.target.value);
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/fechaSistemaRoutes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fecha: nuevaFecha })
      });
      
      if (!response.ok) {
        console.log(nuevaFecha)
        throw new Error('Error al cambiar la fecha del sistema');
      }

      alert('Fecha del sistema cambiada exitosamente');
    } catch (error) {
      console.error('Error al cambiar la fecha del sistema:', error);
      alert('Hubo un error al cambiar la fecha del sistema');
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFechaSistema">
              <Form.Label>Cambiar Fecha del Sistema</Form.Label>
              <Form.Control type="datetime-local" value={nuevaFecha} onChange={handleFechaChange} required />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-2">Cambiar Fecha</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CambiarFecha;
