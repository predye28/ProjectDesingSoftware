import React, { useState, useEffect } from 'react';
import './BuscarEditarEquipo.css';
import axios from 'axios';

function BuscarEditarEquipo() {
  const [año, setAnio] = useState('');
  const [semestre, setSemestre] = useState('');
  const [equipos, setEquipos] = useState([]); 
  const [loading, setLoading] = useState(false);
  
  const handleAnioChange = (e) => {
    if (e.target.value !== "") {
      setAnio(e.target.value);
    }
  };

  const handleSemestreChange = (e) => {
    if (e.target.value !== "") {
      setSemestre(e.target.value);
    }
  };
/*
  const handleEditar = (equipoId) => {
    window.location.href = `/EditarEquipoTrabajo/${equipoId}`;
  };
*/

const handleEditar = (equipo) => {
  window.location.href = `/EditarEquipoTrabajo/${equipo}`;
};


  const handleVolver = () => {
    window.location.href = '/MenuEquipoTrabajo'; 
  };

  /*
  const fetchEquipos = async () => {
    if (!año || !semestre) {  console.log("Ingrese datos porf");
        return;
    }

    try {
      const response = await fetch(`/api/equiposTrabajoRoutes/equipos_trabajo/${año}/${semestre}`);
      //const response = await fetch(`/api/equipos_trabajo`);
      const json = await response.json();

      if (!response.ok) {
        throw new Error('Error al obtener equipos de trabajo');
      }
      console.log("Fetch ok ");
      //const data = await response.json();
      //setEquipos(data);
      setEquipos(json);
    } catch (error) {
      console.error('Error fetching equipos:', error);
    }

  };

*/


const fetchEquipos = async () => {
  if (!año || !semestre) {
    console.log("Ingrese datos porf");
    return;
  }

  console.log("Fetching equipos for año:", año, "semestre:", semestre);

  try {
    const response = await axios.get('/api/equiposTrabajoRoutes/equipos_trabajo', {

        año: año,
        semestre: semestre
      
    }).then(response => setEquipos(response.data));
    console.log("Fetch ok ");
    const data = await response.json();
    setEquipos(data);
  } catch (error) {
    console.error('Error fetching equipos:', error);
  }
};


  useEffect(() => {
    //fetchEquipos();
    setLoading(true);
    axios
      .get('/api/equiposTrabajoRoutes/',)
      .then((response) => {
        const filteredEquipos = response.data.data.filter(equipo => equipo.año === año && equipo.semestre === semestre);
        setEquipos(filteredEquipos);
        //setEquipos(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      
      });

  }, [año, semestre]);//año, semestre
  return (
    <div>
      <div className='menuPrincipal'>
        <label className='titulo'>Editar Equipo de Trabajo</label>
        <label style={{ position: 'absolute', top: 100, left: 50, fontSize: 20, fontWeight: 'bold', color: 'white' }}>Seleccione el año y semestre para editar el equipo de trabajo</label>

        <select className='selectAnnoBuscar' onChange={handleAnioChange}>
          <option value="2024">Selecciona un Año</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>

        <select className='selectSemestreBuscar' onChange={handleSemestreChange}> 
          <option value="1">Selecciona un Semestre</option>
          <option value="1">Semestre 1</option>
          <option value="2">Semestre 2</option>
        </select>

        <button className='editarBuscarEquipo' onClick={handleEditar}>Editar</button>
        <button className='volverBuscarEditar' onClick={handleVolver}>Volver</button> 

        {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='scrollable-list-container'>
          <ul className='scrollable-list'>
            {equipos.length > 0 ? (
              equipos.map(equipo => (
                <li key={equipo._id} className='scrollable-list-item pointer-cursor' onClick={() => handleEditar(equipo)}>{equipo.nombre}</li>
              ))
            ) : (
              <li className='scrollable-list-item'>No hay equipos</li>
            )}
          </ul>
        </div>
      )}

      </div>
    </div>
  );
}

export default BuscarEditarEquipo;
