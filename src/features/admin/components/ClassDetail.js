import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Main from "../pages/Main";
import AddInfoClassModal from "../components/AddInfoClassModal";
import DeleteModal from "../components/DeleteClassModal";
import RenameClassModal from "../components/RenameClassModal";
import "../../../styles/components/classDetailManagement.css";
import api from '../../../api/student/api';  // import api của bạn

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
  const [availableItems, setAvailableItems] = useState([]);

  // Fetch class detail
  useEffect(() => {
    // giả sử api.fetchClasses trả về tất cả lớp, ta lọc lấy lớp theo id
    api.fetchClasses()
      .then((data) => {
        const cls = data.find(c => c.id === +id);
        if (!cls) {
          alert("Không tìm thấy lớp.");
          return;
        }
        setName(cls.name);
        setSubjects(cls.subjects || []);
        setStudents(cls.students || []);
        setTeachers(cls.teachers || []);
      })
      .catch((err) => {
        console.error("Lỗi khi tải dữ liệu lớp:", err);
        alert("Không thể tải thông tin lớp.");
      });
  }, [id]);

  // Xóa lớp
  const handleDeleteClass = () => {
    if (!window.confirm(`Bạn có chắc chắn muốn xoá lớp "${name}" không?`)) return;

    api.deleteClass(id)
      .then(() => {
        alert(`Lớp "${name}" đã được xoá.`);
        navigate('/admin/classes/management');
      })
      .catch((error) => {
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
    (item.name || item.subject)?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tải danh sách có thể thêm
  const fetchAvailableItems = async () => {
    try {
      if (activeTab === "subjects") {
        const allSubjects = await api.fetchSubjects();
        return allSubjects.filter(
          (s) => !subjects.some((curr) => curr.id === s.id)
        );
      } else if (activeTab === "students" || activeTab === "teachers") {
        const role = activeTab === "students" ? "student" : "teacher";
        const users = await api.fetchUsersByRole(role);
        return users.filter(
          (u) => !tabData.some((curr) => curr.id === u.id)
        );
      }
    } catch (err) {
      console.error("Lỗi khi tải danh sách:", err);
      return [];
    }
  };

  const handleAddClick = async () => {
    const items = await fetchAvailableItems();
    setAvailableItems(items);
    setShowAddModal(true);
  };

  const handleSave = (updatedData) => {
    if (activeTab === "subjects") setSubjects(updatedData);
    else if (activeTab === "students") setStudents(updatedData);
    else if (activeTab === "teachers") setTeachers(updatedData);
  };

  // Thêm mục vào lớp
  const handleAddItems = async (updatedData) => {
    const selected = updatedData.filter(
      (item) => !tabData.some((curr) => curr.id === item.id)
    );
    const ids = selected.map((item) => item.id);

    try {
      if (activeTab === "subjects") {
        await api.addSubjectsToClass(id, ids);
        setSubjects(updatedData);
      } else if (activeTab === "students") {
        await api.addStudentsToClass(id, ids);
        setStudents(updatedData);
      } else if (activeTab === "teachers") {
        await api.addTeachersToClass(id, ids);
        setTeachers(updatedData);
      }
    } catch (err) {
      console.error("Lỗi khi thêm:", err);
      alert("Không thể thêm mục.");
    }
  };

  // Đổi tên lớp
  const handleRenameClass = (newName) => {
    api.renameClass(id, newName)
      .then(() => {
        setName(newName);
        alert("Đã đổi tên lớp.");
      })
      .catch((err) => {
        console.error("Lỗi khi đổi tên lớp:", err);
        alert("Không thể đổi tên lớp.");
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
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="detail-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="info-and-buttons">
            <div className="info-boxes">
              <div className={`info-box ${activeTab === "subjects" ? "active" : ""}`} onClick={() => setActiveTab("subjects")}>
                {subjects.length} <span>Subjects</span>
              </div>
              <div className={`info-box ${activeTab === "students" ? "active" : ""}`} onClick={() => setActiveTab("students")}>
                {students.length} <span>Students</span>
              </div>
              <div className={`info-box ${activeTab === "teachers" ? "active" : ""}`} onClick={() => setActiveTab("teachers")}>
                {teachers.length} <span>Responsible Teacher</span>
              </div>
            </div>
            <div className="btn-group">
              <button onClick={handleAddClick} className="btn add">Add</button>
              <button onClick={() => setShowDeleteModal(true)} className="btn delete">Delete</button>
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

        <AddInfoClassModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          tab={activeTab}
          availableItems={availableItems}
          currentItems={tabData}
          onAdd={handleAddItems}
        />

        <DeleteModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => {
            handleDeleteClass();
            setShowDeleteModal(false);
          }}
          title="Xóa lớp học"
          message={`Bạn có chắc muốn xóa lớp "${name}"?`}
        />

        <RenameClassModal
          isOpen={showRenameModal}
          onClose={() => setShowRenameModal(false)}
          currentName={name}
          onRename={handleRenameClass}
        />
      </div>
    </Main>
  );
};

export default ClassDetail;
