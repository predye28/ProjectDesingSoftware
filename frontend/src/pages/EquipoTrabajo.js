import React from 'react';
import './EquipoTrabajo.css';

function EquipoTrabajo() {


  return (
    <div>
      <div className='menuPrincipal'>
        <label className='titulo'>Registrar Equipo de Trabajo</label>
        <label style = {{position: 'absolute', top: 100, left: 50, fontSize: 20, fontWeight: 'bold', color:'white'}} > Profesor SJ </label>
        <label style = {{position: 'absolute', top: 170, left: 50, fontSize: 20, fontWeight: 'bold', color:'white'}} > Profesor CA </label>
        <label style = {{position: 'absolute', top: 240, left: 50, fontSize: 20, fontWeight: 'bold', color:'white'}}> Profesor sC </label>
        <label style = {{position: 'absolute', top: 310, left: 50, fontSize: 20, fontWeight: 'bold', color:'white'}}> Profesor LI </label>
        <label style = {{position: 'absolute', top: 380, left: 50, fontSize: 20, fontWeight: 'bold', color:'white'}} > Profesor AL </label>
        <label style = {{position: 'absolute', top: 450, left: 50, fontSize: 20, fontWeight: 'bold', color:'white'}} > Profesor Coordinador </label>
        
        <input style = {{position: 'absolute', top: 100, left: 300, fontSize: 20}}  ></input>
        <input style = {{position: 'absolute', top: 170, left: 300, fontSize: 20}}  ></input>
        <input style = {{position: 'absolute', top: 240, left: 300, fontSize: 20}}  ></input>
        <input style = {{position: 'absolute', top: 310, left: 300, fontSize: 20}}  ></input>
        <input style = {{position: 'absolute', top: 380, left: 300, fontSize: 20}}  ></input>

        <select className='selectCoordinador'>
            <option value="">Selecciona una opción</option>
            <option value="opcion1">Opción 1</option>
            <option value="opcion2">Opción 2</option>
            <option value="opcion3">Opción 3</option>
        </select>

      <select className='selectSJ'>
        <option value="">Selecciona una opción</option>
        <option value="opcion1">Opción 1</option>
        <option value="opcion2">Opción 2</option>
        <option value="opcion3">Opción 3</option>
      </select>

      <select className='selectCA'>
        <option value="">Selecciona una opción</option>
        <option value="opcion1">Opción 1</option>
        <option value="opcion2">Opción 2</option>
        <option value="opcion3">Opción 3</option>
      </select>


      <select className='selectSC'>
        <option value="">Selecciona una opción</option>
        <option value="opcion1">Opción 1</option>
        <option value="opcion2">Opción 2</option>
        <option value="opcion3">Opción 3</option>
      </select>

      <select  className='selectLI'>
        <option value="">Selecciona una opción</option>
        <option value="opcion1">Opción 1</option>
        <option value="opcion2">Opción 2</option>
        <option value="opcion3">Opción 3</option>
      </select>

      <select className='selectAL'>
        <option value="">Selecciona una opción</option>
        <option value="opcion1">Opción 1</option>
        <option value="opcion2">Opción 2</option>
        <option value="opcion3">Opción 3</option>
      </select>


      <select className='selectAnno' >
        <option value="">Selecciona un Año</option>
        <option value="opcion1">Opción 1</option>
        <option value="opcion2">Opción 2</option>
        <option value="opcion3">Opción 3</option>
      </select>

      <select className='selectSemestre' > 
        <option value="">Selecciona un Semestre</option>
        <option value="opcion1">Opción 1</option>
        <option value="opcion2">Opción 2</option>
        <option value="opcion3">Opción 3</option>
      </select>

    <button  className='registrarEquipo' >Registrar Equipo</button>
    <button  className='volverEquipo' >Volver</button> 

      </div>
    </div>
  );
}

export default EquipoTrabajo;