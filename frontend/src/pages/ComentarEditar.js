import React from 'react';
import './ComentarEditar.css';


function ComentarEditar() {


  return (
    <div>
      <div className='menuPersona'>

        <label className='titulo'>Comentar</label>
        <label style = {{position: 'absolute', top: 100, left: 50, fontSize: 20, fontWeight: 'bold', color:'white'}} > Comentario: </label>
        
        
        <div class="textoComentarioEditar" contenteditable="true"></div>


        <button className='publicarComentario'>Publicar</button>
        <button className='eliminarComentario'>Eliminar</button>
        <button className='volverComentarEditar'>Volver</button>

      </div>
    </div>
  );
}

export default ComentarEditar;