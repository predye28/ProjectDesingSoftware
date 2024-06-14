import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Buzon.css';

function Buzon() {
  let { estudianteId } = useParams();
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const { tipo, carne, id} = usuario;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`/api/notificacionRoutes/obtener/${estudianteId}`);
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [estudianteId]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/notificacionRoutes/borrar/${id}`);
      setNotifications(notifications.filter(n => n._id !== id));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      const response = await axios.put(`/api/notificacionRoutes/actualizar/${id}/leido`);
      setNotifications(notifications.map(n => (n._id === id ? response.data : n)));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'all') return true;
    return n.estado === filter;
  });

  return (
    <div className="notification-box">
      <div className="filter-buttons">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>Ver Todos</button>
        <button className={filter === 'leído' ? 'active' : ''} onClick={() => setFilter('leído')}>Leidos</button>
        <button className={filter === 'no leído' ? 'active' : ''} onClick={() => setFilter('no leído')}>No Ledos</button>
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
    </div>
  );
}

export default Buzon;