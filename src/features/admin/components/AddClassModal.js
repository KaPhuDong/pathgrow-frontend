// src/pages/ClassesManagement/components/AddClassModal.js

import React, { useState } from 'react';
import '../../../styles/components/addClassesManagement.css';

const AddClassModal = ({ onClose, onAddClass }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#cccccc');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert('Class name is required!');
      return;
    }

    onAddClass({
      name,
      color,
    });

    onClose(); // đóng modal sau khi thêm
  };

  return (
    <div className="modal-overlay">
      <div className="modal d-block">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Add new Class</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Class name
            <input
              type="text"
              placeholder="Enter your class name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Color (HEX)
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </label>
          <button type="submit" className="add-class-button">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddClassModal;
