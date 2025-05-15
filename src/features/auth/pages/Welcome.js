import React from 'react';

import { NavLink } from 'react-router-dom';

import logo from '../../../assets/images/logo.png';
import banner from '../../../assets/images/banner.png';

function Welcome() {
  return (
    <main className="container">
      <header className="welcome__header d-flex justify-content-between align-items-center">
        <NavLink to="/" className="d-flex align-items-center">
          <img
            src={logo}
            className="bi me-2"
            width="64"
            height="64"
            aria-hidden="true"
          />
          <span className="header__title">PathGrow</span>
        </NavLink>
        <NavLink to="/login" className="header__btn-signup">
          Sign In
        </NavLink>
      </header>

      <section className="content d-flex justify-content-between align-items-center">
        <div className="content__left d-flex flex-column">
          <h1 className="content_title">Hi, Welcome to PathGrow</h1>
          <p className="content_description">
            PathGrow is a smart learning system for students and teachers.
            Students can track their daily progress and build better habits.
            Teachers can review student activities and provide helpful guidance.
          </p>
          <NavLink to="/login" className="header__btn-signup">
            Sign In
          </NavLink>
        </div>

        <div className="content__left">
          <img src={banner} alt="banner" />
        </div>
      </section>
    </main>
  );
}

export default Welcome;
