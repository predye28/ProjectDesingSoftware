import React, { useState } from 'react';
import './EditarPersona.css';

function EditarPersona() {
  const [identificacion, setIdentificacion] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido1, setApellido1] = useState('');
  const [apellido2, setApellido2] = useState('');
  const [celular, setCelular] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [numeroOficina, setNumeroOficina] = useState('');
  const [sede, setSede] = useState('');
  const [tipo, setTipo] = useState('');



  const handleVolver = () => {
    window.history.back();
  };

  return (
    <div>
      <div className='registrarPersonal'>
        <label className='titulo'>Editar Personal</label>

        <form >
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

export default EditarPersona;