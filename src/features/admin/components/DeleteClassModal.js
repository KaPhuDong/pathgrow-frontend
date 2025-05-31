// src/components/DeleteClassModal.js
import React, { useState } from 'react';
import '../../../styles/components/deleteClassModalManagement.css';
import axios from 'axios';

const DeleteClassModal = ({
  isOpen,
  onClose,
  data = [],
  onDelete,
  tab = '',
  classId,
}) => {
  const [selectedIds, setSelectedIds] = useState([]);

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) return alert('Vui lòng chọn phần tử cần xoá');

    try {
      if (tab === 'subjects') {
        await axios.post(
          `http://localhost:8000/api/classesManagement/${classId}/remove-subjects`,
          { subjects: selectedIds }
        );
      } else if (tab === 'students') {
        await axios.post(
          `http://localhost:8000/api/classesManagement/remove-students`,
          { students: selectedIds }
        );
      } else if (tab === 'teachers') {
        await axios.post(
          `http://localhost:8000/api/classesManagement/remove-teachers`,
          { teachers: selectedIds }
        );
      }

      const updatedData = data.filter((item) => !selectedIds.includes(item.id));
      onDelete(updatedData);
      onClose();
    } catch (err) {
      console.error('Lỗi khi xoá:', err);
      alert('Xoá thất bại.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className='delete-class-modal'>
        <div className="modal">
          <h3>Delete {tab ? tab.charAt(0).toUpperCase() + tab.slice(1) : ''}</h3>

          <div className="delete-list">
            {data.map((item) => (
              <label key={item.id} className="delete-item">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(item.id)}
                  onChange={() => handleCheckboxChange(item.id)}
                />
                <span className="item-name">
                  {tab === 'subjects' ? item.name : `${item.name}`}
                </span>
              </label>
            ))}
          </div>

          <div className="modal-actions">
            <button className="btn cancel" onClick={onClose}>
              Cancel
            </button>
            <button className="btn delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
    </div>
  );
};

export default DeleteClassModal;
