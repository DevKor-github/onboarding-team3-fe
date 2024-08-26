import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ChatInput from '../components/ChatInput';
import ChatHeader from '../components/ChatHeader';
import StatusBar from '../components/StatusBar';
import MessageTipSelf from '../components/MessageTipSelf';
import MessageTipOther from '../components/MessageTipOther';
import MessageOther from '../components/MessageOther';
import MessageSelf from '../components/MessageSelf';

interface ChatMessage {
  text: string;
  isSentByUser: boolean;
  isContinual: boolean;
  profileURL: string;
  timestamp: string;
  displayname: string;
  username: string;
}

const getCurrentTime = () => {
  const now = new Date();
  return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

const ChatWindowPage: React.FC = () => {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const { chatId } = useParams<{ chatId: string }>(); // URL의 chatId 파라미터 사용
  const location = useLocation();
  const { messages: initialMessages, roomNumber, displayName, username, profileURL } = location.state as { messages: any[], roomNumber: number, displayName: string, username: string, profileURL: string };

  const transformMessages = (serverMessages: any[]): ChatMessage[] => {
    return serverMessages
      .filter(msg => !msg.type || msg.type !== 'new')
      .map(msg => ({
        text: msg.message,
        isSentByUser: msg.username === username, // 현재 사용자와 메시지 발신자를 비교
        isContinual: false, // 이 부분은 필요에 따라 조정
        timestamp: getCurrentTime(),
        displayname: msg.displayname,
        username: msg.username,
        profileURL: msg.profileURL || "../src/assets/user.svg2", // 기본 프로필 이미지
      }));
  };

  const [messages, setMessages] = useState<ChatMessage[]>(transformMessages(initialMessages) || []);
  const [newMessage, setNewMessage] = useState('');
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const ws = new WebSocket(`ws://ec2-43-203-30-181.ap-northeast-2.compute.amazonaws.com:8080/api/chat/room/${roomNumber}`);
    setWs(ws);

    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
      setTimeout(() => {
        console.log('Attempting to reconnect WebSocket...');
        setWs(new WebSocket(`ws://ec2-43-203-30-181.ap-northeast-2.compute.amazonaws.com:8080/api/chat/room/${roomNumber}`
        ));
      }, 3000); // 3초 후에 재연결 시도
    };

    ws.onmessage = (event) => {
      console.log(event.data)
      try {
        const message = event.data;
        console.log(message)

        // 메시지 형식에 따라 처리
        if (message.startsWith('Message(')) {
          const parts = message.match(/Message\(type=(.*?), sender=(.*?), roomNumber=(.*?), data=(.*?)\)/);
          if (parts) {
            const [, type, sender, room, data] = parts;
            if (type === 'message') {
              const parsedData = JSON.parse(data);
              setMessages((prevMessages) => [
                ...prevMessages,
                {
                  text: parsedData.message || '',
                  isSentByUser: false,
                  isContinual: false,
                  timestamp: getCurrentTime(),
                  displayname: sender || 'Unknown',
                  username: sender || 'Unknown',
                  profileURL: parsedData.profileURL || "../src/assets/user.svg", // 기본 프로필 이미지
                }
              ]);
            }
          }
        } else {
          const parsedData = JSON.parse(message);
          if (parsedData.type !== 'new') {
            setMessages((prevMessages) => [
              ...prevMessages,
              {
                text: parsedData.message || '',
                isSentByUser: false,
                isContinual: false,
                timestamp: getCurrentTime(),
                displayname: parsedData.username || 'Unknown',
                username: parsedData.username || 'Unknown',
                profileURL: parsedData.profileURL || "../src/assets/user.svg", // 기본 프로필 이미지
              }
            ]);
          }
        }
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    ws.onerror = (error) => {
      console.log('WebSocket error:', error);
    };

    return () => {
      if (ws?.readyState === 1) {
        ws.close();
      }
    }
  }, [roomNumber]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') {
      console.log('Message is empty.');
      return;
    }
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      console.log('WebSocket is not connected.');
      return;
    }

    const messageData = {
      username: username,
      message: newMessage,
      roomNumber: roomNumber,
      profileURL: profileURL || "../src/assets/user.svg" // 프로필 URL 추가
    };

    ws.send(JSON.stringify(messageData));

    console.log("Send\n" + displayName + JSON.stringify(messageData))

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        text: newMessage,
        isSentByUser: true,
        isContinual: prevMessages.length > 0 && prevMessages[prevMessages.length - 1].isSentByUser,
        timestamp: getCurrentTime(),
        displayname: username,
        username: displayName,
        profileURL: profileURL || "../src/assets/user.svg" // 프로필 URL 추가
      }
    ]);

    setNewMessage('');
  };

  return (
    <div className="w-[393px] h-[852px] bg-white flex flex-col">
      <StatusBar />
      <div className="h-[37px] px-5 py-2.5 flex items-center">
        <div className="text-[#505156] text-[13px] flex items-center justify-center font-bold font-montserrat"><img src="/src/assets/logo.svg" alt="logo" className="w-[17px] h-[17px] mr-1" />DEVKOR</div>
      </div>

      <ChatHeader username={username || ''} profileImageUrl={profileURL || "../src/assets/user.svg"} roomNumber={roomNumber} />

      <div ref={chatContainerRef} className="flex-grow overflow-auto p-4 bg-white">
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
                  profileImageUrl={message.profileURL} 
                  timestamp={message.timestamp} />
              ) : (
                <MessageTipOther
                  key={index}
                  message={message.text}
                  senderName={message.username}
                  profileImageUrl={message.profileURL} 
                  timestamp={message.timestamp} />
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
