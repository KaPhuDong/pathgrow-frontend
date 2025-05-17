import React from 'react';
import { FaUsers, FaChalkboardTeacher, FaHistory } from 'react-icons/fa';

const AdminSidebar = () => {
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
          <span>Users</span>
        </a>
        <a
          href="#"
          className="nav-link text-white d-flex align-items-center gap-2"
        >
          <FaChalkboardTeacher />
          <span>Classes</span>
        </a>
        <a
          href="#"
          className="nav-link text-white d-flex align-items-center gap-2"
        >
          <FaHistory />
          <span>Activity Logs</span>
        </a>
      </nav>
    </div>
  );
};

export default AdminSidebar;
