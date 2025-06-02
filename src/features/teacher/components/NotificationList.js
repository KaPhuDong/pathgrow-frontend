import React from 'react';

const NotificationList = ({ notifications }) => {
  console.log('Notifications:', notifications);

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

   return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Student notifications</h2>
      <div className="space-y-4">
        {notifications.length === 0 ? (
          <p>No notifications found.</p>
        ) : (
          notifications.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 shadow rounded-xl flex items-start gap-4"
            >
              <img
                src={item.user.avatar}
                alt={item.user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-semibold">{item.user.name}</h3>
                  <span className="text-sm text-gray-500">
                    {formatDateTime(item.created_at)}
                  </span>
                </div>
                <p className="text-gray-800 mb-2">{item.question}</p>
                {item.answer ? (
                  <div className="bg-gray-100 p-2 rounded-md text-green-700">
                    <strong>Answer:</strong> {item.answer}
                  </div>
                ) : (
                  <form
                    className="flex gap-2 mt-2"
                    onSubmit={(e) => {
                      e.preventDefault();
                      // TODO: handle submit answer
                      alert('Chức năng gửi câu trả lời chưa được cài đặt');
                    }}
                  >
                    <input
                      type="text"
                      name="answer"
                      className="flex-1 border border-gray-300 rounded px-3 py-1"
                      placeholder="Type your answer..."
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-1 rounded"
                    >
                      Reply
                    </button>
                  </form>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationList;
