import React, { useEffect, useState } from 'react';
import Main from './Main';
import axios from 'axios';

function Home() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8000/api/classes')
      .then(res => setClasses(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleClassClick = (cls) => {
    setSelectedClass(cls);
    setLoadingStudents(true);
    axios.get(`http://localhost:8000/api/classes/${cls.id}/students`)
      .then(res => {
        setStudents(res.data);
        setLoadingStudents(false);
      })
      .catch(err => {
        console.error(err);
        setLoadingStudents(false);
      });
  };

  const handleBackToAllClasses = () => {
    setSelectedClass(null);
    setStudents([]);
  };

  return (
    <Main>
      <div className="container-fluid vh-100">
        <div className="row h-100">
          {/* Sidebar */}
          <nav className="col-md-2 d-none d-md-block bg-white border-end p-3">
            <h4 className="text-primary fw-bold mb-3">Lớp học</h4>
            <ul className="nav flex-column">
              {classes.map(cls => (
                <li className="nav-item mb-2" key={cls.id}>
                  <button
                    className={`nav-link text-start px-2 py-1 rounded ${
                      selectedClass?.id === cls.id ? 'bg-info text-white' : 'text-dark'
                    }`}
                    onClick={() => handleClassClick(cls)}
                    style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
                  >
                    {cls.name}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-3 border-top text-center text-muted small">
              © 2025 PNV – PathGrow
            </div>
          </nav>

          {/* Main Content */}
          <div className="col-md-10 p-4">
            {!selectedClass && (
              <>
                <h3 className="fw-bold text-info mb-4">Tất cả các lớp</h3>
                <div className="row g-4">
                  {classes.map(cls => (
                    <div
                      className="col-12 col-sm-6 col-lg-4"
                      key={cls.id}
                      id={cls.slug}
                    >
                      <div
                        className={`class-card position-relative shadow-sm rounded overflow-hidden ${
                          selectedClass?.id === cls.id ? 'border border-primary' : ''
                        }`}
                        style={{
                          maxWidth: '250px',
                          fontSize: '0.9rem',
                          cursor: 'pointer',
                        }}
                        onClick={() => handleClassClick(cls)}
                      >
                        <div
                          className="class-card-top px-3 py-2"
                          style={{ backgroundColor: cls.color, textAlign: 'center' }}
                        >
                          <h6 className="fw-bold mb-1">{cls.name}</h6>
                          <div className="small">Student: {cls.students}</div>
                        </div>
                        <div className="class-card-bottom bg-white" style={{ height: '40px' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {selectedClass && (
              <>
                <button
                  className="btn btn-secondary mb-3"
                  onClick={handleBackToAllClasses}
                >
                  ← Quay lại danh sách lớp
                </button>
                <h3 className="fw-bold text-info mb-4">Danh sách sinh viên lớp {selectedClass.name}</h3>
                {loadingStudents ? (
                  <p>Đang tải danh sách sinh viên...</p>
                ) : students.length > 0 ? (
                  <ul className="list-group">
                    {students.map(student => (
                      <li key={student.id} className="list-group-item">
                        {student.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Chưa có sinh viên trong lớp này.</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Main>
  );
}

export default Home;
