import { useState } from 'react';
import logo from '../../../assets/images/logo.png';
import { NavLink } from 'react-router-dom';

const Header1 = () => {
  const [isOpen, setIsOpen] = useState(false);

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
            <NavLink
              to="/teacher/home"
              className="nav-NavLink"
              aria-current="page"
            >
              Class
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/teacher/deadline" className="nav-NavLink">
              Deadline
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/teacher/schedule" className="nav-NavLink">
              Schedule
            </NavLink>
          </li>
        </ul>
        <div className="icon">
          <NavLink to="/" className="icon-notification">
            <i className="fa-solid fa-bell"></i>
          </NavLink>

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
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header1;
