import React, { useState } from 'react';
import './Login.css';
import usuario from '../img/usuario.png';




function Login() {

  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/personaRoutes/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ correo, contraseña })
      });

      if (response.ok) {
        // Guardar la información del usuario en el localStorage
        localStorage.setItem('usuario', JSON.stringify({ correo, contraseña }));

        // Redirigir a la página de menú si la autenticación fue exitosa
        window.location.href = '/MenuPrincipal'; // Cambia la ruta según tu configuración
      } else {
        const data = await response.json();
        alert(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error interno del servidor');
    }
  };
  const handleOlvidarContrasena = () => {

    window.location.href = '/OlvidarContra'; 
  };
  return (
    <div>
      <div className='login'>
        <label className='titulo'>EQUIPO GUIA DE PRIMER INGRESO</label>
        <img src={usuario} alt='Usuario' className='imagen-usuario' />
        <label className='usuarioLabel'>Correo: omar@gmail.com</label>
        <input
          className='inputUsuarioLogin'
          type='text'
          placeholder='Ingresa tu usuario'
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <label className='contrasennaLabel'>Contraseña: 12345678</label>
        <input
          className='inputContrasennaLogin'
          type='password'
          placeholder='Ingresa tu contraseña'
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
        />
        <button className='boton-ingresar' onClick={handleLogin}>Ingresar</button>

        <button className='boton-olvidar-contrasenna' onClick={handleOlvidarContrasena}>Olvidaste tu contraseña</button>
      </div>
    </div>
  );
}

export default Login;