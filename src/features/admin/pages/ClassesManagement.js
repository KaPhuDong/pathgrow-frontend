import React, { useEffect, useState } from 'react';
import '../../../styles/pages/classesManagement.css';
import Main from './Main';
import AddClassModal from '../components/AddClassModal';
import ClassCard from '../components/ClassCard';
import { NavLink } from 'react-router-dom';
import api from '../../../api/admin/api';

const Header = ({ onNewClassClick, searchTerm, onSearchChange }) => (
  <div className="header">
    <div className="title-class">
      <h1>Classes Management</h1>
      <NavLink to="/logout" className="logout">
        Log out →
      </NavLink>
    </div>
    <div className="header-controls">
      <button className="new-class" onClick={onNewClassClick}>
        + New Class
      </button>
      <input
        type="text"
        placeholder="Search by name or student..."
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
      <p style={{ textAlign: 'center', marginTop: '2rem' }}>
        Không tìm thấy lớp phù hợp.
      </p>
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    setCurrentPage(1); // Reset page khi search
  }, [searchTerm]);

  const fetchClasses = () => {
    api
      .fetchClasses()
      .then((data) => setClasses(data))
      .catch((error) => console.error('Failed to fetch the class list:', error));
  };

  const handleAddClass = (newClass) => {
    api
      .addClass({
        name: newClass.name,
        color: newClass.color,
      })
      .then(() => {
        fetchClasses();
        handleCloseModal();
      })
      .catch((error) => {
        console.error('Failed to add class:', error);
        alert('Failed to add the class. Please review the data.');
      });
  };

  const filteredClassesAll = classes.filter((cls) => {
    const term = searchTerm.toLowerCase();
    const nameMatch = cls.name.toLowerCase().includes(term);
    const studentsMatch = !isNaN(term) && cls.students === parseInt(term);
    return nameMatch || studentsMatch;
  });

  const totalPages = Math.ceil(filteredClassesAll.length / itemsPerPage);
  const paginatedClasses = filteredClassesAll.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Main>
      <div className="container-classesManagement">
        <div className="main-classesManagement">
          <Header
            onNewClassClick={handleOpenModal}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          <ClassList classes={paginatedClasses} />

          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                &lt; Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={currentPage === i + 1 ? 'active' : ''}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next &gt;
              </button>
            </div>
          )}
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
