import { useState, useEffect, useContext } from 'react';
import logo from '../../../assets/images/logo.png';
import { NavLink } from 'react-router-dom';
import { NotificationContext } from '../components/NotificationContext';
import api from '../../../api/teacher/api'; 
const Header1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { unreadCount, setUnreadCount } = useContext(NotificationContext);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchUnreadQuestions = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.warn('Missing token');
          return;
        }

        // Gọi API có gắn header Authorization
        const response = await api.fetchUnreadQuestions({
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUnreadCount(response.unread || 0);
      } catch (error) {
        console.error('Failed to fetch unread questions', error);
      }
    };

    fetchUnreadQuestions();
    const interval = setInterval(fetchUnreadQuestions, 30000);
    return () => clearInterval(interval);
  }, [setUnreadCount]);

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
            alt="Logo"
            aria-hidden="true"
          />
          <span className="logo-name fs-40">PathGrow</span>
        </NavLink>

        <ul className="nav nav-pills">
          <li className="nav-item">
            <NavLink to="/teacher/home" className="nav-NavLink">Class</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/teacher/deadline" className="nav-NavLink">Deadline</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/teacher/schedule" className="nav-NavLink">Schedule</NavLink>
          </li>
        </ul>

        <div className="icon d-flex align-items-center gap-3">
          <NavLink to="/teacher/notifications" className="icon-notification position-relative">
            <i className="fa-solid fa-bell"></i>
            {unreadCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {unreadCount}
              </span>
            )}
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
              <NavLink to="/logout" className="dropdown-item">
                Log out
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header1;
