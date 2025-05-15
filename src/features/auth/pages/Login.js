import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import auth from '../../../api/auth/service';

import logo from '../../../assets/images/logo.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await auth.login(email, password);
    if (result.success) {
      const role = result.user.role;

      if (role === 'admin') navigate('/admin/dashboard');
      else if (role === 'teacher') navigate('/teacher/home');
      else navigate('/student/profile');
    } else {
      setErrorMsg(result.message);
    }
  };

  return (
    <main className="container">
      <header className="login__header d-flex justify-content-between align-items-center">
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
      </header>

      <section className="sign-in">
        <h1 className="title">Sign in</h1>
        <form className="form" onSubmit={handleSubmit}>
          {errorMsg && <p className="text-danger">{errorMsg}</p>}

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-sign-in">
            Sign in
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;
