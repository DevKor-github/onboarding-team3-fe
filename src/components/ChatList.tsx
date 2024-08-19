import React from 'react';

interface Chat {
  id: string;
  profilePic: string;
  name: string;
  lastMessageTime: string;
}

interface ChatListProps {
  chats: Chat[];
  onSelectChat: (id: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({ chats, onSelectChat }) => {
  return (
    <div className="chat-list">
      {chats.map((chat) => (
        <div
          key={chat.id}
          className="w-[393px] h-[62px] px-6 py-[15px] bg-white shadow-inner justify-between items-center inline-flex cursor-pointer"
          onClick={() => onSelectChat(chat.id)}
        >
          {/* Profile Image and Name */}
          <div className="justify-center items-center gap-1 flex">
            <div className="w-8 h-8 relative">
              <div className="w-8 h-8 left-0 top-0 absolute justify-center items-center inline-flex">
                <img
                  className="w-8 h-8 rounded-full border-2 border-[#1e1e1e]/10"
                  src={chat.profilePic}
                  alt={chat.name}
                />
              </div>
            </div>
            <div className="text-[#2c2c2e] text-sm font-normal font-['Pretendard'] leading-[18px]">
              {chat.name}
            </div>
          </div>
          {/* Last Message Time */}
          <div className="text-black text-sm font-normal font-['Pretendard'] leading-[18px]">
            {chat.lastMessageTime}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
