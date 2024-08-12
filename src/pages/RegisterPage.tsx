import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css'

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch('/api/auth/join', { // Adjust the URL to match your backend endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', //type
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        // On successful registration, navigate to the login page
        navigate('/');
      } else {
        const errorData = await response.json();
        console.error('Registration failed', errorData);
        // Optionally display an error message to the user
        alert(`Registration failed: ${errorData.message}`);
      }
    } catch (err) {
      console.error('Registration failed', err);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <h2>회원가입</h2>
      <form onSubmit={handleRegister}>
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
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default RegisterPage;
