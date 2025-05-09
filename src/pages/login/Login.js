import React from 'react';
import './Login.css';

function Login() {
  return (
    <main className="container">
      <header className="header d-flex justify-content-between align-items-center">
        <a href="#" className="header__title">
          PathGrow
        </a>
      </header>
      <section className="sign-up">
        <h1 className="title">Sign in</h1>
        <form className="form">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input type="email" className="form-control" id="email" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" id="password" />
          </div>
          <button type="submit" className="btn btn-signup">
            Sign in
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;
