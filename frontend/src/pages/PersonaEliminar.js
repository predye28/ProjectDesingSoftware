
import React from 'react';
import './PersonaEliminar.css';
import usuario from '../img/usuario.png';

function PersonaEliminar() {

  return (
    <div>
      <div className='personaEliminar'>
        <label className='titulo'>Persona en linea</label>
        <label style = {{position: 'absolute', top: 80, left: 50, fontSize: 20, fontWeight: 'bold', color:'white'}} > Identificación </label>
        <label style = {{position: 'absolute', top: 160, left: 50, fontSize: 20, fontWeight: 'bold', color:'white'}} > Nombre </label>
        <label style = {{position: 'absolute', top: 240, left: 50, fontSize: 20, fontWeight: 'bold', color:'white'}}> Primer apellido </label>
        <label style = {{position: 'absolute', top: 320, left: 50, fontSize: 20, fontWeight: 'bold', color:'white'}}> Segundo apellido </label>
        <label style = {{position: 'absolute', top: 400, left: 50, fontSize: 20, fontWeight: 'bold', color:'white'}} > Sede </label>

        <input style = {{position: 'absolute', top: 80, left: 300, fontSize: 20}}  ></input>
        <input style = {{position: 'absolute', top: 160, left: 300, fontSize: 20}}  ></input>
        <input style = {{position: 'absolute', top: 240, left: 300, fontSize: 20}}  ></input>
        <input style = {{position: 'absolute', top: 320, left: 300, fontSize: 20}}  ></input>
        
        <label style = {{position: 'absolute', top: 80, left: 700, fontSize: 20, fontWeight: 'bold', color:'white'}} > Celular </label>
        <label style = {{position: 'absolute', top: 160, left: 700, fontSize: 20, fontWeight: 'bold', color:'white'}} > Correo </label>
        <label style = {{position: 'absolute', top: 240, left: 700, fontSize: 20, fontWeight: 'bold', color:'white'}} > Numero oficina </label>
        <label style = {{position: 'absolute', top: 320, left: 700, fontSize: 20, fontWeight: 'bold', color:'white'}} > Extension </label>
        <label style = {{position: 'absolute', top: 400, left: 700, fontSize: 20, fontWeight: 'bold', color:'white'}} > Estado </label>
        <label style = {{position: 'absolute', top: 480, left: 700, fontSize: 20, fontWeight: 'bold', color:'white'}} > Tipo </label>

        <img src={usuario} alt='Usuario' style={{ position: 'absolute', top: 100, left: 1150, width: '200px' }} />

        <input  style = {{position: 'absolute', top: 80, left: 850, fontSize: 20}} ></input>
        <input  style = {{position: 'absolute', top: 160, left: 850, fontSize: 20}} ></input>
        <input  style = {{position: 'absolute', top: 240, left: 850, fontSize: 20}} ></input>
        <input  style = {{position: 'absolute', top: 320, left: 850, fontSize: 20}} ></input>

        
        <select style = {{position: 'absolute', top: 400, left: 300, fontSize: 20, fontWeight: 'bold', color:'black'}} >
        <option value="">Selecciona una opción</option>
        <option value="opcion1">Opción 1</option>
        <option value="opcion2">Opción 2</option>
        <option value="opcion3">Opción 3</option>
      </select>

      <select  style = {{position: 'absolute', top: 400, left: 850, fontSize: 20, fontWeight: 'bold', color:'black'}}> 
        <option value="">Selecciona una opción</option>
        <option value="opcion1">Opción 1</option>
        <option value="opcion2">Opción 2</option>
        <option value="opcion3">Opción 3</option>
      </select>

      <select  style = {{position: 'absolute', top: 480, left: 850, fontSize: 20, fontWeight: 'bold', color:'black'}}> 
        <option value="">Selecciona una opción</option>
        <option value="opcion1">Opción 1</option>
        <option value="opcion2">Opción 2</option>
        <option value="opcion3">Opción 3</option>
      </select>
        
        <button  className='eliminarPersonal'>Eliminar</button>
        <button  className='volverPersonaEliminar' >Volver</button>
               

      </div>
    </div>
  );

}

export default PersonaEliminar;