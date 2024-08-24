// src/pages/ChatWindowPage.tsx

import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ChatComponent from '../components/ChatWindow';
import ChatInput from '../components/ChatInput';
import ChatHeader from '../components/ChatHeader';
import StatusBar from '../components/StatusBar';
import MessageTipSelf from '../components/MessageTipSelf';
import MessageTipOther from '../components/MessageTipOther';
import MessageOther from '../components/MessageOther';
import MessageSelf from '../components/MessageSelf';


const initialMessagesById: Record<string, { text: string; isSentByUser: boolean; isContinual: boolean; timestamp: string }[]> = {
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
  const location = useLocation();
  const { messages: initialMessages, roomNumber } = location.state as { messages: any[], roomNumber: number };

  
  const [messages, setMessages] = useState(initialMessages || []);
  const [newMessage, setNewMessage] = useState('');
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isSocketOpen, setIsSocketOpen] = useState(false); // WebSocket 연결 상태
  

  useEffect(() => {
    const socket = new WebSocket(`ws://ec2-43-203-30-181.ap-northeast-2.compute.amazonaws.com/api/chat/${roomNumber}`);
    setWs(socket);

    socket.onopen = () => {
      console.log('WebSocket connection opened');
      setIsSocketOpen(true); // 연결 상태를 true로 설정
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages: any) => [...prevMessages, {
        text: message.message,
        isSentByUser: false,
        isContinual: false, // 연속 메시지 여부 판단 로직 추가 가능
        timestamp: getCurrentTime(),
        username: message.username, // 보낸 사람의 username 추가
      }]);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
      setIsSocketOpen(false); // 연결 상태를 false로 설정
      setTimeout(() => {
        console.log('Attempting to reconnect WebSocket...');
        setWs(new WebSocket(`ws://ec2-43-203-30-181.ap-northeast-2.compute.amazonaws.com/api/chat/${roomNumber}`));
      }, 3000); // 3초 후에 재연결 시도
    };
    
    socket.onerror = (error) => {
      console.log('WebSocket error:', error);
      setIsSocketOpen(false);
    };

    return () => {
      if (socket.readyState === 1) { // <-- This is important
          socket.close();
      }
  }
  }, [roomNumber]);

  
  const handleSendMessage = () => {
    if (newMessage.trim() !== '' && ws && ws.readyState === WebSocket.OPEN) {
      const message = {
        username: 'chatId', // 실제 사용자 이름으로 교체
        message: newMessage,
        roomNumber: roomNumber,
      };
  
      ws.send(JSON.stringify(message));
      setMessages([...messages, {
        text: newMessage,
        isSentByUser: true,
        isContinual: messages.length > 0 && messages[messages.length - 1].isSentByUser,
        timestamp: getCurrentTime(),
      }]);
      setNewMessage('');
    } else if (ws && ws.readyState !== WebSocket.OPEN) {
      console.log('WebSocket is not open yet. Cannot send message.');
    } else {
      console.log('WebSocket is not initialized or message is empty.');
    }
  };
  

  return (
    <div className="w-[393px] h-[852px] bg-white flex flex-col">
      <StatusBar />
      <div className="h-[37px] px-5 py-2.5 flex items-center">
        <div className="text-[#505156] text-[13px] flex items-center justify-center font-bold font-montserrat"><img src="../src/assets/logo.svg" alt="logo" className="w-[17px] h-[17px] mr-"/>DEVKOR</div>
      </div>


      <ChatHeader username={messages[0]?.username || ''} profileImageUrl="https://via.placeholder.com/32x32" />
      <div className="flex-grow overflow-auto p-4 bg-white">
        <div className="space-y-2">
          {messages.map((message, index) => (
            message.isSentByUser ? (

              message.isContinual ? (
                <MessageSelf
                  key={index}
                  message={message.text}
                  timestamp={message.timestamp} />
              ) : (

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
                  senderName={message.username}
                  profileImageUrl="https://via.placeholder.com/32x32" timestamp={'message.timestamp'} />
              ) : (
                <MessageTipOther
                  key={index}
                  message={message.text}
                  senderName={message.username}
                  profileImageUrl="https://via.placeholder.com/32x32" timestamp={'message.timestamp'} />
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
