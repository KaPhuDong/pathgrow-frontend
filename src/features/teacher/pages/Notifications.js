// src/pages/Notifications.js
import React, { useState, useEffect } from 'react';
import Main from './Main1';
import api from '../../../api/student/api';
import NotificationList from '../components/NotificationList';

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = () => {
    api.fetchNotifications()
      .then((data) => {
        if (Array.isArray(data)) {
          // Lọc chỉ lấy thông báo có type là 'question'
          const questionOnly = data.filter(n => n.type === 'question');
          setNotifications(questionOnly);
        } else {
          setNotifications([]);
        }
      })
      .catch((err) => {
        console.error('Error fetching notifications:', err);
        setNotifications([]);
      });
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <Main>
      <div className="container-notifications">
        <h2>My Questions</h2>
        <NotificationList notifications={notifications} />
      </div>
    </Main>
  );
}

export default Notifications;
