import React, { Component } from 'react';
import './Header.css';
import { BrowserRouter , NavLink } from 'react-router-dom';
class Header extends Component {
    render() {
        return (
            <header className="header-student">
              <div className="container header-small d-flex align-items-center justify-content-between ">
                <a href="/" className="logo-brand d-flex align-items-center link-body-emphasis text-decoration-none">
                  <img src='/images/logo-path.png' className="bi me-2" width="64" height="64" aria-hidden="true" />
                  <span className="logo-name fs-40">PathGrow</span>
                </a>
                <ul className="nav nav-pills">
                  <li className="nav-item"><NavLink to="/student-profile" className="nav-link" aria-current="page">About me</NavLink></li>
                  <li className="nav-item"><NavLink to="/student-goals" className="nav-link">My Goals</NavLink></li>
                  <li className="nav-item"><NavLink to="/study-plans" className="nav-link">Study Plans</NavLink></li>
                  <li className="nav-item"><NavLink to="/learning-journal" className="nav-link">Learning Journal</NavLink></li>
                  <li className="nav-item"><NavLink to="/teacher-interaction" className="nav-link">Teacher Interaction</NavLink></li>
                </ul>
                <div className="icon">
                  <a href='/' className='icon-notification'>
                    <i className="fa-solid fa-bell"></i>
                  </a>
                  <i className="fa-solid fa-circle-user"></i>
                </div>
              </div>
            </header>
          
           
        );
    }
}

export default Header;