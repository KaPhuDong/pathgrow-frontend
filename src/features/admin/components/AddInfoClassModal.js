import React, { useState, useEffect } from 'react';
import '../../../styles/components/addClassInfoModalManagement.css';

const AddInfoClassModal = ({
  isOpen,
  onClose,
  availableItems,
  currentItems,
  onAdd,
  tab,
}) => {
  const [selectedIds, setSelectedIds] = useState([]);

  // Reset selections when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedIds([]);
    }
  }, [isOpen]);

  // If modal is closed, do not render anything
  if (!isOpen) return null;

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleAddClick = () => {
    const newItems = availableItems.filter(
      (item) =>
        selectedIds.includes(item.id) &&
        !currentItems.some((existing) => existing.id === item.id)
    );

    onAdd([...currentItems, ...newItems]);
    onClose();
  };

  const renderItemLabel = (item) => {
    return item.name || 'Unknown';
  };

  const toUpperCaseFirstLetter = (word) =>
    word ? word.charAt(0).toUpperCase() + word.slice(1) : '';

  return (
    <div className="modal-overlay">
      <div className="modal d-block">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2>Add {toUpperCaseFirstLetter(tab)}</h2>

        <form>
          {availableItems.length > 0 ? (
            availableItems.map((item) => (
              <label
                key={item.id}
                className="modal-item-label d-flex flex-row align-items-center"
              >
                <input
                  type="checkbox"
                  checked={selectedIds.includes(item.id)}
                  onChange={() => handleCheckboxChange(item.id)}
                  style={{ maxWidth: '30px', margin: '0' }}
                />
                {renderItemLabel(item)}
              </label>
            ))
          ) : (
            <p>No {tab} available to add.</p>
          )}

          <div className="modal-buttons">
            <button
              type="button"
              className="add-class-button"
              onClick={handleAddClick}
              disabled={selectedIds.length === 0}
            >
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
