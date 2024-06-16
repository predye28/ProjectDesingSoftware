import React, { useState } from 'react';
import './OlvidarContra.css';
import axios from 'axios';


function OlvidarContra() {
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [codigoUsuario, setCodigoUsuario] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [code, setCode] = useState("");

  
  const handleEnviarCodigo = async () => {
    try {
      const code = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
      setCodigo(code);

      const response = await axios.post('/api/personaRoutes/enviar_correo', { email, codigo: code });
 
      console.log('Email sent successfully');
      alert(`Codigo enviado a ${email}`);
    } catch (error) {
      console.error('Failed to send email', error);
    }
  };
/*
  const handleRestablecer = async () => {
  try{
    if (codigoUsuario === codigo) {
      // Call API to update the password with newPassword
      const response = await axios.put(`/api/personaRoutes/editarContra/${email}`, { newPassword });
      console.log("Updating password with new value:", newPassword);
      alert('La contraseña ha sido cambiada');
      window.location.href = '/';
    } 
    else if(newPassword === '')
      {
        alert('Debe ingresar contraseña');
      }
    else {
      alert('Codigo incorrecto!');
      window.location.href = '/';
    }
  };
  */

  const handleRestablecer = async () => {
    try {

        if (codigoUsuario === codigo) {
          const response = await axios.put(`/api/personaRoutes/editarContra/${email}`, { newPassword });
          console.log(response.data.message); // Assuming the API returns a message upon success
          alert('La contraseña ha sido cambiada');
          window.location.href = '/';

      } else if(newPassword === '')
        {
          alert('Debe ingresar contraseña');
        }
      else {
        alert('Codigo incorrecto!');
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Failed to update password', error);
      alert('Error al restablecer la contraseña');
    }
  };

  return (
    <div>
      <div className='olvidarContra'>
        <label className='titulo'>CAMBIAR CONTRASEÑA</label>   
        <label className='usuario'>Correo:</label>
        <input className='input-usuario' type='text' placeholder='Ingresa tu correo' value={email} onChange={(e) => setEmail(e.target.value)}></input>
        <label className='codigo-confirmacion'>Codigo de confirmacion:</label>
        <input className='input-codigo-confirmacion' type='text' placeholder='Ingresa tu codigo de confirmacion' value={codigoUsuario} onChange={(e) => setCodigoUsuario(e.target.value)}></input>
        <label className='contrasenna'>Contraseña nueva:</label>
        <input className='input-contrasenna' type='password' placeholder='Ingresa tu contraseña nueva' value={newPassword} onChange={(e) => setNewPassword(e.target.value)}></input>
        <button className='boton-enviar-codigo' onClick={handleEnviarCodigo}>Enviar codigo</button>
        <button className='boton-restablecer-contrasenna' onClick={handleRestablecer}>Restablecer Contraseña</button>
      </div>
    </div>
  );
}

export default OlvidarContra;
