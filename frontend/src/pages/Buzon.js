import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Buzon.css';

function Buzon() {

  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const { id } = usuario;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`/api/notificacionRoutes/obtener/${id}`);
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [id]);

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/notificacionRoutes/borrar/${id}`, {
        method: 'DELETE'
      });
      setNotifications(notifications.filter(n => n._id !== id));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      const response = await fetch(`/api/notificacionRoutes/actualizar/${id}/leido`, {
        method: 'PUT'
      });
      const updatedNotification = await response.json();
      setNotifications(notifications.map(n => (n._id === id ? updatedNotification : n)));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'all') return true;
    return n.estado === filter;
  });

  const handleVolver = () => {
    window.location.href = '/MenuPrincipal';
  };

  return (
    <div className="notification-box">
      <div className="filter-buttons">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>Ver Todos</button>
        <button className={filter === 'leído' ? 'active' : ''} onClick={() => setFilter('leído')}>Leidos</button>
        <button className={filter === 'no leído' ? 'active' : ''} onClick={() => setFilter('no leído')}>No Leidos</button>
      </div>
      <ul className="notifications-list">
        {filteredNotifications.map(notification => (
          <li key={notification._id} className={notification.estado === 'no leído' ? 'unread' : 'read'}>
            <div className="notification-header">
              <span>{notification.emisor}</span>
              <span>{new Date(notification.fechaHora).toLocaleString()}</span>
            </div>
            <p>{notification.contenido}</p>
            <div className="notification-actions">
              {notification.estado === 'no leído' && (
                <button onClick={() => handleMarkAsRead(notification._id)}>Marcar como leído</button>
              )}
              {notification.estado === 'leído' && (
                <button onClick={() => handleDelete(notification._id)}>Borrar</button>
              )}
            </div>
          </li>
        ))}
      </ul>
      <button className='volverMenuPlanTrabajo' onClick={handleVolver}>Volver</button>
    </div>
  );
}

export default Buzon;
