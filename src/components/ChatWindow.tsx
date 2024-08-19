// src/components/MessageComponent.tsx

import React from 'react';
import './ChatWindow.css';

interface Message {
  text: string;
  isSentByUser: boolean;
}

interface ChatWindowProps {
  message: Message;
}

const ChatComponent: React.FC<ChatWindowProps> = ({ message }) => {
  return (
    <div className={`message-container ${message.isSentByUser ? 'sent' : 'received'}`}>
      <div className="message-text">
        {message.text}
      </div>
    </div>
  );
};

export default ChatComponent;
