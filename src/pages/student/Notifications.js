import React, { useState, useEffect } from 'react';
import Main from './Main';
import '../../styles/pages/notifications.css';
import axios from 'axios';

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
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedUserId = storedUser?.id;

    // console.log('storedUserId from localStorage:', storedUserId);
    if (storedUserId) {
      setUserId(Number(storedUserId));
    }
  }, []);

  useEffect(() => {
    if (userId !== null && userId !== undefined) {
      axios.get(`http://127.0.0.1:8000/api/notifications/${userId}`)
        .then(response => {
        //   console.log('Notification response:', response.data);
          if (Array.isArray(response.data)) {
            setNotifications(response.data);
          } else {
            // console.warn('API response is not an array:', response.data);
            setNotifications([]);
          }
        })
        .catch(error => {
          console.error('Error fetching notifications:', error);
          setNotifications([]);
        });
    }
  }, [userId]);

  // Debug info
//   console.log('Current notifications:', notifications);
//   console.log('Active tab:', activeTab);

  const filteredNotifications = notifications.filter(n => n.type === activeTab);

  return (
    <Main>
      <div className="container-notifications">
        <div className="tabs">
          {tabs.map(tab => (
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
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((item) => (
              <div key={item.id} className="notification-box">
                <div className="notification-left">
                  <span className="bell"><i className="fa-solid fa-bell"></i></span>
                  <div>
                    <p className="notification-title">
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1).replace('_', ' ')}
                    </p>
                    <p className="notification-message">{item.message}</p>
                  </div>
                </div>
                <div className="notification-time">
                  {new Date(item.created_at).toLocaleString()}
                </div>
              </div>
            ))
          ) : (
            <p className="empty-text">No {activeTab} notifications found.</p>
          )}
        </div>
      </div>
    </Main>
  );
}

export default Notifications;
