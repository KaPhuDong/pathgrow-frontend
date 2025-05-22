// src/components/DeleteModal.js
import React, { useState } from 'react';
import '../../../styles/components/deleteClassModalManagement.css';

const DeleteClassModal = ({ isOpen, onClose, data, onDelete, tab }) => {
  const [selectedIds, setSelectedIds] = useState([]);

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleDelete = () => {
    const updatedData = data.filter((item) => !selectedIds.includes(item.id));
    onDelete(updatedData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Delete {tab.charAt(0).toUpperCase() + tab.slice(1)}</h3>
        <div className="delete-list">
          {data.map((item) => (
            <label key={item.id} className="delete-item">
              <input
                type="checkbox"
                checked={selectedIds.includes(item.id)}
                onChange={() => handleCheckboxChange(item.id)}
              />
              {tab === 'subjects'
                ? `${item.subject} - ${item.teacher}`
                : `${item.name}`}
            </label>
          ))}
        </div>
        <div className="modal-actions">
          <button className="btn delete" onClick={handleDelete}>Delete</button>
          <button className="btn cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteClassModal;
