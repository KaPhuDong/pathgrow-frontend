import React, { useEffect, useState } from 'react';
import Main from './Main';
import axios from 'axios';

function Home() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/classes')
      .then((res) => setClasses(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Main>
      <div className="container-fluid vh-100">
        <div className="row h-100">
          {/* Sidebar */}
          <nav className="col-md-2 d-none d-md-block bg-white border-end p-3">
            <h4 className="text-primary fw-bold mb-3">Lớp học</h4>
            <ul className="nav flex-column">
              {classes.map((cls) => (
                <li className="nav-item mb-2" key={cls.id}>
                  <a
                    className="nav-link text-dark px-2 py-1 rounded hover"
                    href={`#${cls.slug}`}
                  >
                    {cls.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-3 border-top text-center text-muted small">
              © 2025 PNV – PathGrow
            </div>
          </nav>

          {/* Main Content */}
          <div className="col-md-10 p-4">
            <h3 className="fw-bold text-info mb-4">Class</h3>
            <div className="row g-4">
              {classes.map((cls) => (
                <div className="col-12 col-sm-6 col-lg-4" key={cls.id} id={cls.slug}>
                  <div
                    className="class-card position-relative shadow-sm rounded overflow-hidden"
                    style={{ maxWidth: '250px', fontSize: '0.9rem' }}
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
          </div>
        </div>
      </div>
    </Main>
  );
}

export default Home;
