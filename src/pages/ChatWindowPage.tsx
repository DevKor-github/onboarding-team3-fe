// src/pages/ChatWindowPage.tsx

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ChatComponent from '../components/ChatWindow';
import ChatInput from '../components/ChatInput';
import './ChatWindowPage.css';
import ChatHeader from '../components/ChatHeader';
import StatusBar from '../components/StatusBar';
import MessageTipSelf from '../components/MessageTipSelf';
import MessageTipOther from '../components/MessageTipOther';
import MessageOther from '../components/MessageOther';
import MessageSelf from '../components/MessageSelf';

// 채팅방별 초기 메시지 설정
const initialMessagesById: Record<string, { text: string; isSentByUser: boolean; isContinual: boolean; timestamp: string }[]> =  {
  '1': [
    { text: 'Hey John!', isSentByUser: true, isContinual: false, timestamp: '09:00' },
    { text: 'What?', isSentByUser: false, isContinual: false, timestamp: '09:01' },
    { text: 'Hey! How’s it going?', isSentByUser: false, isContinual: true, timestamp: '09:02' },
  ],
  '2': [
    { text: 'Hi Jane, are you coming to the party?', isSentByUser: true, isContinual: false, timestamp: '10:00' },
    { text: 'Yes, I’ll be there at 7.', isSentByUser: false, isContinual: false, timestamp: '10:05' },
  ],
  '3': [
    { text: 'Alice, have you finished the project?', isSentByUser: true, isContinual: false, timestamp: '11:00' },
    { text: 'I dont know', isSentByUser: true, isContinual: true, timestamp: '11:01' },
    { text: 'Almost done! I’ll send it to you soon.', isSentByUser: false, isContinual: false, timestamp: '11:10' },
  ],
};
const getCurrentTime = () => {
  const now = new Date();
  return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};


const ChatWindowPage: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>(); // URL의 chatId 파라미터 사용
  const [messages, setMessages] = useState(initialMessagesById[chatId || '1'] || []);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { text: newMessage, isSentByUser: true, isContinual: false, timestamp: getCurrentTime(), }]);
      setNewMessage('');
    }
  };

  return (
    <div className="w-[393px] h-[852px] bg-white flex flex-col">
      <StatusBar time='9:41'></StatusBar>
      <div className="h-[37px] px-5 py-2.5 flex items-center">
    <div className="text-[#505156] text-[13px] flex items-center justify-center font-bold font-montserrat"><img src="/logo.svg" alt="logo" className="w-[17px] h-[17px] mr-"/>DEVKOR</div>
  </div>

      
      <ChatHeader username="성우현" profileImageUrl="https://via.placeholder.com/32x32" />
      <div className="flex-grow overflow-auto p-4 bg-white">
        <div className="space-y-2">
          {messages.map((message, index) => (
              message.isSentByUser ? (

                message.isContinual ? (
                  <MessageSelf 
                    key={index} 
                    message={message.text} 
                    timestamp={message.timestamp} />
                ):(

                  <MessageTipSelf 
                    key={index} 
                    message={message.text} 
                    timestamp={message.timestamp} />
                )

                  ) : (
                

                message.isContinual ? (
                  <MessageOther
                    key={index}
                    message={message.text}
                    senderName="경아"
                    profileImageUrl="https://via.placeholder.com/32x32" timestamp={'11:11'}                />
                ):(
                  <MessageTipOther
                      key={index}
                      message={message.text}
                      senderName="경아"
                      profileImageUrl="https://via.placeholder.com/32x32" timestamp={'11:11'}                />
                )

              )
            ))}
        </div>
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
