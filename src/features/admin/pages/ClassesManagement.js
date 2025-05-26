import React, { useEffect, useState } from 'react';
import '../../../styles/pages/classesManagement.css';
import Main from './Main';
import AddClassModal from '../components/AddClassModal';
import ClassCard from '../components/ClassCard';
import { NavLink } from 'react-router-dom';
import api from '../../../api/student/api';

const Header = ({ onNewClassClick, searchTerm, onSearchChange }) => (
  <div className="header">
    <div className="title-class">
      <h1>Classes Management</h1>
      <NavLink to="/logout" className="logout">Log out →</NavLink>
    </div>
    <div className="header-controls">
      <button className="new-class" onClick={onNewClassClick}>+ New Class</button>
      <input
        type="text"
        placeholder="Tìm kiếm theo tên hoặc số học sinh..."
        className="search"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  </div>
);

const ClassList = ({ classes }) => (
  <div className="class-list">
    {classes.length === 0 ? (
      <p style={{ textAlign: 'center', marginTop: '2rem' }}>Không tìm thấy lớp phù hợp.</p>
    ) : (
      classes.map((classItem) => (
        <ClassCard
          key={classItem.id}
          id={classItem.id}
          name={classItem.name}
          slug={classItem.slug}
          teacher="Trống thông tin"
          color={classItem.color}
        />
      ))
    )}
  </div>
);

function ClassesManagement() {
  const [showModal, setShowModal] = useState(false);
  const [classes, setClasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = () => {
    api.fetchClasses
      .then(response => setClasses(response.data))
      .catch(error => console.error('Lỗi khi lấy danh sách lớp học:', error));
  };

  const handleAddClass = (newClass) => {
    api.post('/classesManagement', {
      name: newClass.name,
      color: newClass.color,
    })
    .then(() => {
      fetchClasses();
      handleCloseModal();
    })
    .catch(error => {
      console.error('Lỗi khi thêm lớp học:', error);
      alert('Không thể thêm lớp học. Vui lòng kiểm tra dữ liệu.');
    });
  };

  const filteredClasses = classes.filter((cls) => {
    const term = searchTerm.toLowerCase();
    const nameMatch = cls.name.toLowerCase().includes(term);
    const studentsMatch = !isNaN(term) && cls.students === parseInt(term);
    return nameMatch || studentsMatch;
  });

  return (
    <Main>
      <div className="container-classesManagement">
        <div className="main-classesManagement">
          <Header
            onNewClassClick={handleOpenModal}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          <ClassList classes={filteredClasses} />
        </div>
        {showModal && (
          <AddClassModal
            onClose={handleCloseModal}
            onAddClass={handleAddClass}
          />
        )}
      </div>
    </Main>
  );
}

export default ClassesManagement;
