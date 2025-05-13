import React, { Component } from 'react';

import logo from '../../assets/images/logo.png';
import { NavLink } from 'react-router-dom';

class Header extends Component {
  render() {
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
                to="/student/profile"
                className="nav-NavLink"
                aria-current="page"
              >
                About me
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/student/goals" className="nav-NavLink">
                My Goals
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/study/plans" className="nav-NavLink">
                Study Plans
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="#" className="nav-NavLink">
                Learning Journal
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="#" className="nav-NavLink">
                Teacher Interaction
              </NavLink>
            </li>
          </ul>
          <div className="icon">
            <NavLink to="/" className="icon-notification">
              <i className="fa-solid fa-bell"></i>
            </NavLink>
            <NavLink to="#" className="icon-user">
              <i className="fa-solid fa-circle-user"></i>
            </NavLink>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
