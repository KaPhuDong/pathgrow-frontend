import React, { useState } from 'react';
import api from '../../../api/student/api'; // đảm bảo có sendQuestion
const NoteSection = ({ userId, semesterId, subjectId, onSendSuccess }) => {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!userId) {
      console.error('userId không tồn tại');
      return;
    }
    const data = {
      user_id: userId,
      semester_id: semesterId,
      subject_id: subjectId,
      question: question,
      teacher_id: 2,
    };

    if (!question.trim()) return;
    try {
      setLoading(true);
      await api.sendQuestion(data);
      setQuestion('');
      onSendSuccess?.();
    } catch (error) {
      alert('Gửi câu hỏi thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="note-section">
      <p>
        <strong>Note:</strong> If you have any questions for the teacher or need
        help, include them here.
      </p>
      <textarea
        placeholder="I want you to check my goal"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        rows={4}
        style={{ outline: 'none', width: '100%' }}
      />
      <div className="text-right mb-2">
        <button className="send-button" onClick={handleSend} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
};

export default NoteSection;
