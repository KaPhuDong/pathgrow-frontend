import React, { useState, useEffect } from 'react';
import Main from './Main1';
import api from '../../../api/student/api';
import NotificationList from '../components/NotificationList';

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const res = await api.fetchNotificationsForTeacher();
      setNotifications(res);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <Main>
      <div className="container-notifications">
        <h2 className="pb-4">My Notifications</h2>
        <NotificationList notifications={notifications} />
      </div>
    </Main>
  );
}

export default Notifications;
