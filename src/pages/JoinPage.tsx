import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { join } from '../api/auth';
import StatusBar from '../components/StatusBar';

const JoinPage: React.FC = () => {
  const [username, setUsername] = useState('');
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
      const response = await join(username, password);
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

  // const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     setProfileImage(e.target.files[0]);
  //   }
  // };

  return (
    <div className="w-[393px] h-[852px] relative bg-white">
      {/* Top Status Bar */}
      <StatusBar time='9:41'></StatusBar>

      {/* DEVKOR Logo */}
      <div className="absolute top-[253px] left-[71px] flex flex-col items-start justify-start gap-2.5">
        <div className="w-[234px] h-[51px] flex justify-center items-end">
          <div className="text-center text-[#505156] text-[39px] font-bold font-['Montserrat']">DEVKOR</div>
        </div>
      </div>

      {/* Register Title */}
      <div className="absolute left-[24px] top-[363.72px] text-[#2c2c2e] text-lg font-semibold font-['Pretendard']">
        회원가입
      </div>

      {/* Registration Form */}
      <form onSubmit={handleRegister} className="absolute top-[413px] left-0 w-full px-[34px] flex flex-col justify-start items-center gap-2.5">
        <input
          type="text"
          placeholder="이름"
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

        {/* Profile Image Upload */}
        {/* <div className="w-full h-[50px] px-3.5 py-2.5 bg-[#f4f4f4] border border-[#d9d9d9] rounded-[10px] flex items-center gap-2.5">
          <input
            type="file"
            onChange={handleProfileImageChange}
            className="hidden"
            id="profile-image"
          />
          <label htmlFor="profile-image" className="text-[#d9d9d9] text-base font-normal font-['Pretendard Variable'] cursor-pointer">
            프로필 이미지
          </label>
        </div> */}

        {/* Register Button */}
        <button
            type="submit"
            className="w-full h-[51px] p-2.5 bg-[#3d3d3d] text-white text-base font-normal font-['Pretendard'] rounded-lg shadow-inner"
          >
            회원가입
          </button>
      </form>      
    </div>
  );
};

export default JoinPage;
