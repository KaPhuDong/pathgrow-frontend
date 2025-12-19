// NotificationList.jsx
import React, { useState } from 'react';
import axios from 'axios';

const NotificationList = ({ notifications, onAnswerSubmit }) => {
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState({});
  const [localAnswered, setLocalAnswered] = useState({});

  const formatDateTime = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    if (isNaN(date)) return '';
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const handleInputChange = (e, id) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: e.target.value,
    }));
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    const answerText = answers[id]?.trim();
    if (!answerText) return;

    setLoading((prev) => ({ ...prev, [id]: true }));

    try {
      const token = localStorage.getItem('token');

      await axios.post(
        'https://pathgrow-backend-z6tf.onrender.com/api/goal-questions/teacher/answer-questions',
        {
          answers: [{ id, answer: answerText }],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLocalAnswered((prev) => ({ ...prev, [id]: answerText }));
      if (onAnswerSubmit) onAnswerSubmit(id, answerText);
      setAnswers((prev) => ({ ...prev, [id]: '' }));
    } catch (error) {
      console.error('Error submitting answer:', error);
      alert('Failed to submit answer.');
    } finally {
      setLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div className="space-y-4">
      {notifications.map((item) => {
        const user = item.user || {};
        return (
          <div
            key={item.id}
            className="bg-white p-4 shadow rounded-xl flex items-start gap-4"
          >
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <p className="font-semibold">{user.name || 'Unknown User'}</p>
                <span
                  className="text-sm text-gray-500"
                  style={{ color: 'var(--secondary)' }}
                >
                  {formatDateTime(item.createdAt || item.created_at)}
                </span>
              </div>

              <p className="text-gray-800 mb-2" style={{ fontSize: '18px' }}>
                "{item.question || ''}"
              </p>

              {item.answer || localAnswered[item.id] ? (
                <div className="bg-green-50 border border-green-200 p-2 rounded-md text-green-800">
                  <strong style={{ color: 'var(--primary)' }}>Answer:</strong>{' '}
                  {item.answer || localAnswered[item.id]}
                </div>
              ) : (
                <form
                  className="flex gap-2 mt-2"
                  onSubmit={(e) => handleSubmit(e, item.id)}
                >
                  <input
                    type="text"
                    value={answers[item.id] || ''}
                    onChange={(e) => handleInputChange(e, item.id)}
                    className="flex-1 border border-gray-300 rounded px-3 py-1"
                    placeholder="Type your answer..."
                  />
                  <button
                    type="submit"
                    disabled={loading[item.id]}
                    className={`px-4 py-1 rounded text-white ${
                      loading[item.id]
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    Reply
                  </button>
                </form>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NotificationList;
