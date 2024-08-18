// src/pages/ChatWindowPage.tsx

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ChatComponent from '../components/ChatWindow';
import ChatInput from '../components/ChatInput';
import './ChatWindowPage.css';

// 채팅방별 초기 메시지 설정
const initialMessagesById: Record<string, { text: string; isSentByUser: boolean }[]> = {
  '1': [
    { text: 'Hey John!', isSentByUser: true },
    { text: 'Hey! How’s it going?', isSentByUser: false },
  ],
  '2': [
    { text: 'Hi Jane, are you coming to the party?', isSentByUser: true },
    { text: 'Yes, I’ll be there at 7.', isSentByUser: false },
  ],
  '3': [
    { text: 'Alice, have you finished the project?', isSentByUser: true },
    { text: 'Almost done! I’ll send it to you soon.', isSentByUser: false },
  ],
};

const ChatWindowPage: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>(); // URL의 chatId 파라미터 사용
  const [messages, setMessages] = useState(initialMessagesById[chatId || '1'] || []);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { text: newMessage, isSentByUser: true }]);
      setNewMessage('');
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <ChatComponent key={index} message={message} />
        ))}
      </div>
      <ChatInput
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default ChatWindowPage;
