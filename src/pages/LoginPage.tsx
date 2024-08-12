import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Assuming you have an AuthContext for managing authentication state
import './LoginPage.css'
import { login } from '../api/auth'; // import the login function
import axios from 'axios';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState(''); //동적인 데이터를 관리
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login: setToken } = useContext(AuthContext); // Assuming AuthContext provides a login function

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        const { token } = await login(username, password); // Use the login function from api
        setToken(token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        navigate('/chatlist');
      } catch (err) {
        console.error('Login failed', err);
        if (axios.isAxiosError(err) && err.response) {
          alert(`Login failed: ${err.response.data.message}`);
        } else {
          alert('An error occurred. Please try again.');
        }
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
          // 입력 필드의 값을 상태로 관리하고, 사용자가 입력할 때마다 그 값을 업데이트하여 React 컴포넌트가 변경된 값을 반영하도록
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <a href="/register">회원가입</a>
          <button type="submit">로그인</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
