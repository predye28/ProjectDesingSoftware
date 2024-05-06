import React from 'react';
import './OlvidarContra.css';

function OlvidarContra() {


  return (
    <div>
      <div className='olvidarContra'>
        <label className='titulo'>CAMBIAR CONTRASEÑA</label>   
        <label className='usuario'>Usuario:</label>
        <input className='input-usuario' type='text' placeholder='Ingresa tu usuario'></input>
        <label className='codigo-confirmacion'>Codigo de confirmacion:</label>
        <input className='input-codigo-confirmacion' type='text' placeholder='Ingresa tu codigo de confirmacion'></input>
        <label className='contrasenna'>Contraseña nueva:</label>
        <input className='input-contrasenna' type='password' placeholder='Ingresa tu contraseña nueva'></input>
        <button className='boton-enviar-codigo'>Enviar codigo</button>
        <button className='boton-restablecer-contrasenna'>Restablecer Contraseña</button>
      </div>
    </div>
  );
}

export default OlvidarContra;