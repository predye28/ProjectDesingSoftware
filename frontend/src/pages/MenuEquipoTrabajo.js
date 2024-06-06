import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './MenuEquipoTrabajo.css';

function MenuEquipoTrabajo() {

  const handleVolver = () => {
    window.location.href = '/MenuPrincipal'; 
  };

  const handleRegistrarEquipo = () => {
    window.location.href = '/EquipoTrabajo'; 
  };

  const handleEditarEquipo = () => {
    window.location.href = '/BuscarEditarEquipo'; 
  };

  return (
    <Container className="menu-equipo-container fullscreen-container d-flex flex-column align-items-center justify-content-center">
      <h1 className="text-center mb-4 title">Menú Equipo de Trabajo</h1>
      <div className="menu-box">
        <Button variant="outline-dark" className="menu-button mb-3" onClick={handleRegistrarEquipo} block>
          Registrar Equipo de Trabajo
        </Button>
        <Button variant="outline-dark" className="menu-button mb-3" onClick={handleEditarEquipo} block>
          Editar Equipo de Trabajo(NO es necesario implementar)
        </Button>
      </div>
      <Row className="mt-4">
        <Col className="text-center">
          <Button variant="danger" onClick={handleVolver} block>Volver</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default MenuEquipoTrabajo;
