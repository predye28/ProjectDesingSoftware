import React, { useState,useEffect } from 'react';
import './EliminarPersona.css';

function EliminarPersona() {
  const [identificacion, setIdentificacion] = useState('');
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
    <div>
      <div className='eliminarPersona'>
        <label className='titulo'>Persona en línea: {nombrePersona}</label>
        <label style={{ position: 'absolute', top: 150, left: 50, fontSize: 20, fontWeight: 'bold', color: 'white' }}>Identificación de la persona a eliminar:</label>
        <input
          style={{ position: 'absolute', top: 150, left: 400, fontSize: 20 }}
          value={identificacion}
          onChange={(e) => setIdentificacion(e.target.value)}
        />
        <button className='eliminar' onClick={handleEliminar}>Eliminar</button>
        <button className='volverEliminar' onClick={handleVolver}>Volver</button>
      </div>
    </div>
  );
}

export default EliminarPersona;
