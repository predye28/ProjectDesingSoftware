import React, { useState, useEffect } from 'react';
import './MenuPersona.css';

function MenuPersona() {
  const [nombrePersona, setNombrePersona] = useState('');

  useEffect(() => {
    // Obtener el correo electrónico de la persona del localStorage
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const correo = usuario ? usuario.correo : '';

    // Hacer una solicitud al servidor para obtener el nombre de la persona asociada con el correo electrónico
    fetch(`/api/personaRoutes/${correo}/nombre`)
      .then(response => response.json())
      .then(data => {
        setNombrePersona(data.nombre);
      })
      .catch(error => console.error('Error:', error));
  }, []);

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
    <div>
      <div className='menuPersona'>
        <label className='titulo'>Persona en línea: {nombrePersona}</label>
        <button className='registrar-personal' onClick={handleRegistrarPersonal}>Registrar Personal</button>
        <button className='eliminar-personal' onClick={handleEliminarPersonal}>Eliminar Personal</button>
        <button className='editar-personal' onClick={handleEditarPersonal}>Editar Personal</button>
        <button className='volver' onClick={handleVolver}>Volver</button>
      </div>
    </div>
  );
}

export default MenuPersona;