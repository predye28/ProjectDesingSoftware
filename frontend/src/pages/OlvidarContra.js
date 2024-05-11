import React, { useState } from 'react';
import './OlvidarContra.css';
import axios from 'axios';


function OlvidarContra() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const handleEnviarCodigo = async () => {
    try {
        const response = await axios.post('/api/personaRoutes/enviar_correo', { email });
        // Handle success, maybe show a message to the user
        console.log('Email sent successfully');
    } catch (error) {
        // Handle error, maybe show an error message to the user
        console.error('Failed to send email', error);
    }
};
  

  return (
    <div>
      <div className='olvidarContra'>
        <label className='titulo'>CAMBIAR CONTRASEÑA</label>   
        <label className='usuario'>Correo:</label>
        <input className='input-usuario' type='text' placeholder='Ingresa tu correo' value={email}
                                onChange={(e) => setEmail(e.target.value)}></input>
        <label className='codigo-confirmacion'>Codigo de confirmacion:</label>
        <input className='input-codigo-confirmacion' type='text' placeholder='Ingresa tu codigo de confirmacion'></input>
        <label className='contrasenna'>Contraseña nueva:</label>
        <input className='input-contrasenna' type='password' placeholder='Ingresa tu contraseña nueva'></input>
        <button className='boton-enviar-codigo' onClick={handleEnviarCodigo}>Enviar codigo</button>
        <button className='boton-restablecer-contrasenna'>Restablecer Contraseña</button>
      </div>
    </div>
  );
}

export default OlvidarContra;