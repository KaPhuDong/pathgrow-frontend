import React from 'react';
import './Login.css';

function Login() {
  return (
    <main className="container mx-auto px-4">
      <header className="header d-flex justify-content-between align-items-center">
        <a href="#" className="header__title">
            <img src='/images/logo-path.png' className="bi me-2" width="64" height="64" aria-hidden="true" />
            <span className="fs-40">PathGrow</span>
        </a>
      </header>
      <section className="sign-up">
        <h1 className="title">Sign in</h1>
        <form className="form">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" />
          </div>
          <button type="submit" className="btn btn-signup">Sign in</button>
        </form>
      </section>
    </main>
  );
}

export default Login;
