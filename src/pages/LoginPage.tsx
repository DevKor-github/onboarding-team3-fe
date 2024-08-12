import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Assuming you have an AuthContext for managing authentication state
import './LoginPage.css'
import axios from 'axios';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login: setToken } = useContext(AuthContext); // Assuming AuthContext provides a login function

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        const response = await axios.post('/api/auth/login', {
          username: username,
          password: password,
        });
  
        if (response.status === 200) {
          const { token } = response.data;
          setToken(token); // Assuming you store the token in AuthContext
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set token for future requests
          navigate('/'); // Redirect to the home page or another protected route
        }
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
