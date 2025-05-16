import React, { useEffect, useState } from 'react';
import Main from './Main';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../../api/teacher/api';

const ListStudent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { classId, className } = location.state || {};

  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getClasses = async () => {
      try {
        const data = await api.fetchAllClasses();
        setClasses(data);
      } catch (err) {
        console.error('Error fetching classes:', err);
      }
    };
    getClasses();
  }, []);

  useEffect(() => {
    if (!classId) {
      setError('Class information not found');
      return;
    }

    const getStudents = async () => {
      try {
        const res = await api.fetchStudentsByClass(classId);
        if (res.success) {
          setStudents(res.data);
          setError(null);
        } else {
          setError('API returned an error');
          setStudents([]);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    getStudents();
  }, [classId]);

  const handleClassClick = (cls) => {
    navigate('/teacher/list-student', {
      state: { classId: cls.id, className: cls.name },
    });
  };

  return (
    <Main>
      <div className="container-fluid vh-100">
        <div className="row h-100">
          {/* Sidebar */}
          <nav className="col-md-2 d-none d-md-block bg-white border-end p-3">
            <h4 className="fw-bold mb-3" style={{ color: '#00CED1' }}>
              Classes
            </h4>
            <ul className="nav flex-column">
              {classes.map((cls) => (
                <li className="nav-item mb-2" key={cls.id}>
                  <button
                    className="nav-link text-start px-2 py-1 rounded"
                    onClick={() => handleClassClick(cls)}
                    style={{
                      border: 'none',
                      backgroundColor:
                        classId === cls.id ? '#00ced1' : 'transparent',
                      color: classId === cls.id ? 'white' : 'black',
                      width: '100%',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontWeight: classId === cls.id ? '600' : '400',
                      fontSize: '0.95rem',
                      transition: 'background-color 0.3s, color 0.3s',
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
            <h3 className="fw-bold mb-4" style={{ color: '#00CED1' }}>
              Student List: {className || 'Unspecified'}
            </h3>

            {error ? (
              <p style={{ color: 'red' }}>Error: {error}</p>
            ) : (
              <table
                className="table table-bordered text-center"
                style={{ fontSize: '0.95rem' }}
              >
                <thead style={{ backgroundColor: '#00CED1', color: 'white' }}>
                  <tr>
                    <th style={{ width: '5%' }}>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th style={{ width: '20%' }}>Profile</th>
                  </tr>
                </thead>
                <tbody>
                  {students.length > 0 ? (
                    students.map((student, index) => (
                      <tr key={student.id}>
                        <td>{index + 1}</td>
                        <td>{student.name}</td>
                        <td>{student.email || 'Not updated'}</td>
                        <td>
                          <button
                            className="btn btn-sm"
                            style={{
                              backgroundColor: '#00CED1',
                              color: 'white',
                              padding: '2px 12px',
                              borderRadius: '20px',
                              fontSize: '0.85rem',
                              fontWeight: 'bold',
                            }}
                            onClick={() =>
                              navigate('/student/profile', {
                                state: { studentId: student.id },
                              })
                            }
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4}>No students in this class</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </Main>
  );
};

export default ListStudent;
