import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RegisterPage.css'

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        // Implement the registration logic
    };

    return (
      <div className="register-container">
      <h2>회원가입</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
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

export default Register;
