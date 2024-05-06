import React, { useState }  from 'react';
import './ModificarActividad.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function ModificarActividad() {

  const [fecha, setFecha] = useState(null); 

  return (
    <div>
      <div className='menuPersona'>
        <label className='titulo'>Actividad # </label>
        <label style = {{position: 'absolute', top: 90, left: 50, fontSize: 20, fontWeight: 'bold', color:'white'}} > Semana: </label>
        <label style = {{position: 'absolute', top: 180, left: 50, fontSize: 20, fontWeight: 'bold', color:'white'}} > Nombre: </label>
        <label style = {{position: 'absolute', top: 270, left: 50, fontSize: 20, fontWeight: 'bold', color:'white'}} > Enlace: </label>
        <label style = {{position: 'absolute', top: 360, left: 50, fontSize: 20, fontWeight: 'bold', color:'white'}} > Afiche: </label>
        <label style = {{position: 'absolute', top: 450, left: 50, fontSize: 20, fontWeight: 'bold', color:'white'}} > Fecha: </label>
        
        
        
        <label style = {{position: 'absolute', top: 90, left: 500, fontSize: 20, fontWeight: 'bold', color:'white'}} > Dias requeridos:</label>
        <label style = {{position: 'absolute', top: 180, left: 500, fontSize: 20, fontWeight: 'bold', color:'white'}} > Responsable: </label>
        <label style = {{position: 'absolute', top: 270, left: 500, fontSize: 20, fontWeight: 'bold', color:'white'}} > Tipo: </label>
        <label style = {{position: 'absolute', top: 360, left: 500, fontSize: 20, fontWeight: 'bold', color:'white'}} > Estado: </label>
        


        <input style = {{position: 'absolute', top: 180, left: 150, fontSize: 20}}  ></input>
        <input className='aficheModificar' type='file' ></input>
        <input style = {{position: 'absolute', top: 270, left: 150, fontSize: 20}}  ></input>

        <div className='contenedorModificarDatePicker' >
          <DatePicker
            selected={fecha}
            onChange={(date) => setFecha(date)}
            dateFormat="dd/MM/yyyy"
            style={{ fontSize: 20 }}
          />
        </div>


        
        <input style = {{position: 'absolute', top: 100, left: 150, fontSize: 20}}  ></input>
        <input style = {{position: 'absolute', top: 100, left: 700, fontSize: 20}}  ></input>

        <select className='selectModificarResponsable'>
            <option value="">Selecciona un Responsable</option>
            <option value="opcion1">Opción 1</option>
            <option value="opcion2">Opción 2</option>
            <option value="opcion3">Opción 3</option>
        </select>

        <select className='selectModificarTipo'>
            <option value="">Selecciona el Tipo</option>
            <option value="opcion1">Opción 1</option>
            <option value="opcion2">Opción 2</option>
            <option value="opcion3">Opción 3</option>
        </select>

        <select className='selectModificarEstado'>
            <option value="">Selecciona el Estado</option>
            <option value="opcion1">Opción 1</option>
            <option value="opcion2">Opción 2</option>
            <option value="opcion3">Opción 3</option>
        </select>

        <select className='selectModificarVirPre'>
            <option value="">Selecciona el Tipo</option>
            <option value="opcion1">Virtual</option>
            <option value="opcion2">Presencial</option>
        </select>
        
        <button className='guardarCambios'>GuardarCambios</button>
        <button className='volverModificarActividad'>Volver</button>
      </div>
    </div>
  );
}

export default ModificarActividad;