import React, { Component } from 'react';
import './Header.css';
class Header extends Component {
    render() {
        return (
            <header className="header">
              <div className="container d-flex align-items-center justify-content-between">
                <a href="/" className="logo-brand d-flex align-items-center link-body-emphasis text-decoration-none">
                  <img src='/images/logo-path.png' className="bi me-2" width="64" height="64" aria-hidden="true" />
                  <span className="logo-name fs-40">PathGrow</span>
                </a>
                <ul className="nav nav-pills">
                  <li className="nav-item"><a href="#" className="nav-link" aria-current="page">About me</a></li>
                  <li className="nav-item"><a href="#" className="nav-link">My Goals</a></li>
                  <li className="nav-item"><a href="#" className="nav-link">Study Plans</a></li>
                  <li className="nav-item"><a href="#" className="nav-link">Learning Journal</a></li>
                  <li className="nav-item"><a href="#" className="nav-link">Teacher Interaction</a></li>
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