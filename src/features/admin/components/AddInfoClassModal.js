import React, { useState } from 'react';
import '../../../styles/components/addClassInfoModalManagement.css';

const AddInfoClassModal = ({ isOpen, onClose, availableItems, currentItems, onAdd, tab }) => {
  const [selectedIds, setSelectedIds] = useState([]);

  if (!isOpen) return null;

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleAdd = () => {
    const newItems = availableItems.filter(
      (item) => selectedIds.includes(item.id) && !currentItems.some((curr) => curr.id === item.id)
    );
    onAdd([...currentItems, ...newItems]);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal d-block">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Add new {tab}</h2>
        <form>
          {availableItems.map((item) => (
            <label key={item.id}>
              <input
                type="checkbox"
                checked={selectedIds.includes(item.id)}
                onChange={() => handleCheckboxChange(item.id)}
              />
              {tab === 'subjects' && `${item.subject} - ${item.teacher}`}
              {tab === 'students' && item.name}
              {tab === 'teachers' && item.name}
            </label>
          ))}
          <button type="button" className="add-class-button" onClick={handleAdd}>
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddInfoClassModal;
