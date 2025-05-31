import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Main from '../pages/Main';
import AddInfoClassModal from '../components/AddInfoClassModal';
import DeleteClassModal from '../components/DeleteClassModal';
import RenameClassModal from '../components/RenameClassModal';
import ToastNotification from '../../../components/ui/ToastNotification';
import ConfirmDelete from '../../../components/ui/ConfirmDelete';
import api from '../../../api/admin/api';

import '../../../styles/components/classDetailManagement.css';

const ITEMS_PER_PAGE = 6;

const ClassDetail = () => {
  const [toastMessage, setToastMessage] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [activeTab, setActiveTab] = useState('subjects');

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [availableItems, setAvailableItems] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    api
      .fetchClassById(id)
      .then((data) => {
        if (!data) {
          setToastMessage('Class not found.');
          return;
        }
        setName(data.name);
        setSubjects(Array.isArray(data.subjects) ? data.subjects : []);
        setStudents(Array.isArray(data.students) ? data.students : []);
        setTeachers(Array.isArray(data.teachers) ? data.teachers : []);
      })
      .catch((err) => {
        console.error('Error loading class data:', err);
        setToastMessage('Failed to load class information.');
      });
  }, [id]);

  useEffect(() => {
    setCurrentPage(1); // Reset về trang 1 khi đổi tab hoặc search
  }, [activeTab, searchTerm]);

  const handleDeleteClass = () => {
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    api
      .deleteClass(id)
      .then(() => {
        setToastMessage(`The class "${name}" has been deleted.`);
        navigate('/admin/classes/management');
      })
      .catch((error) => {
        console.error('Error deleting class:', error);
        setToastMessage('Failed to delete the class.');
      })
      .finally(() => {
        setShowConfirm(false);
      });
  };

  const cancelDelete = () => {
    setShowConfirm(false);
  };

  const tabData =
    activeTab === 'subjects'
      ? subjects
      : activeTab === 'students'
      ? students
      : teachers;

  const filteredData = tabData.filter((item) =>
    (item.name || item.subject || '')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const fetchAvailableItems = async () => {
    try {
      if (activeTab === 'subjects') {
        const allSubjects = await api.fetchSubjects();
        return allSubjects.data;
      } else {
        const role = activeTab === 'students' ? 'student' : 'teacher';
        const users = await api.fetchUsersByRole(role);
        return users;
      }
    } catch (err) {
      console.error('Error loading the list:', err);
      return [];
    }
  };

  const handleAddClick = async () => {
    const items = await fetchAvailableItems();
    setAvailableItems(items);
    setShowAddModal(true);
  };

  const handleAddItems = async (updatedData) => {
    const selected = updatedData.filter(
      (item) => !tabData.some((curr) => curr.id === item.id)
    );
    const ids = selected.map((item) => item.id);

    try {
      if (activeTab === 'subjects') {
        await api.addSubjectsToClass(id, ids);
        setSubjects(updatedData);
        setToastMessage('Subjects added successfully.');
      } else if (activeTab === 'students') {
        await api.addStudentsToClass(id, ids);
        setStudents(updatedData);
        setToastMessage('Students added successfully.');
      } else if (activeTab === 'teachers') {
        await api.addTeachersToClass(id, ids);
        setTeachers(updatedData);
        setToastMessage('Teachers added successfully.');
      }
    } catch (err) {
      console.error('Error adding:', err);
      setToastMessage('This user is already added.');
    }
  };

  const handleRenameClass = (newName) => {
    api
      .renameClass(id, newName)
      .then(() => {
        setName(newName);
        setToastMessage('Class renamed successfully.');
      })
      .catch((err) => {
        console.error('Error renaming class:', err);
        setToastMessage('Failed to rename the class.');
      });
  };

  return (
    <Main>
      <div className="class-detail-container">
        <div className="header-with-options">
          <h2>Class Detail {name}</h2>
          <div className="options-menu">
            <button onClick={() => setShowOptions(!showOptions)}>⋮</button>
            {showOptions && (
              <ul className="dropdown-options">
                <li
                  onClick={() => {
                    setShowRenameModal(true);
                    setShowOptions(false);
                  }}
                >
                  Rename class
                </li>
                <li
                  onClick={() => {
                    handleDeleteClass();
                    setShowOptions(false);
                  }}
                >
                  Delete class
                </li>
              </ul>
            )}
          </div>
        </div>

        <div className="detail-header">
          <input
            type="text"
            placeholder="Searching..."
            className="detail-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="info-and-buttons">
            <div className="info-boxes">
              {['subjects', 'students', 'teachers'].map((tab) => (
                <div
                  key={tab}
                  className={`info-box ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === 'subjects'
                    ? subjects.length
                    : tab === 'students'
                    ? students.length
                    : teachers.length}
                  <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
                </div>
              ))}
            </div>
            <div className="btn-group">
              <button onClick={handleAddClick} className="btn add">
                Add
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="btn delete"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        <table className="subject-table">
          <thead>
            <tr>
              <th>STT</th>
              {activeTab === 'subjects' && <th>Subject</th>}
              {(activeTab === 'students' || activeTab === 'teachers') && (
                <>
                  <th>
                    {activeTab.slice(0, -1).charAt(0).toUpperCase() +
                      activeTab.slice(1, -1)}
                  </th>
                  <th>Email</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr key={item.id}>
                  <td>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                  {activeTab === 'subjects' && <td>{item.name}</td>}
                  {(activeTab === 'students' || activeTab === 'teachers') && (
                    <>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={activeTab === 'subjects' ? 2 : 3}
                  style={{ textAlign: 'center', padding: '20px' }}
                >
                  No matching results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className="pagination-container">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              &lt; Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={currentPage === i + 1 ? 'active' : ''}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next &gt;
            </button>
          </div>
        )}

        {/* Modals */}
        <AddInfoClassModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          tab={activeTab}
          availableItems={availableItems}
          currentItems={tabData}
          onAdd={handleAddItems}
        />

        <DeleteClassModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          data={tabData}
          onDelete={(updatedData) => {
            if (activeTab === 'subjects') setSubjects(updatedData);
            else if (activeTab === 'students') setStudents(updatedData);
            else if (activeTab === 'teachers') setTeachers(updatedData);
          }}
          tab={activeTab}
          classId={id}
        />

        <RenameClassModal
          isOpen={showRenameModal}
          onClose={() => setShowRenameModal(false)}
          onRename={handleRenameClass}
          currentName={name}
        />
      </div>
      {toastMessage && (
        <ToastNotification
          message={toastMessage}
          onClose={() => setToastMessage('')}
        />
      )}
      {showConfirm && (
        <ConfirmDelete
          title="Delete Class"
          message={`Are you sure you want to delete the class "${name}"?`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </Main>
  );
};

export default ClassDetail;
