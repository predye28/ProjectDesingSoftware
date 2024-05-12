import { useParams } from 'react-router-dom';
import React, { useState, useCallback, useEffect } from 'react';
import './EditarEquipoTrabajo.css';
import axios from 'axios';

function EditarEquipoTrabajo() {
  const { id } = useParams();
  const [identificacion, setIdentificacion] = useState(id || '');
 // let { identificacion: paramId } = useParams();
  //let [identificacion, setId] = useState(paramId);
  const [equipos, setEquipos] = useState([]); 
  const [edicionEquipo, setEdicionEquipo] = useState({
    nombre: '',
    integrantes: [],
    lider_id: '',
    año: '',
    semestre: '',
  });
  const [error, setError] = useState('');
  const [test, setTest] = useState('');
  const [equipo, setEquipo] = useState(null);
  const [nombreEquipo, setNombreEquipo] = useState('');
  const [nombreCoordinador, setNombreCoordinador] = useState('');
  const [nuevoCoordinador, setNuevoCoordinador] = useState('');
  const [selectedProfessor, setSelectedProfessor] = useState({ id: '', nombre: '' });
  const [sedes] = useState(['SJ', 'CA', 'SC', 'LM', 'AL']);
  const [profesoresPorSede, setProfesoresPorSede] = useState({});
  const [profesoresCoordinadores, setProfesoresCoordinadores] = useState([]);
  const [años, setAños] = useState([]);
  const [semestre, setSemestre] = useState('');
  const [profesoresSeleccionados, setProfesoresSeleccionados] = useState({});
  const [añoSeleccionado, setAñoSeleccionado] = useState('');

  const cargarDatosIniciales = useCallback(async () => {
    try {
      //setId("asad");
      // Cargar profesores por sede
      const profesores = {};
      for (const sede of sedes) {
        const response = await fetch(`/api/personaRoutes/profesores/${sede}`);
        console.log(response)
        if (!response.ok) {
          throw new Error('Error al obtener profesores');
        }
        const data = await response.json();
        profesores[sede] = data;
      }
      setProfesoresPorSede(profesores);

      // Cargar profesores coordinadores
      const responseCoordinadores = await fetch(`/api/personaRoutes/profesoresPGC/PGC`);
      console.log(responseCoordinadores)
      if (!responseCoordinadores.ok) {
        throw new Error('Error al obtener profesores coordinadores');
      }
      const dataCoordinadores = await responseCoordinadores.json();
      setProfesoresCoordinadores(dataCoordinadores);

      // Cargar años disponibles
      cargarAños();
      const response = await fetch(`/api/equiposTrabajoRoutes/${identificacion}`);
      if (!response.ok) {

        throw new Error('Equipo no encontrada');
      }
      const data = await response.json();
      setEquipo(data);
      setEdicionEquipo(data);


    } catch (error) {
      console.error('Error:', error);
    }
  }, [sedes]);


  const obtenerEquipo = useCallback(async () => {
    try {
        const response = await fetch(`/api/equiposTrabajoRoutes/${identificacion}`);
        if (!response.ok) {
          throw new Error('Equipo no encontrada');
        }
        const data = await response.json();
        setEquipo(data);
        setEdicionEquipo(data);
    } catch (error) {
      setError(error.message);
      setEquipo(null);
    }
  }, [identificacion]);

  const handleBuscarEquipo = () => {
    obtenerEquipo();

  };


  const handleAñoSeleccionado = (e) => {
    setAñoSeleccionado(e.target.value);
  };


  const cargarAños = () => {
    const añoActual = new Date().getFullYear();
    const añosDisponibles = [añoActual, añoActual + 1];
  
    setAños(añosDisponibles);
    setTest(equipo.nombre);
  };
/*
  const handleProfesorSeleccionado = (sede, profesorId) => {
    setProfesoresSeleccionados({
      ...profesoresSeleccionados,
      [sede]: profesorId
    });
  };
*/
  const handleProfesorSeleccionado = async (sede, profesorId) => {

    const selectedProfessorName = profesoresCoordinadores.find(profesor => profesor._id === profesorId)?.nombre || '';
    setSelectedProfessor({ id: profesorId, nombre: selectedProfessorName });

    setProfesoresSeleccionados((prevProfesoresSeleccionados) => ({
      ...prevProfesoresSeleccionados,
      [sede]: profesorId,
    }));

  };

  const handleProfesorSeleccionadoB = async (sede, profesorId, nombreProf) => {

    setProfesoresSeleccionados((prevProfesoresSeleccionados) => ({
      ...prevProfesoresSeleccionados,
      [sede]: profesorId,
    }));

  };

  useEffect( () => {
    handleBuscarEquipo();
    getNombre();
  }, []);

  useEffect(() => {
    cargarDatosIniciales();
  }, [cargarDatosIniciales]);

  const handleVolver = () => {

    window.location.href = '/BuscarEditarEquipo'; 
  };

  const getNombre = async () => {
    try {
      const response = await fetch(`/api/personaRoutes/obtener/${edicionEquipo.lider_id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setNombreCoordinador(data.nombre);
      return data.nombre;
    } catch (error) {
      console.error('Error fetching persona:', error);
      return null;
    }
  }

  const getNombreB = async (pId) => {
    try {
      const response = await fetch(`/api/personaRoutes/obtener/${pId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      //setNombreCoordinador(data.nombre);

      return data.nombre;
    } catch (error) {
      console.error('Error fetching persona:', error);
      return null;
    }
  }

  const handleEditar = async () => {
    try {
      const response = await fetch(`/api/equiposTrabajoRoutes/editar_equipo/${equipo._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: nombreEquipo || equipo.nombre,
          integrantes: Object.values(profesoresSeleccionados) || edicionEquipo.integrantes,
          lider_id: profesoresSeleccionados.coordinador || equipo.lider_id,
          año: añoSeleccionado || equipo.año,
          semestre: semestre || equipo.semestre,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update equipo');
      }
  
      const data = await response.json();
      console.log('Equipo actualizado:', data);

      alert('Equipo editado exitosamente!');
      window.location.href = '/MenuPrincipal'; 
    } catch (error) {
      console.error('Error updating equipo:', error);
    }
  };

  return (
    <div>
      <div className='menuPrincipal'>
        <label className='titulo'>Editar Equipo de Trabajo</label>


        <label>Nombre equipo de trabajo:</label>
        <input
          type='text'
          value={edicionEquipo.Nombre}
          onChange={(e) => setNombreEquipo(e.target.value)}
          placeholder ={edicionEquipo.nombre}
        />




<select
  className='selectCoordinadorEdit'
  value={edicionEquipo.lider_id}
  onChange={(e) => handleProfesorSeleccionado('coordinador', e.target.value)}
>
  <option value="">Coordinador {selectedProfessor.nombre || nombreCoordinador}</option>
  {profesoresCoordinadores.map((profesor) => (
    <option key={profesor._id} value={profesor._id}>{profesor.nombre}</option>
  ))}
</select>

      {sedes.map((sede) => (
  <div key={sede}>
    <label>{`Profesor ${sede}:`}</label>
    <select
      value={profesoresSeleccionados[sede] || ''}
      onChange={(e) => handleProfesorSeleccionado(sede, e.target.value)}
    >
      {profesoresPorSede[sede] && profesoresPorSede[sede].map((profesor) => {
        return (
          <option key={profesor._id} value={profesor._id} defaultValue={edicionEquipo.integrantes.includes(profesor._id)}>
            {profesor.nombre}
          </option>
        );
      })}
    </select>
  </div>
))}





<select
  className='selectAnnoEdit'
  value={añoSeleccionado || edicionEquipo.año}
  onChange={handleAñoSeleccionado}
>
  <option value="">Año {añoSeleccionado || edicionEquipo.año}</option>
  {años.map((año) => (
    <option key={año} value={año}>{año}</option>
  ))}
</select>

{equipo && (
  <select
    className='selectSemestreEdit'
    value={semestre || edicionEquipo.semestre}
    onChange={(e) => setSemestre(e.target.value)}
  >
    <option value="">Semestre {semestre || edicionEquipo.semestre}</option>
    <option value="1">Primer Semestre</option>
    <option value="2">Segundo Semestre</option>
  </select>
)}
<div style={{ color: 'white', marginLeft: '-680px', float: 'left', marginRight: '10px' }}>Elegir Coordinador</div>
    <button  className='editarEquipo' onClick={handleEditar}>Editar Equipo</button>
    <button  className='volverEditarEquipo' onClick={handleVolver}>Volver</button> 

      </div>
    </div>
  );
}

export default EditarEquipoTrabajo;
