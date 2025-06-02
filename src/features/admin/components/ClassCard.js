import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/pages/classesManagement.css';

const ClassCard = ({ id, name, teacher, color }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/admin/classes/management/${id}`); // ✅ Dùng ID để điều hướng
  };

  return (
    <div
      className="class-card"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="class-card-top" style={{ backgroundColor: color }}>
        <div className="class-info">
          <strong>{name}</strong>
        </div>
      </div>
      <div className="class-card-bottom"></div>
    </div>
  );
};

export default ClassCard;
