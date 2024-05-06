import React from 'react';
import './BuscarEditarEquipo.css';

function BuscarEditarEquipo() {

  return (
    <div>
      <div className='menuPrincipal'>
        <label className='titulo'>Editar Equipo de Trabajo</label>
        <label style = {{position: 'absolute', top: 100, left: 50, fontSize: 20, fontWeight: 'bold', color:'white'}} > Seleccione el año y semestre para editar el equipo de trabajo </label>

      <select className='selectAnnoBuscar' >
        <option value="">Selecciona un Año</option>
        <option value="opcion1">Opción 1</option>
        <option value="opcion2">Opción 2</option>
        <option value="opcion3">Opción 3</option>
      </select>

      <select className='selectSemestreBuscar' > 
        <option value="">Selecciona un Semestre</option>
        <option value="opcion1">Opción 1</option>
        <option value="opcion2">Opción 2</option>
        <option value="opcion3">Opción 3</option>
      </select>

    <button  className='editarBuscarEquipo' >Editar </button>
    <button  className='volverBuscarEditar' >Volver</button> 

      </div>
    </div>
  );
}

export default BuscarEditarEquipo;