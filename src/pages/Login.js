import React, { useState } from 'react';
import api from '../api'; // Import api đã cấu hình

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Bước 1: Lấy cookie CSRF từ Laravel (bắt buộc)
      await api.get('/sanctum/csrf-cookie');

      // Bước 2: Gửi thông tin đăng nhập tới API
      const res = await api.post('/login', { email, password });

      // Nếu đăng nhập thành công
      console.log('Đăng nhập thành công:', res.data);
      // TODO: Lưu thông tin user và chuyển hướng tới trang khác, ví dụ Dashboard
    } catch (err) {
      // Nếu có lỗi (ví dụ: sai email/mật khẩu)
      setError('Đăng nhập thất bại, kiểm tra lại email hoặc mật khẩu');
      console.error('Lỗi đăng nhập:', err.response?.data || err.message);
    }
  };

  return (
    <div>
      <h2>Đăng Nhập</h2>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Đăng Nhập</button>
      </form>
    </div>
  );
};

export default Login;
