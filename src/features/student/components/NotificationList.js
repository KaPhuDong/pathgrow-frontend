import React from 'react';

const formatDateTime = (dateStr) => {
  if (!dateStr) return 'Unknown date';
  const date = new Date(dateStr);
  if (isNaN(date)) return 'Invalid date';
  return date.toLocaleString();
};

const NotificationList = ({ notifications, onAnswerSubmit }) => {
  return (
    <div className="space-y-4">
      {notifications.map((item) => {
        const teacher = item.teacher || {
          name: 'Teacher is unknown',
          avatar: '/default-teacher-avatar.png',
        };
        return (
          <div
            key={item.id}
            className="bg-white p-4 shadow rounded-xl flex items-start gap-4"
          >
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                {/* <p className="font-semibold">{teacher.name}</p> */}
                <span
                  className="text-sm text-gray-500"
                  style={{ color: 'var(--secondary)' }}
                >
                  {formatDateTime(item.createdAt)}
                </span>
              </div>

              <p className="text-gray-800 mb-2">
                <strong style={{ color: 'var(--primary)' }}>Question:</strong>{' '}
                {item.question}
              </p>

              {item.answer ? (
                <div className="bg-green-50 border border-green-200 p-2 rounded-md text-green-800">
                  <strong>Answer:</strong> {item.answer}
                </div>
              ) : (
                <p className="text-gray-500 italic">No answer yet</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NotificationList;
