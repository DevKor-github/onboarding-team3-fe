import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Assuming you have an AuthContext for managing authentication state
import { login } from '../api/auth'; // import the login function
import axios from 'axios';
import StatusBar from '../components/StatusBar';

const LoginPage = () => {
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
    <div className="w-[393px] h-[852px] relative bg-white">
      
      {/* Status Bar */}
      <StatusBar time="9:41"/>

      {/* DEVKOR Logo */}
      <div className="absolute top-[253px] left-[71px] flex flex-col items-start justify-start gap-2.5">
        <div className="w-[234px] h-[51px] flex justify-center items-end">
          <div className="text-center text-[#505156] text-[39px] font-bold font-['Montserrat']">DEVKOR</div>
        </div>
      </div>

      {/* Login Title */}
      <div className="absolute left-[24px] top-[363.72px] text-[#2c2c2e] text-lg font-semibold font-['Pretendard']">
        로그인
      </div>

      {/* Login Form */}
      <form onSubmit={handleLogin} className="absolute top-[414.72px] left-0 w-full px-[34px] flex flex-col justify-start items-center gap-2.5">
        <input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full h-[50px] px-3.5 py-2.5 bg-white border border-[#d9d9d9] rounded-[10px] text-base text-[#d9d9d9] font-normal font-['Pretendard']"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-[50px] px-3.5 py-2.5 bg-white border border-[#d9d9d9] rounded-[10px] text-base text-[#d9d9d9] font-normal font-['Pretendard']"
        />
      </form>

      {/* Buttons */}
      <div className="absolute top-[584.72px] w-full px-[34px] flex justify-center items-center gap-2.5">
        <a
          href="/join"
          className="w-[155px] h-[51px] flex justify-center items-center p-2.5 bg-[#f2f2f7] text-[#3d3d3d] text-base font-normal font-['Pretendard'] rounded-lg shadow-inner"
        >
          회원가입
        </a>
        <a
          href="/chat" //나중에 submit button으로 바꾸기
          className="w-[155px] h-[51px] flex justify-center items-center p-2.5 bg-[#3d3d3d] text-white text-base font-normal font-['Pretendard'] rounded-lg shadow-inner"
        >
          로그인
        </a>
      </div>
    </div>
  );
};

export default LoginPage;
