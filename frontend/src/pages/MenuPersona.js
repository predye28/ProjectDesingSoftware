import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './MenuPersona.css';

function MenuPersona() {
  const handleVolver = () => {
    window.location.href = '/MenuPrincipal'; 
  };
  const handleRegistrarPersonal = () => {
    window.location.href = '/RegistrarPersonal'; 
  };
  const handleEliminarPersonal = () => {
    window.location.href = '/EliminarPersona'; 
  };
  const handleEditarPersonal = () => {
    window.location.href = '/EditarPersona'; 
  };

  return (
    <Container className="menu-principal-container">
      <Row className="mb-2">
        <Col>
          <h1 className="text-center mb-4 title">Gestionar Personal</h1>
        </Col>
      </Row>
      <Row className="menu-buttons">
        <Col>
          <div className="buttons-container">
            <Button variant="outline-dark" className="menu-button" onClick={handleRegistrarPersonal} block>
              Registrar Personal
            </Button>
            <Button variant="outline-dark" className="menu-button" onClick={handleEliminarPersonal} block>
              Eliminar Personal
            </Button>
            <Button variant="outline-dark" className="menu-button" onClick={handleEditarPersonal} block>
              Editar Personal
            </Button>
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col className="text-center">
          <Button variant="danger" onClick={handleVolver} block>Volver</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default MenuPersona;
