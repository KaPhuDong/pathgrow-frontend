import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

function Home() {
  return (
    <main className="container mx-auto px-4">
      <header className="header d-flex justify-content-between align-items-center">
        <a href="#" className="header__title">
            <img src='/images/logo-path.png' className="bi me-2" width="64" height="64" aria-hidden="true" />
            <span className="fs-40">PathGrow</span>
        </a>
        <button className="header__btn-signup">Sign In</button>
      </header>

      <section className="content d-flex justify-content-between align-items-center">
        <div className="content__left d-flex flex-column">
          <h1 className="content_title">Hi, Welcome to PathGrow</h1>
          <p className="content_description">
            PathGrow is a smart learning system for students and teachers.
            Students can track their daily progress and build better habits.
            Teachers can review student activities and provide helpful guidance.
          </p>
          <button className="header__btn-signup">Sign In</button>
        </div>

        <div className="content__left">
          <img src="./assets/images/banner.png" alt="banner-img" />
        </div>
      </section>
    </main>
  );
}

export default Home;
