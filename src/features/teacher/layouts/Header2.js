import { useState } from 'react';
import logo from '../../../assets/images/logo.png';
import { NavLink, useParams } from 'react-router-dom';

const Header2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { studentId } = useParams(); // 👉 Lấy studentId từ URL

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header>
      <div className="student__header d-flex align-items-center justify-content-between">
        <NavLink
          to="/"
          className="logo-brand d-flex align-items-center NavLink-body-emphasis text-decoration-none"
        >
          <img
            src={logo}
            className="bi me-2"
            width="64"
            height="64"
            aria-hidden="true"
          />
          <span className="logo-name fs-40">PathGrow</span>
        </NavLink>
        <ul className="nav nav-pills">
          <li className="nav-item">
            <NavLink to="/teacher/home" className="nav-NavLink">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={`/teacher/view-student-profile/${studentId}`}
              className="nav-NavLink"
              aria-current="page"
            >
              About me
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={`/teacher/view-student-goals/${studentId}`}
              className="nav-NavLink"
            >
              Goals
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={`/teacher/view-student-study-plans/${studentId}`}
              className="nav-NavLink"
            >
              Study Plans
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={`/teacher/view-student-schedule/${studentId}`}
              className="nav-NavLink"
            >
              Schedule
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={`/teacher/view-student-achievements/${studentId}`}
              className="nav-NavLink"
            >
              Achievements
            </NavLink>
          </li>
        </ul>
        <div className="icon">
          <div className="account" id="account">
            <i
              className="fa-solid fa-circle-user account-icon"
              id="account-icon"
              onClick={toggleDropdown}
            ></i>

            <div
              className="dropdown-menu"
              id="dropdownMenu"
              style={{ display: isOpen ? 'block' : 'none' }}
            >
              <NavLink to="/logout">Log out</NavLink>
              <NavLink to="/student/account">Setting</NavLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header2;
