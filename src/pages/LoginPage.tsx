// LoginPage.tsx (or wherever the Link is located)
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import './LoginPage.css'


const LoginPage: React.FC = () => {
  const { login: setToken } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token } = await login(username, password);
      setToken(token);
      navigate('/home');
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <Link to="/register">회원가입</Link> {/* Path matches 'register' in routes */}
          <button type="submit">로그인</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
