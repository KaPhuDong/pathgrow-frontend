import React from 'react';

const UserFilterDropdown = ({ filterRole, setFilterRole }) => {
  const getLabel = () => {
    if (filterRole === 'teacher') return 'Teachers';
    if (filterRole === 'student') return 'Students';
    return 'Teachers + Students';
  };

  return (
    <div className="dropdown">
      <button
        className="btn-filter"
        type="button"
        id="userTypeDropdown"
        data-toggle="dropdown"
        aria-expanded="false"
      >
        <span className="btn-text">{getLabel()}</span>
        <div className="btn-icon">
          <i className="fa-solid fa-chevron-down"></i>
        </div>
      </button>
      <ul className="dropdown-menu" aria-labelledby="userTypeDropdown">
        <li>
          <button
            className="dropdown-item"
            onClick={() => setFilterRole('all')}
          >
            Teachers + Students
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            onClick={() => setFilterRole('teacher')}
          >
            Teachers
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            onClick={() => setFilterRole('student')}
          >
            Students
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserFilterDropdown;
