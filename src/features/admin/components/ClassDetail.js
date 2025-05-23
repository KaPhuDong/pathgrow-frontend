// src/pages/ClassDetail.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Main from "../pages/Main";
import AddInfoClassModal from "../components/AddInfoClassModal";
import DeleteModal from "../components/DeleteClassModal";
import RenameClassModal from "../components/RenameClassModal";
import "../../../styles/components/classDetailManagement.css";

const ClassDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [activeTab, setActiveTab] = useState("subjects");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/classesManagement/${id}`)
      .then((res) => {
        const data = res.data;
        setName(data.name);
        setSubjects(data.subjects || []);
        setStudents(data.students || []);
        setTeachers(data.teachers || []);
      })
      .catch((err) => {
        console.error("Lỗi khi tải dữ liệu lớp:", err);
        alert("Không thể tải thông tin lớp.");
      });
  }, [id]);

  const handleDeleteClass = () => {
    if (!window.confirm(`Bạn có chắc chắn muốn xoá lớp "${name}" không?`)) return;

    axios.delete(`http://localhost:8000/api/classesManagement/${id}`)
      .then(() => {
        alert(`Lớp "${name}" đã được xoá.`);
        navigate('/admin/classes/management');
      })
      .catch(error => {
        console.error('Lỗi khi xoá lớp:', error);
        alert('Không thể xoá lớp.');
      });
  };

  const tabData =
    activeTab === "subjects"
      ? subjects
      : activeTab === "students"
      ? students
      : teachers;

  const filteredData = tabData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = (updatedData) => {
    if (activeTab === "subjects") setSubjects(updatedData);
    else if (activeTab === "students") setStudents(updatedData);
    else if (activeTab === "teachers") setTeachers(updatedData);
  };

  const handleDeleteConfirmed = handleSave;
  const handleAddItems = handleSave;

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
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="detail-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="info-and-buttons">
            <div className="info-boxes">
              <div
                className={`info-box ${activeTab === "subjects" ? "active" : ""}`}
                onClick={() => setActiveTab("subjects")}
              >
                {subjects.length} <span>Subjects</span>
              </div>
              <div
                className={`info-box ${activeTab === "students" ? "active" : ""}`}
                onClick={() => setActiveTab("students")}
              >
                {students.length} <span>Students</span>
              </div>
              <div
                className={`info-box ${activeTab === "teachers" ? "active" : ""}`}
                onClick={() => setActiveTab("teachers")}
              >
                {teachers.length} <span>Responsible Teacher</span>
              </div>
            </div>
            <div className="btn-group">
              <button onClick={() => setShowAddModal(true)} className="btn add">
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
              {activeTab === "subjects" && <th>Subject</th>}
              {activeTab === "students" && (
                <>
                  <th>Student</th>
                  <th>Email</th>
                </>
              )}
              {activeTab === "teachers" && (
                <>
                  <th>Teacher</th>
                  <th>Email</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
  {filteredData.length > 0 ? (
    filteredData.map((item, index) => (
      <tr key={item.id}>
        <td>{index + 1}</td>
        {activeTab === "subjects" && <td>{item.name}</td>}
        {activeTab === "students" && (
          <>
            <td>{item.name}</td>
            <td>{item.email}</td>
          </>
        )}
        {activeTab === "teachers" && (
          <>
            <td>{item.name}</td>
            <td>{item.email}</td>
          </>
        )}
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={activeTab === "subjects" ? 2 : 3} style={{ textAlign: "center", padding: "20px" }}>
        Không tìm thấy kết quả phù hợp.
      </td>
    </tr>
  )}
</tbody>

        </table>

        {/* Modals */}
        <AddInfoClassModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          tab={activeTab}
          availableItems={[]}
          currentItems={tabData}
          onAdd={handleAddItems}
        />

        <DeleteModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          data={filteredData}
          onDelete={handleDeleteConfirmed}
          tab={activeTab}
          classId={id}
        />

        <RenameClassModal
          isOpen={showRenameModal}
          onClose={() => setShowRenameModal(false)}
          currentName={name}
          onRename={(newName) => {
            axios
              .put(`http://localhost:8000/api/classesManagement/${id}`, {
                name: newName,
              })
              .then(() => {
                setName(newName);
                alert("Đã đổi tên lớp.");
              })
              .catch((err) => {
                console.error("Lỗi khi đổi tên lớp:", err);
                alert("Không thể đổi tên lớp.");
              });
          }}
        />
      </div>
    </Main>
  );
};

export default ClassDetail;
