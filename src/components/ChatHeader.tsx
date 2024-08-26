// src/components/ChatHeader.tsx
import React from 'react';

interface ChatHeaderProps {
  username: string;
  profileImageUrl: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ username, profileImageUrl }) => {
  const defaultImageUrl = "/src/assets/profile.png";

  return (
    <div className="w-[393px] h-[62px] pl-[24px] py-[15px] bg-white flex justify-between items-center">
      <div className="flex items-center gap-1">
        <div className="w-8 h-8 relative">
          <div className="w-8 h-8 left-0 top-0 absolute flex items-center justify-center">
            <img
              className="w-8 h-8 rounded-full border-2 border-[#1e1e1e]/10"
              src={profileImageUrl || defaultImageUrl}
              alt="Profile"
            />
          </div>
        </div>
        <div className="text-[#2c2c2e] text-sm font-normal font-['Pretendard'] leading-[18px]">
          {username}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
