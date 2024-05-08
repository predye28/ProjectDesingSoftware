import React from 'react';
import './ComentarTexto.css';


function ComentarTexto() {


  return (
    <div>
      <div className='menuPersona'>

        <label className='titulo'>Comentar</label>
        <label style = {{position: 'absolute', top: 100, left: 50, fontSize: 20, fontWeight: 'bold', color:'white'}} > Comentario: </label>
        
        
        <div class="textoComentario" contenteditable="true"></div>


        <button className='publicarComen'>Publicar</button>
        <button className='volverComentar'>Volver</button>

      </div>
    </div>
  );
}

export default ComentarTexto;