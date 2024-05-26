import React, { useState, useCallback, useEffect } from 'react';
import './EditarPersona.css';

function EditarPersona() {
  const [identificacion, setIdentificacion] = useState('');
  const [persona, setPersona] = useState(null);
  const [error, setError] = useState('');
  const [edicionPersona, setEdicionPersona] = useState({
    nombre: '',
    identificacion: '',
    apellido1: '',
    apellido2: '',
    correo: '',
    contraseña: '',
    celular: '',
    sede: '',
    tipo: ''
  });

  const usuario = JSON.parse(localStorage.getItem('usuario'));

  const obtenerPersona = useCallback(async () => {
    console.log(usuario.sede)
    try {
      const response = await fetch(`/api/personaRoutes/${identificacion}`);
      if (!response.ok) {
        throw new Error('Persona no encontrada');
      }
      const data = await response.json();
      setPersona(data);
      setEdicionPersona(data);
    } catch (error) {
      setError(error.message);
      setPersona(null);
    }
  }, [identificacion]);

  const handleBuscarUsuario = () => {
    obtenerPersona();
  };

  const handleGuardarCambios = async () => {
    try {
      const response = await fetch(`/api/personaRoutes/editar/${identificacion}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(edicionPersona)
      });
      if (!response.ok) {
        throw new Error('Error al guardar los cambios');
      }
      alert('Cambios guardados exitosamente');
      window.location.href = '/MenuPersona'; 
    } catch (error) {
      setError(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEdicionPersona(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleVolver = () => {
    window.history.back();
  };

  return (
    <div>
      <div className='editarPersona'>
        <label className='titulo'>Editar Persona</label>
        <label className='subtitulo'>Identificación de la persona a editar:</label>
        <input
          className='inputIdentificacion'
          value={identificacion}
          onChange={(e) => setIdentificacion(e.target.value)}
        />
        <button className='botonBuscarUsuario' onClick={handleBuscarUsuario}>Buscar Usuario</button>
        <button className='botonVolver' onClick={handleVolver}>Volver</button>
        {error && <p className='error'>{error}</p>}
        {persona && (
          <div className='detallePersona'>
            <label>Nombre:</label>
            <input type='text' name='nombre' value={edicionPersona.nombre} onChange={handleInputChange} />
            <label>Identificación:</label>
            <input type='text' name='identificacion' value={edicionPersona.identificacion} onChange={handleInputChange} />
            <label>Primer Apellido:</label>
            <input type='text' name='apellido1' value={edicionPersona.apellido1} onChange={handleInputChange} />
            <label>Segundo Apellido:</label>
            <input type='text' name='apellido2' value={edicionPersona.apellido2} onChange={handleInputChange} />
            <label>Correo:</label>
            <input type='text' name='correo' value={edicionPersona.correo} onChange={handleInputChange} />
            <label>Celular:</label>
            <input type='text' name='celular' value={edicionPersona.celular} onChange={handleInputChange} />
            <label>Sede:</label>
            <select
              value={edicionPersona.sede} 
              onChange={(e) => setEdicionPersona({...edicionPersona, sede: e.target.value})}>
              <option value='LM'>LM</option>
              <option value='CA'>CA</option>
              <option value='SJ'>SJ</option>
              <option value='AL'>AL</option>
              <option value='SC'>SC</option>
            </select>

            <label>Tipo:</label>
            <select
              value={edicionPersona.tipo} 
              onChange={(e) => setEdicionPersona({...edicionPersona, tipo: e.target.value})}>
              <option value='AD'>Asistente Administrativo</option>
              <option value='PG'>Profesor Guia</option>
              {usuario.sede === 'CA' && <option value='PGC'>Profesor Guia Coordinador</option>}
            </select>
            <button className='botonGuardarCambios' onClick={handleGuardarCambios}>Guardar Cambios</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditarPersona;