import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchUnreadCount = async () => {
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user?.id;
      const semesterId = localStorage.getItem('semesterId');
      const subjectId = localStorage.getItem('subjectId');

      if (!userId || !semesterId || !subjectId) {
        console.warn('Missing userId, semesterId or subjectId');
        return;
      }

      const response = await axios.get(`/api/goal-questions/${userId}/${semesterId}/${subjectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUnreadCount(response.data.unread || 0);
    } catch (error) {
      console.error('Failed to fetch unread questions', error);
    }
  };

  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, []);

  const increaseUnreadCount = () => {
    setUnreadCount((count) => count + 1);
  };

  return (
    <NotificationContext.Provider value={{ unreadCount, increaseUnreadCount, fetchUnreadCount }}>
      {children}
    </NotificationContext.Provider>
  );
};
