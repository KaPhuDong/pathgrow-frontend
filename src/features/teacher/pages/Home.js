import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Main1 from './Main1';
import api from '../../../api/teacher/api';

function Home() {
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  // Fetch class list on first render
  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const data = await api.getClasses();
      setClasses(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Navigate to student list page with class info
  const handleClassClick = (cls) => {
    navigate('/teacher/list-student', {
      state: { classId: cls.id, className: cls.name },
    });
  };

  return (
    <Main1>
      <div className="vh-100">
        <div className="row h-100">
          {/* Sidebar */}
          <nav className="col-md-2 d-none d-md-block bg-white border-end p-3">
            <h4
              className="fw-bold mb-3"
              style={{ color: 'var(--primary)', fontWeight: '700' }}
            >
              Classes
            </h4>
            <ul className="nav flex-column">
              {classes.map((cls) => (
                <li className="nav-item mb-2" key={cls.id}>
                  <button
                    className="nav-link text-start px-2 py-1 rounded text-dark"
                    onClick={() => handleClassClick(cls)}
                    style={{
                      border: 'none',
                      background: 'none',
                      width: '100%',
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
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
            <h3
              className="fw-bold mb-4"
              style={{ color: 'var(--primary)', fontWeight: '700' }}
            >
              All Classes
            </h3>
            <div className="row g-4">
              {classes.map((cls) => (
                <div
                  className="col-12 col-sm-6 col-lg-4"
                  key={cls.id}
                  id={cls.slug}
                >
                  <div
                    className="class-card position-relative shadow-sm rounded overflow-hidden"
                    style={{
                      maxWidth: '250px',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleClassClick(cls)}
                  >
                    <div
                      className="class-card-top px-3 py-2"
                      style={{
                        backgroundColor: cls.color,
                        textAlign: 'center',
                      }}
                    >
                      <h6 className="fw-bold mb-1">{cls.name}</h6>
                      <div className="small">Students: {cls.students}</div>
                    </div>
                    <div
                      className="class-card-bottom bg-white"
                      style={{ height: '40px' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Main1>
  );
}

export default Home;
