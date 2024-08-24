import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { join } from '../api/auth';
import StatusBar from '../components/StatusBar';

const JoinPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  //const [profileImage, setProfileImage] = useState<File | null>(null); // For handling profile image upload
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await join(id, password, username,"https://img.freepik.com/free-vector/flat-design-abstract-background_23-2149116121.jpg" );
      if (response) {        
        alert('Registration successful! Redirecting to login page...');
        navigate('/'); // Redirect to login page
      }
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        alert(`Registration failed: ${err.response.data.message}`);
      } else {
        alert('Registration failed. Please try again later.');
      }
      console.error('Registration failed', err);
    }
  };

  return (
    <div className="w-[393px] h-[852px] relative bg-white">
      {/* Top Status Bar */}
      <StatusBar />

      {/* DEVKOR Logo */}
      <div className="absolute top-[253px] left-[71px] flex flex-col items-start justify-start gap-2.5">
        <div className="w-[234px] h-[51px] flex justify-center items-end">
          <h1 className="flex text-[39px] items-center justify-center font-bold font-['Montserrat'] color: #505156;"><img src="/src/assets/logo.svg" alt="logo" className="w-[51px] h-[51px] mr-[6px]" /> DEVKOR</h1>
        </div>
      </div>

      {/* Register Title */}
      <div className="absolute left-[24px] top-[363.72px] text-[#2c2c2e] text-lg font-bold font-['Pretendard']">
        회원가입
      </div>

      {/* Registration Form */}
      <form onSubmit={handleRegister} className="absolute top-[413px] left-0 w-full px-[34px] flex flex-col justify-start items-center gap-2.5">
        <input
          type="text"
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="w-full h-[50px] px-3.5 py-2.5 bg-white border border-[#d9d9d9] rounded-[10px] text-base text-[#d9d9d9] font-normal font-['Pretendard']"
        />
        <input
          type="text"
          placeholder="닉네임"
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
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full h-[50px] px-3.5 py-2.5 bg-white border border-[#d9d9d9] rounded-[10px] text-base text-[#d9d9d9] font-normal font-['Pretendard']"
        />

        <div className="w-full h-[50px] px-3.5 py-2.5 bg-[#f4f4f4] border border-[#d9d9d9] rounded-[10px] flex items-center gap-2.5">
          <label htmlFor="upload-image" className="flex items-center cursor-pointer">
            <img src="/src/assets/camera.svg" alt="Upload Icon" className="w-[18px] h-[18px] mr-[10px]" />
            <span className="text-base text-[#d9d9d9]">프로필 이미지</span>
          </label>
          <input type="file" accept="image/*" id="upload-image" className="hidden" />
        </div>


        {/* Register Button */}
        <button
          type="submit"
          className="w-full h-[51px] p-2.5 bg-[#3d3d3d] text-white text-base font-normal font-['Pretendard'] rounded-lg shadow"
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default JoinPage;
