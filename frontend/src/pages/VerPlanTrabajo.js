import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './VerPlanTrabajo.css';

function VerPlanTrabajo() {
  const { id } = useParams();
  const [planTrabajo, setPlanTrabajo] = useState(null);
  const [actividades, setActividades] = useState([]);

  // Obtener el tipo de usuario desde localStorage
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const { tipo } = usuario;

  useEffect(() => {
    const fetchPlanTrabajo = async () => {
      try {
        const response = await fetch(`/api/planesTrabajoRoutes/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Error al obtener el plan de trabajo');
        }
        const data = await response.json();
        setPlanTrabajo(data);

        // Obtener actividades asociadas al plan de trabajo
        const actividadesResponse = await fetch(`/api/actividadesRoutes/${id}/actividades`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!actividadesResponse.ok) {
          throw new Error('Error al obtener las actividades del plan de trabajo');
        }
        const actividadesData = await actividadesResponse.json();
        setActividades(actividadesData);
      } catch (error) {
        console.error('Error al obtener el plan de trabajo:', error);
        // Manejar el error según tu lógica
      }
    };

    fetchPlanTrabajo();
  }, [id]);

  const handleEliminarPlanTrabajo = async () => {
    if (tipo === 'PGC') {
      try {
        const response = await fetch(`/api/planesTrabajoRoutes/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Error al eliminar el plan de trabajo');
        }
        // Redirigir al usuario de regreso al menú de planes de trabajo
        window.location.href = '/MenuPlanTrabajo';
      } catch (error) {
        console.error('Error al eliminar el plan de trabajo:', error);
        // Manejar el error según tu lógica
      }
    } else {
      alert('Solo el Profesor Guia Coordinador puede realizar esta acción.');
    }
  };

  const handleCrearActividad = () => {
    if (tipo === 'PGC') {
      // Redirigir al usuario a la página de creación de actividad con el ID del plan de trabajo
      window.location.href = `/CrearActividad/${id}`;
    } else {
      alert('Solo el Profesor Guia Coordinador puede realizar esta acción.');
    }
  };

  const handleVerActividad = (idActividad) => {
    // Redirigir al usuario a la página de visualización de la actividad con el ID de la actividad
    window.location.href = `/VerActividad/${idActividad}`;
  };

  return (
    <div>
      <div className='menuPersona'>
        <h1 className='title'>Detalles del Plan de Trabajo</h1>
        {planTrabajo ? (
          <div className="planDetailsContainer">
          <div className="planDetails">
            <label>Nombre del Plan de Trabajo:</label>
            <label>{planTrabajo.nombre}</label>
          </div>
          <div className="planDetails">
            <label>Fecha de Inicio:</label>
            <label>{planTrabajo.fechaInicio}</label>
          </div>
          <div className="planDetails">
            <label>Fecha de Fin:</label>
            <label>{planTrabajo.fechaFin}</label>
          </div>
        </div>
        ) : (
          <p>Cargando información del plan de trabajo...</p>
        )}
        
        <div className="actividadesContainer">
          <label className="actividadesTitle">Actividades:</label>
          <div className="actividadesList">
            {actividades.map((actividad) => (
              <button
                key={actividad._id}
                className='actividadButton'
                onClick={() => handleVerActividad(actividad._id)}
              >
                {actividad.nombre}
              </button>
            ))}
          </div>
        </div>

        <button className='volverVerPlanTrabajo' onClick={() => window.location.href = '/MenuPrincipal'}>Volver</button>
        <button className='editarPlan' onClick={handleCrearActividad}>Crear Actividad</button>
        <button className='eliminarPlan' onClick={handleEliminarPlanTrabajo}>Eliminar Plan Trabajo</button>
      </div>
    </div>
  );
}

export default VerPlanTrabajo;
