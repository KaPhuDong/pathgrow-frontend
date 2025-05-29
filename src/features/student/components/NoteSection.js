import React, { useState } from 'react';
import api from '../../../api/student/api'; // đảm bảo có sendQuestion

const NoteSection = ({ userId, semesterId, subjectId, onSendSuccess }) => {
  const [questionText, setQuestionText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!questionText.trim()) return;
    try {
      setLoading(true);
      await api.sendQuestion({
        user_id: userId,
        semester_id: semesterId,
        subject_id: subjectId,
        question: questionText,
      });
      setQuestionText('');
      onSendSuccess?.();
    } catch (error) {
      alert('Gửi câu hỏi thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="note-section">
      <p><strong>Note:</strong> If you have any questions for the teacher or need help, include them here.</p>
      <textarea
        placeholder="I want you to check my goal"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        rows={4}
      />
      <button className="send-button" onClick={handleSend} disabled={loading}>
        {loading ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
};

export default NoteSection;
