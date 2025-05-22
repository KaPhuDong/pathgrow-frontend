import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Main from '../pages/Main';
import AddInfoClassModal from '../components/AddInfoClassModal';
import DeleteModal from '../components/DeleteClassModal';
import RenameClassModal from '../components/RenameClassModal';
import '../../../styles/components/classDetailManagement.css';

let mockData = {
  subjects: [
    { id: 1, subject: 'IT English'},
    { id: 2, subject: 'TOEIC'},
    { id: 3, subject: 'Communication'},
  ],
  students: [
    { id: 1, name: 'Ka Phu Đông', email: '' },
    { id: 2, name: 'Bho Nuoch Thi Hoài Tiên', email: '' },
    { id: 3, name: 'Coor Chăng', email: '' },
  ],
  teachers: [
    { id: 1, name: 'Trần Thị Phương Uyên', email: '' },
    { id: 2, name: 'Lê Nguyễn Phúc Nhân', email: '' },
  ],
};

const availableSubjects = [
  { id: 101, subject: 'Web Development', teacher: 'Nguyễn Văn A' },
  { id: 102, subject: 'Data Science', teacher: 'Nguyễn Văn B' },
  { id: 103, subject: 'Web Development', teacher: 'Nguyễn Văn C' },
  { id: 104, subject: 'Data Science', teacher: 'Nguyễn Văn D' },
];
const availableStudents = [
  { id: 201, name: 'Nguyễn Văn Sinh', email: 'sinh@gamil.com' },
  { id: 202, name: 'Lê Thị Học', email: 'hoc@gamil.com' },
  { id: 203, name: 'Nguyễn Văn Tuyết', email: 'sinh@gamil.com' },
  { id: 204, name: 'Lê Thị Hợi', email: 'hoc@gamil.com' },
];
const availableTeachers = [
  { id: 301, name: 'Trần Quang Linh', email: '' },
  { id: 302, name: 'Trần Quang Tuấn', email: '' },
  { id: 303, name: 'Trần Quang Võ', email: '' },
];

const ClassDetail = () => {
  const { className } = useParams();
  const [name, setName] = useState(className);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('subjects');

  const [subjects, setSubjects] = useState(mockData.subjects);
  const [students, setStudents] = useState(mockData.students);
  const [teachers, setTeachers] = useState(mockData.teachers);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const handleDelete = () => setShowDeleteModal(true);
  const handleAdd = () => setShowAddModal(true);



  const handleSave = (updatedData) => {
    if (activeTab === 'subjects') setSubjects(updatedData);
    else if (activeTab === 'students') setStudents(updatedData);
    else if (activeTab === 'teachers') setTeachers(updatedData);
  };

  const handleDeleteConfirmed = (updatedData) => {
    if (activeTab === 'subjects') setSubjects(updatedData);
    else if (activeTab === 'students') setStudents(updatedData);
    else if (activeTab === 'teachers') setTeachers(updatedData);
  };

  const handleAddItems = (newData) => {
    if (activeTab === 'subjects') setSubjects(newData);
    else if (activeTab === 'students') setStudents(newData);
    else if (activeTab === 'teachers') setTeachers(newData);
  };

  const handleDeleteClass = () => {
    // Placeholder: Replace with actual delete logic
    alert(`Class "${className}" deleted.`);
    navigate('/admin/classes');
  };

  const tabData = activeTab === 'subjects' ? subjects : activeTab === 'students' ? students : teachers;

  return (
    <Main>
      <div className="class-detail-container">
        <div className="header-with-options">
          <h2>Class Detail {name}</h2>
          <div className="options-menu">
            <button onClick={() => setShowOptions(!showOptions)}>⋮</button>
            {showOptions && (
              <ul className="dropdown-options">
                <li onClick={() => {
                  setShowRenameModal(true);
                  setShowOptions(false);
                }}>
                  Rename class
                </li>
                <li onClick={() => {
                  handleDeleteClass();
                  setShowOptions(false);
                }}>
                  Delete class
                </li>
              </ul>
            )}
          </div>
        </div>

        <div className="detail-header">
          <input type="text" placeholder="Tìm kiếm..." className="detail-search" />

          <div className="info-and-buttons">
            <div className="info-boxes">
              <div
                className={`info-box ${activeTab === 'subjects' ? 'active' : ''}`}
                onClick={() => setActiveTab('subjects')}
              >
                {subjects.length} <span>Subjects</span>
              </div>
              <div
                className={`info-box ${activeTab === 'students' ? 'active' : ''}`}
                onClick={() => setActiveTab('students')}
              >
                {students.length} <span>Students</span>
              </div>
              <div
                className={`info-box ${activeTab === 'teachers' ? 'active' : ''}`}
                onClick={() => setActiveTab('teachers')}
              >
                {teachers.length} <span>Responsible Teacher</span>
              </div>
            </div>

            <div className="btn-group">
              <button onClick={handleAdd} className="btn add">Add</button>
              <button onClick={handleDelete} className="btn delete">Delete</button>
            </div>
          </div>
        </div>

        <table className="subject-table">
          <thead>
            <tr>
              <th>STT</th>
              {activeTab === 'subjects' && (
                <>
                  <th>Subject</th>
                  {/* <th>Teacher</th> */}
                </>
              )}
              {activeTab === 'students' && (
                <>
                  <th>Students</th>
                  <th>Email</th>
                </>
              )}
              {activeTab === 'teachers' && (
                <>
                  <th>Teacher</th>
                  <th>Email</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {tabData.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                {activeTab === 'subjects' && (
                  <>
                    <td>{item.subject}</td>
                    {/* <td>{item.teacher}</td> */}
                  </>
                )}
                {activeTab === 'students' && (
                  <>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                  </>
                )}
                {activeTab === 'teachers' && (
                  <>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modals */}
        <AddInfoClassModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          tab={activeTab}
          availableItems={
            activeTab === 'subjects' ? availableSubjects :
            activeTab === 'students' ? availableStudents :
            availableTeachers
          }
          currentItems={tabData}
          onAdd={handleAddItems}
        />

        <DeleteModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          data={tabData}
          onDelete={handleDeleteConfirmed}
          tab={activeTab}
        />

        <RenameClassModal
          isOpen={showRenameModal}
          onClose={() => setShowRenameModal(false)}
          currentName={name}
          onRename={(newName) => setName(newName)} // 👈 Không navigate nữa
        />

      </div>
    </Main>
  );
};

export default ClassDetail;
