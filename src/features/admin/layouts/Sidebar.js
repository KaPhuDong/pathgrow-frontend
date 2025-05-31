import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaChalkboardTeacher, FaHistory } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div
      className="d-flex flex-column bg-info text-white p-4 vh-100"
      style={{ width: '250px' }}
    >
      <h2 className="text-center fw-bold mb-5">Admin</h2>

      <nav className="nav flex-column gap-3">
        <a
          href="#"
          className="nav-link text-white d-flex align-items-center gap-2"
        >
          <FaUsers />
          <Link to="/admin/users/management" className="text-white">
            Users
          </Link>
        </a>
        <a
          href="#"
          className="nav-link text-white d-flex align-items-center gap-2"
        >
          <FaChalkboardTeacher />
          <Link to="/admin/classes/management" className="text-white">
            Classes
          </Link>
        </a>
        <a
          href="#"
          className="nav-link text-white d-flex align-items-center gap-2"
        >
          <FaHistory />
          <Link to="/admin/activity/logs" className="text-white">
            Activity Logs
          </Link>
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
