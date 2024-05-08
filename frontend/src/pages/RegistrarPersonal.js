import React, { useState, useEffect } from 'react';
import './RegistrarPersonal.css';

function RegistrarPersonal() {
  const [nombrePersona, setNombrePersona] = useState('');
  const [identificacion, setIdentificacion] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido1, setApellido1] = useState('');
  const [apellido2, setApellido2] = useState('');
  const [celular, setCelular] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [numeroOficina, setNumeroOficina] = useState('');
  const [sede, setSede] = useState('LM');
  const [tipo, setTipo] = useState('');

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
    window.location.href = '/MenuPersona'; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(sede)
    console.log(tipo)
    // Verificar si algún campo está vacío o contiene solo espacios en blanco
    if (!identificacion.trim() || !nombre.trim() || !apellido1.trim() || !apellido2.trim() || !celular.trim() || !correo.trim() || !contraseña.trim() || !numeroOficina.trim() || !sede.trim() || !tipo.trim()) {
      alert('Por favor complete todos los campos');
      return;
    }
    console.log("adsdad")
    const data = {
      identificacion,
      nombre,
      apellido1,
      apellido2,
      celular,
      correo,
      contraseña, 
      numeroOficina,
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
        // Redirigir a la página de menú de persona después de registrar
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
    <div>
      <div className='registrarPersonal'>
        <label className='titulo'>Persona en línea: {nombrePersona}</label>

        <form onSubmit={handleSubmit}>
          <label>Identificación:</label>
          <input type='text' value={identificacion} onChange={(e) => setIdentificacion(e.target.value)} />

          <label>Nombre:</label>
          <input type='text' value={nombre} onChange={(e) => setNombre(e.target.value)} />

          <label>Primer apellido:</label>
          <input type='text' value={apellido1} onChange={(e) => setApellido1(e.target.value)} />

          <label>Segundo apellido:</label>
          <input type='text' value={apellido2} onChange={(e) => setApellido2(e.target.value)} />

          <label>Celular:</label>
          <input type='text' value={celular} onChange={(e) => setCelular(e.target.value)} />

          <label>Correo:</label>
          <input type='email' value={correo} onChange={(e) => setCorreo(e.target.value)} />

          <label>Contraseña:</label>
          <input type='password' value={contraseña} onChange={(e) => setContraseña(e.target.value)} />

          <label>Número de oficina:</label>
          <input type='text' value={numeroOficina} onChange={(e) => setNumeroOficina(e.target.value)} />

          <label>Sede:</label>
          <select value={sede} onChange={(e) => setSede(e.target.value)}>
            <option value='LM'>LM</option>
            <option value='CA'>CA</option>
            <option value='SJ'>SJ</option>
            <option value='AL'>AL</option>
            <option value='SC'>SC</option>
          </select>

          <label>Tipo:</label>
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value='AD'>Asistente Administrativo</option>
            <option value='PG'>Profesor Guia</option>
            <option value='PGC'>Profesor Guia Cordinador</option>

          </select>

          <label>Adjuntar archivo:</label>
          <input type='file' />

          <button type='submit' className='buscarRegis'>Guardar</button>
          <button type='button' className='volverRegis' onClick={handleVolver}>Volver</button>
        </form>
      </div>
    </div>
  );
}

export default RegistrarPersonal;

