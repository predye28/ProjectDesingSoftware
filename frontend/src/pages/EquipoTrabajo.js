import React, { useState, useEffect, useCallback } from 'react';
import './EquipoTrabajo.css';

function EquipoTrabajo() {
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

  const cargarAños = () => {
    const añoActual = new Date().getFullYear();
    const añosDisponibles = [añoActual, añoActual + 1];
  
  //  console.log()
    setAños(añosDisponibles);
  };

  useEffect(() => {
    cargarDatosIniciales();
  }, [cargarDatosIniciales]);

  const handleAñoSeleccionado = (e) => {
    setAñoSeleccionado(e.target.value);
  };

  const handleVolver = () => {
    window.location.href = '/MenuEquipoTrabajo';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const integrantesIds = Object.values(profesoresSeleccionados);
    const liderId = integrantesIds.shift();

    const equipoData = {
      nombre: nombreEquipo,
      integrantes: integrantesIds,
      lider_id: liderId,
      año: añoSeleccionado,
      semestre: semestre
    };

    try {
      const response = await fetch('/api/personaRoutes/equipoTrabajo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(equipoData)
      });

      if (!response.ok) {
        throw new Error('Error al registrar equipo de trabajo');
      }

      const data = await response.json();
      alert(data.message);

      window.location.href = '/MenuEquipoTrabajo';
    } catch (error) {
      alert('Error:', error);
    }
  };

  const handleProfesorSeleccionado = (sede, profesorId) => {
    setProfesoresSeleccionados({
      ...profesoresSeleccionados,
      [sede]: profesorId
    });
  };
  



  return (
    <div>
      <div className='menuPrincipal'>
        <label className='titulo'>Registrar Equipo de Trabajo</label>
        <label>Nombre equipo de trabajo:</label>
        <input
          type='text'
          value={nombreEquipo}
          onChange={(e) => setNombreEquipo(e.target.value)}
        />

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

        <div>
          <label>Profesor Coordinador:</label>
          <select
            value={profesoresSeleccionados['coordinador'] || ''}
            onChange={(e) => handleProfesorSeleccionado('coordinador', e.target.value)}
          >
            <option value="">Selecciona un profesor coordinador</option>
            {profesoresCoordinadores.map((profesor) => (
              <option key={profesor._id} value={profesor._id}>{profesor.nombre}</option>
            ))}
          </select>
        </div>

        <label>Año:</label>
        <select
          value={añoSeleccionado}
          onChange={handleAñoSeleccionado}
        >
          <option value="">Selecciona un año</option>
          {años.map((año) => (
            <option key={año} value={año}>{año}</option>
          ))}
        </select>

        <label>Semestre:</label>
        <select
          value={semestre}
          onChange={(e) => setSemestre(e.target.value)}
        >
          <option value="">Selecciona un semestre</option>
          <option value="1">Primer Semestre</option>
          <option value="2">Segundo Semestre</option>
        </select>

        <button className='registrarEquipo' onClick={handleSubmit}>Registrar Equipo</button>
        <button className='volverEquipo' onClick={handleVolver}>Volver</button>

      </div>
    </div>
  );
}

export default EquipoTrabajo;



