import { useParams } from 'react-router-dom';
import React, { useState, useCallback, useEffect } from 'react';
import './EditarEquipoTrabajo.css';
import axios from 'axios';

function EditarEquipoTrabajo() {
  let { identificacion: paramId } = useParams();
  let [identificacion, setId] = useState(paramId);
  const [equipos, setEquipos] = useState([]); 
  const [edicionEquipo, setEdicionEquipo] = useState({
    nombre: '',
    integrantes: [],
    lider_id: '',
    año: '',
    semestre: '',
  });
  const [error, setError] = useState('');
  const [equipo, setEquipo] = useState(null);
  const [nombreEquipo, setNombreEquipo] = useState('');
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
/*
    axios
    .get('/api/equiposTrabajoRoutes/',)
    .then((response) => {
      const filteredResponse = response.data.data.filter(equip => equip._id === id);
      setEquipo(filteredResponse);
      setEdicionEquipo(filteredResponse));*/
      /*
      axios
      .get('/api/equiposTrabajoRoutes/',)
      .then((response) => {
        const filteredEquipos = response.data.data.filter(equip => equipo._id === id);
        setEquipo(filteredEquipos[0]);
        setEdicionEquipo(filteredEquipos[0]);
      })
      .catch((error) => {
        console.log(error);
      
      });*/
  };


  const handleAñoSeleccionado = (e) => {
    setAñoSeleccionado(e.target.value);
  };


  const cargarAños = () => {
    const añoActual = new Date().getFullYear();
    const añosDisponibles = [añoActual, añoActual + 1];
  
    setAños(añosDisponibles);
  };

  const handleProfesorSeleccionado = (sede, profesorId) => {
    setProfesoresSeleccionados({
      ...profesoresSeleccionados,
      [sede]: profesorId
    });
  };

  useEffect(() => {
    handleBuscarEquipo();
    axios
    .get('/api/equiposTrabajoRoutes/',)
    .then((response) => {
      const filteredResponse = response.data.data.filter(equipo => equipo._id === identificacion);
      setEquipo(filteredResponse);
      setEdicionEquipo(filteredResponse);
      setEquipos(filteredResponse);
    })
  }, []);

  useEffect(() => {
    cargarDatosIniciales();
  }, [cargarDatosIniciales]);

  const handleVolver = () => {

    window.location.href = '/BuscarEditarEquipo'; 
  };

  return (
    <div>
      <div className='menuPrincipal'>
        <label className='titulo'>Editar Equipo de Trabajo</label>


        <label>Nombre equipo de trabajo:</label>
        <input
          type='text'
          value={nombreEquipo}
          onChange={(e) => setNombreEquipo(e.target.value)}
        />




        <select className='selectCoordinadorEdit'            value={profesoresSeleccionados['coordinador'] || ''}
            onChange={(e) => handleProfesorSeleccionado('coordinador', e.target.value)}>
            <option value="">Seleccionar Coordinador</option>
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
              <option value="">Selecciona un profesor</option>
              {profesoresPorSede[sede] && profesoresPorSede[sede].map((profesor) => (
                <option key={profesor._id} value={profesor._id}>{profesor.nombre}</option>
              ))}
            </select>
          </div>
        ))}





      <select className='selectAnnoEdit'         value={añoSeleccionado}
          onChange={handleAñoSeleccionado} >
        <option value="">Selecciona un Año</option>
        {años.map((año) => (
            <option key={año} value={año}>{año}</option>
          ))}
      </select>

      {equipo && (
  <select
    className='selectSemestreEdit'
    value={semestre}
    onChange={(e) => setSemestre(e.target.value)}
  >
    <option value="">Seleccionar Semestre</option>
    <option value="1">Primer Semestre</option>
    <option value="2">Segundo Semestre</option>
  </select>
)}

    <button  className='editarEquipo' >Editar Equipo</button>
    <button  className='volverEditarEquipo' onClick={handleVolver}>Volver</button> 

      </div>
    </div>
  );
}

export default EditarEquipoTrabajo;
