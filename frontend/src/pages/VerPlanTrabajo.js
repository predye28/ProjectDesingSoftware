import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './VerPlanTrabajo.css';

function VerPlanTrabajo() {
  const { id } = useParams();
  const [planTrabajo, setPlanTrabajo] = useState(null);
  const [actividades, setActividades] = useState([]);

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
  };

  const handleVerActividad = (idActividad) => {
    // Redirigir al usuario a la página de visualización de la actividad con el ID de la actividad
    window.location.href = `/VerActividad/${idActividad}`;
  };

  const handleCrearActividad = () => {
    // Redirigir al usuario a la página de creación de actividad con el ID del plan de trabajo
    window.location.href = `/CrearActividad/${id}`;
  };

  return (
    <div>
      <div className='menuPersona'>
        <label className='titulo'>Detalles del Plan de Trabajo</label>
        {planTrabajo ? (
          <div>
            <label style={{ position: 'absolute', top: 150, left: 50, fontSize: 20, fontWeight: 'bold', color: 'white' }}>Nombre del Plan de Trabajo:</label>
            <label style={{ position: 'absolute', top: 150, left: 350, fontSize: 20 }}>{planTrabajo.nombre}</label>
            <label style={{ position: 'absolute', top: 200, left: 50, fontSize: 20, fontWeight: 'bold', color: 'white' }}>Fecha de Inicio:</label>
            <label style={{ position: 'absolute', top: 200, left: 350, fontSize: 20 }}>{planTrabajo.fechaInicio}</label>
            <label style={{ position: 'absolute', top: 250, left: 50, fontSize: 20, fontWeight: 'bold', color: 'white' }}>Fecha de Fin:</label>
            <label style={{ position: 'absolute', top: 250, left: 350, fontSize: 20 }}>{planTrabajo.fechaFin}</label>
          </div>
        ) : (
          <p>Cargando información del plan de trabajo...</p>
        )}
        
        <div>
          <label style={{ position: 'absolute', top: 300, left: 50, fontSize: 20, fontWeight: 'bold', color: 'white' }}>Actividades:</label>
          <div>
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

        <button className='volverVerPlanTrabajo' onClick={() => window.location.href = '/MenuPlanTrabajo'}>Volver</button>
        <button className='editarPlan' onClick={handleCrearActividad}>Crear Actividad</button>
        <button className='eliminarPlan' onClick={handleEliminarPlanTrabajo}>Eliminar Plan Trabajo</button>
      </div>
    </div>
  );
}

export default VerPlanTrabajo;
