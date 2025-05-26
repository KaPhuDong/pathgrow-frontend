import React, { useState, useEffect } from 'react';
import '../../../styles/components/addClassInfoModalManagement.css';

const AddInfoClassModal = ({ isOpen, onClose, availableItems, currentItems, onAdd, tab }) => {
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setSelectedIds([]);
    }
  }, [isOpen]);

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

  // Helper function to render item label based on tab
  const renderItemLabel = (item) => {
    switch (tab) {
      case 'subjects':
        return `${item.name} - ${item.description || 'No description'}`;
      case 'students':
        return `${item.name} (${item.email})`;
      case 'teachers':
        return `${item.name} (${item.email})`;
      default:
        return item.name || 'Unknown';
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal d-block">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Add {tab.charAt(0).toUpperCase() + tab.slice(1)}</h2>
        <form>
          {availableItems.length > 0 ? (
            availableItems.map((item) => (
              <label key={item.id} className="modal-item-label">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(item.id)}
                  onChange={() => handleCheckboxChange(item.id)}
                />
                {renderItemLabel(item)}
              </label>
            ))
          ) : (
            <p>No {tab} available to add.</p>
          )}
          <div className="modal-buttons">
            <button type="button" className="add-class-button" onClick={handleAdd} disabled={!selectedIds.length}>
              Add
            </button>
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInfoClassModal;