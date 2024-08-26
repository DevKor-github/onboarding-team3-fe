// src/components/ChatHeader.tsx
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ChatHeaderProps {
  username: string;
  profileImageUrl: string;
  roomNumber: number
}


const ChatHeader: React.FC<ChatHeaderProps> = ({ username, profileImageUrl, roomNumber }) => {
  const defaultImageUrl = "/src/assets/profile.png";
  const navigate = useNavigate();

  const deleteChatRoom = async (roomNumber: number) => {
    try {
      const token = localStorage.getItem('authToken');
        
      // Send a DELETE request
      const response = await axios.delete(`http://ec2-43-203-30-181.ap-northeast-2.compute.amazonaws.com:8080/api/chat/${roomNumber}`);
        navigate('/chat/list');
      
      console.log('DeleteChatRoom API response:', response);
  
    } catch (error) {
      console.error('Error deleting chat room:', error);
    }
  };

  return (
    <div className="w-[393px] h-[62px] pl-[24px] py-[15px] bg-white flex justify-between items-center">
      <div className="flex items-center gap-1">
        <div className="w-8 h-8 relative">
          <div className="w-8 h-8 left-0 top-0 absolute flex items-center justify-center">
            <img
              className="w-8 h-8 rounded-full"
              src={profileImageUrl || defaultImageUrl}
              alt="Profile"
            />
          </div>
        </div>
        <div className="text-[#2c2c2e] text-sm font-normal font-['Pretendard'] leading-[18px]">
          {username}
        </div>
      </div>
      <button
        onClick={() => deleteChatRoom(roomNumber)} // Trigger chat room creation on button click
        className="text-black px-2 py-1 text-sm line"
      >
        Delete
      </button>
    </div>
  );
};

export default ChatHeader;
