import React from 'react';
import './Comentar.css';


function Comentar() {


  return (
    <div>
      <div className='menuPersona'>

        <label className='titulo'>Comentarios</label>
        
        <div className='tablaComentarios'></div>

        <button className='crearComentario'>Crear Comentario</button>
        <button className='volverComentarios'>Volver</button>

      </div>
    </div>
  );
}

export default Comentar;