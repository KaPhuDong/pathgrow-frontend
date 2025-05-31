// src/pages/Notifications.js
import React, { useState, useEffect } from 'react';
import Main from './Main';
import api from '../../../api/student/api';
import NotificationList from '../components/NotificationList';

function Notifications() {
  const [activeTab, setActiveTab] = useState('incomplete');
  const [notifications, setNotifications] = useState([]);
  const [userId, setUserId] = useState(null);

  const tabs = [
    { id: 'incomplete', label: 'Incomplete Tasks' },
    { id: 'deadlines', label: 'Deadlines' },
    { id: 'feedback', label: 'Teacher Feedback' },
  ];

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser?.id) {
      setUserId(Number(storedUser.id));
    }
  }, []);

  useEffect(() => {
    if (userId) {
      api
        .fetchNotificationsByUser(userId)
        .then((data) => {
          if (Array.isArray(data)) setNotifications(data);
          else setNotifications([]);
        })
        .catch((err) => {
          console.error('Error fetching notifications:', err);
          setNotifications([]);
        });
    }
  }, [userId]);

  const filteredNotifications = notifications.filter(
    (n) => n.type === activeTab
  );

  return (
    <Main>
      <div className="container-notifications">
        <div className="tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="tab-content">
          <NotificationList notifications={filteredNotifications} />
        </div>
      </div>
    </Main>
  );
}

export default Notifications;
