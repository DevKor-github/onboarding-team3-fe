import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChatListPage.css';
import StatusBar from '../components/StatusBar';

// Example chat data
const exampleChats = [
  { id: '1', profilePic: 'https://via.placeholder.com/50', name: '성우현', lastMessageTime: '10:30 AM' },
  { id: '2', profilePic: 'https://via.placeholder.com/50', name: '최세인', lastMessageTime: '2:26 AM' },
  { id: '3', profilePic: 'https://via.placeholder.com/50', name: '한성경', lastMessageTime: '9:45 AM' },
];

const ChatListPage: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSelectChat = (chatId: string) => {
    setSelectedChat(chatId);
    navigate(`/chat/${chatId}`);
  };

  return (
    <div className="w-[393px] h-[852px] bg-white flex flex-col">
  <StatusBar time='9:41'></StatusBar>
  <div className="h-[37px] px-5 py-2.5 flex items-center">
    <div className="text-[#505156] text-[13px] font-bold font-['Montserrat']">DEVKOR</div>
  </div>
  <div className="h-[62px] px-6 py-[15px] bg-white flex items-center">
    <div className="text-[#2c2c2e] text-lg font-semibold font-['Pretendard'] leading-[18px]">채팅</div>
  </div>
  <div className="w-[390px] h-2.5 bg-neutral-50 border-t border-b border-neutral-100"></div>
  <div className="flex-1 overflow-auto">
    {exampleChats.map((chat) => (
      <div
        key={chat.id}
        className="h-[62px] px-6 py-[15px] bg-white shadow-inner flex justify-between items-center"
        onClick={() => handleSelectChat(chat.id)}
      >
        <div className="flex items-center gap-1">
          <div className="w-8 h-8 relative">
            <div className="w-8 h-8 absolute flex justify-center items-center">
              <img className="w-8 h-8 rounded-full border-2 border-[#1e1e1e]/10" src={chat.profilePic} alt={chat.name} />
            </div>
          </div>
          <div className="text-[#2c2c2e] text-sm font-normal font-['Pretendard'] leading-[18px]">{chat.name}</div>
        </div>
        <div className="text-black text-sm font-normal font-['Pretendard'] leading-[18px]">{chat.lastMessageTime}</div>
      </div>
    ))}
  </div>
</div>

  );
};

export default ChatListPage;
