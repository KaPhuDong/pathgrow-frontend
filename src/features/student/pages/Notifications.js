// Notifications.jsx
import React, { useState, useEffect } from 'react';
import Main from './Main';
import api from '../../../api/student/api';
import NotificationList from '../components/NotificationList';

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser?.id) {
      setUserId(Number(storedUser.id));
    }
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        try {
          const res = await api.fetchNotificationsByUser(userId);
          console.log('API notifications:', res);

          // Không thêm type, không lọc nữa, chỉ đảm bảo user luôn có name và avatar
          const normalized = res.map((item) => ({
            ...item,
            user: item.user || {
              name: `User #${item.user_id}`,
              avatar: '/default-avatar.png',
            },
          }));

          setNotifications(normalized);
        } catch (error) {
          console.error('Error fetching notifications:', error);
          setNotifications([]);
        }
      };

      fetchData();
    }
  }, [userId]);

  const handleAnswerSubmit = (id, answerText) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, answer: answerText } : n))
    );
  };

  return (
    <Main>
      <div className="container-notifications">
        <h2 className="text-2xl font-bold pb-4">Teacher Feedback</h2>
        {notifications.length === 0 ? (
          <p style={{ textAlign: 'center', width: '100%' }}>
            No feedback notifications found.
          </p>
        ) : (
          <NotificationList
            notifications={notifications}
            onAnswerSubmit={handleAnswerSubmit}
          />
        )}
      </div>
    </Main>
  );
}

export default Notifications;
