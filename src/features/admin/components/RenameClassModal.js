import React, { useState } from 'react';
import '../../../styles/components/RenameClassModal.css';

const RenameClassModal = ({ isOpen, onClose, currentName, onRename }) => {
  const [newName, setNewName] = useState(currentName || '');

  const handleRename = () => {
    if (newName.trim() !== '') {
      onRename(newName.trim());
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="rename-modal-overlay">
      <div className="rename-modal-content">
        <h3>Rename Class</h3>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Enter new class name"
        />
        <div className="rename-modal-buttons">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="save-btn" onClick={handleRename}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default RenameClassModal;
