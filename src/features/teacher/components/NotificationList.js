import React from 'react';

const NotificationList = ({ notifications }) => {
  return (
    <>
      {notifications.length > 0 ? (
        notifications.map((item) => (
          <div key={item.id} className="notification-box">
            <div className="notification-left">
              <span className="bell">
                <i className="fa-solid fa-bell"></i>
              </span>
              <div>
                <p className="notification-title">
                  {item.type.charAt(0).toUpperCase() +
                    item.type.slice(1).replace('_', ' ')}
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
        <p className="empty-text">No notifications found.</p>
      )}
    </>
  );
};

export default NotificationList;
