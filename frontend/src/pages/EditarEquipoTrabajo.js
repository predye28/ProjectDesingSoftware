import React from 'react';
import './EditarEquipoTrabajo.css';

function EditarEquipoTrabajo() {

  return (
    <div>
      <div className='menuPrincipal'>
        <label className='titulo'>Editar Equipo de Trabajo</label>
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

        <select className='selectCoordinadorEdit'>
            <option value="">Selecciona una opción</option>
            <option value="opcion1">Opción 1</option>
            <option value="opcion2">Opción 2</option>
            <option value="opcion3">Opción 3</option>
        </select>

      <select className='selectSJEdit'>
        <option value="">Selecciona una opción</option>
        <option value="opcion1">Opción 1</option>
        <option value="opcion2">Opción 2</option>
        <option value="opcion3">Opción 3</option>
      </select>

      <select className='selectCAEdit'>
        <option value="">Selecciona una opción</option>
        <option value="opcion1">Opción 1</option>
        <option value="opcion2">Opción 2</option>
        <option value="opcion3">Opción 3</option>
      </select>


      <select className='selectSCEdit'>
        <option value="">Selecciona una opción</option>
        <option value="opcion1">Opción 1</option>
        <option value="opcion2">Opción 2</option>
        <option value="opcion3">Opción 3</option>
      </select>

      <select  className='selectLIEdit'>
        <option value="">Selecciona una opción</option>
        <option value="opcion1">Opción 1</option>
        <option value="opcion2">Opción 2</option>
        <option value="opcion3">Opción 3</option>
      </select>

      <select className='selectALEdit'>
        <option value="">Selecciona una opción</option>
        <option value="opcion1">Opción 1</option>
        <option value="opcion2">Opción 2</option>
        <option value="opcion3">Opción 3</option>
      </select>


      <select className='selectAnnoEdit' >
        <option value="">Selecciona un Año</option>
        <option value="opcion1">Opción 1</option>
        <option value="opcion2">Opción 2</option>
        <option value="opcion3">Opción 3</option>
      </select>

      <select className='selectSemestreEdit' > 
        <option value="">Selecciona un Semestre</option>
        <option value="opcion1">Opción 1</option>
        <option value="opcion2">Opción 2</option>
        <option value="opcion3">Opción 3</option>
      </select>

    <button  className='editarEquipo' >Editar Equipo</button>
    <button  className='volverEditarEquipo' >Volver</button> 

      </div>
    </div>
  );
}

export default EditarEquipoTrabajo;