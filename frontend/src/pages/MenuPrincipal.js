import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './MenuPrincipal.css';
import CambiarFecha from '../components/CambiarFecha';

function MenuPrincipal() {
  // Obtener los datos del usuario desde localStorage
  const [persona, setPersona] = useState(null);
  const [mostrarCambiarFecha, setMostrarCambiarFecha] = useState(false);

  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const { tipo, nombre, sede, carne, foto, identificacion } = usuario;

  const handleSalir = () => {
    window.location.href = '/';
  };

  const toggleCambiarFecha = () => {
    setMostrarCambiarFecha(!mostrarCambiarFecha);
  };

  useEffect(() => {
    const obtenerPersona = async () => {
      try {
        const response = await fetch(`/api/estudianteRoutes/${carne}`);
        if (!response.ok) {
          throw new Error('Persona no encontrada');
        }
        const data = await response.json();
        setPersona(data);
      } catch (error) {
        console.error('Error:', error);
        setPersona(null);
      }
    };

    if (usuario.tipo === 'ES') {
      obtenerPersona();
    }
  }, [usuario.tipo]);

  const navigationHandlers = {
    handleGestionPersonal: () => { window.location.href = '/MenuPersona'; },
    handlePlanTrabajo: () => { window.location.href = '/MenuPlanTrabajo'; },
    handleEquipoTrabajo: () => { window.location.href = '/MenuEquipoTrabajo'; },
    handleEstudiantes: () => { window.location.href = '/Estudiante'; },
    handleConsultas: () => { window.location.href = '/Consultas'; },
    handleEditarPerfil: () => { window.location.href = `/EditarEstudiante/${carne}`; },
    handleVerActividades: () => { window.location.href = `/MenuActividades`; },
    handleVerBuzon: () => { window.location.href = `/Buzon/${persona._id}`; },
  };

  const buttonsConfig = {
    AD: [
      { label: 'Gestionar Personal', onClick: navigationHandlers.handleGestionPersonal },
      { label: 'Plan de Trabajo', onClick: navigationHandlers.handlePlanTrabajo },
      { label: 'Consultas', onClick: navigationHandlers.handleConsultas },
      { label: 'Equipo de trabajo', onClick: navigationHandlers.handleEquipoTrabajo },
      { label: 'Estudiantes', onClick: navigationHandlers.handleEstudiantes }
    ],
    PG: [
      { label: 'Plan de Trabajo', onClick: navigationHandlers.handlePlanTrabajo },
      { label: 'Consultas', onClick: navigationHandlers.handleConsultas }
    ],
    PGC: [
      { label: 'Consultas', onClick: navigationHandlers.handleConsultas },
      { label: 'Estudiantes', onClick: navigationHandlers.handleEstudiantes },
      { label: 'Plan de Trabajo', onClick: navigationHandlers.handlePlanTrabajo },
    ],
    ES: [
      { label: 'Editar Perfil', onClick: navigationHandlers.handleEditarPerfil },
      { label: 'Ver Actividades', onClick: navigationHandlers.handleVerActividades }, 
      { label: 'Ver Buzón', onClick: navigationHandlers.handleVerBuzon }
    ],
  };

  const buttons = buttonsConfig[tipo] || [];

  // Función para traducir los tipos de usuario
  const getTipoUsuarioDescriptivo = (tipo) => {
    switch (tipo) {
      case 'AD':
        return 'Administrador de proyectos';
      case 'PG':
        return 'Profesor Guía';
      case 'PGC':
        return 'Profesor Guía Coordinador';
      case 'ES':
        return 'Estudiante';
      default:
        return 'Usuario';
    }
  };

  const tipoUsuarioDescriptivo = getTipoUsuarioDescriptivo(tipo);

  const getSedeDescriptiva = (sede) => {
    switch (sede) {
      case 'CA':
        return 'Cartago';
      case 'SJ':
        return 'San José';
      case 'LI':
        return 'Limón';
      case 'AL':
        return 'Alajuela';
      case 'SC':
        return 'San Carlos';
      default:
        return sede;
    }
  };

  const sedeDescriptiva = getSedeDescriptiva(sede);

  return (
    <Container className="menu-principal-container">
      <Row className="mb-2">
        <Col>
          <h1 className="text-center mb-4 title">Menú</h1>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <div className="usuario-info-container">
            {tipo === 'ES' && persona && persona.foto && (
              <div className="foto-container text-center mb-4">
                <img src={`data:image/jpeg;base64,${persona.foto}`} alt="Foto del usuario" className="foto-usuario" />
              </div>
            )}
            <p className='nombre-usuario'>Nombre: {nombre}</p>
            <p className='tipo-usuario'>Tipo de usuario: {tipoUsuarioDescriptivo}</p>
            <p className='tipo-usuario'>Sede: {sedeDescriptiva}</p>
          </div>
        </Col>
      </Row>
      <Row className="menu-buttons">
        <Col>
          <div className="buttons-container">
            {buttons.map((button, index) => (
              <Button key={index} variant="outline-dark" className="menu-button" onClick={button.onClick} block>
                {button.label}
              </Button>
            ))}
          </div>
        </Col>
      </Row>
      {tipo === 'AD' && (
        <Row className="mb-4">
          <Col className="text-center">
            <Button variant="info" onClick={toggleCambiarFecha} block>
              {mostrarCambiarFecha ? 'Ocultar Cambiar Fecha' : 'Cambiar Fecha del Sistema'}
            </Button>
          </Col>
        </Row>
      )}
      {mostrarCambiarFecha && (
        <Row className="mb-4">
          <Col>
            <CambiarFecha />
          </Col>
        </Row>
      )}
      <Row className="mt-4">
        <Col className="text-center">
          <Button variant="danger" onClick={handleSalir} block>Salir</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default MenuPrincipal;
