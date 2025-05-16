import React from 'react';

const NoteSection = () => (
  <div className="note-section">
    <p>
      <strong>Note:</strong> If you have any questions for the teacher or need
      help, feel free to include them here.
    </p>
    <textarea placeholder="I want you to check my goal" />
    <button className="send-button">Send</button>
  </div>
);

export default NoteSection;
