// src/pages/ChatWindowPage.tsx

import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
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
  timestamp: string;
  displayname: string;
  username:string;
}

const getCurrentTime = () => {
  const now = new Date();
  return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};


const ChatWindowPage: React.FC = () => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  

  const { chatId } = useParams<{ chatId: string }>(); // URL의 chatId 파라미터 사용
  const location = useLocation();
  // location.state가 없을 경우 기본값으로 챗봇 데이터를 설정
  const {
    messages: initialMessages = [],
    roomNumber = 100, // 기본 채팅방 번호
    displayName = '챗봇',
    username = 'chatbot',
  } = (location.state || {}) as {
    messages: any[];
    roomNumber: number;
    displayName: string;
    username: string;
  };

  const transformMessages = (serverMessages: any[]): ChatMessage[] => {
    return serverMessages.map(msg => ({
      text: msg.message,
      isSentByUser: msg.username === username, // 현재 사용자와 메시지 발신자를 비교
      isContinual: false, // 이 부분은 필요에 따라 조정
      timestamp: getCurrentTime(),
      displayname: msg.username, 
      username: msg.username,
    }));
  };
  
  const [messages, setMessages] = useState<ChatMessage[]>(transformMessages(initialMessages) || []);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isSocketOpen, setIsSocketOpen] = useState(false); // WebSocket 연결 상태

    // 챗봇의 환영 메시지를 추가하는 함수
    const sendWelcomeMessageFromChatbot = () => {
      const welcomeMessage: ChatMessage = {
        text: '안녕하세요! 무엇을 도와드릴까요?',
        isSentByUser: false,
        isContinual: false,
        timestamp: getCurrentTime(),
        displayname: '챗봇',
        username: 'chatbot',
      };
      setMessages((prevMessages) => [...prevMessages, welcomeMessage]);
    };
  
  useEffect(() => {
    // 메시지가 추가될 때마다 스크롤을 맨 아래로 이동
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]); // messages 배열이 업데이트될 때마다 실행

  useEffect(() => {
    if (!location.state) {
      // location.state가 없는 경우에만 환영 메시지를 보냄
      sendWelcomeMessageFromChatbot();
    }

    const socket = new WebSocket(`ws://ec2-43-203-30-181.ap-northeast-2.compute.amazonaws.com:8080/api/chat/room/${roomNumber}`);
    setWs(socket);

    socket.onopen = () => {
      console.log('WebSocket connection opened');
      setIsSocketOpen(true); // 연결 상태를 true로 설정
    };

    socket.onmessage = (event) => {
      console.log(event.data)
      try {
        const messageData = event.data; // 수신한 메시지를 JSON으로 파싱
        
        const isContinual =
          messages.length > 0 &&
          messages[messages.length - 1].username === messageData.username &&
          messages[messages.length - 1].timestamp === getCurrentTime();

        setMessages((prevMessages: any) => [
          ...prevMessages,
          {
            text: messageData.message,
            isSentByUser: false,
            isContinual: isContinual, // 연속 메시지 여부 판단 로직 추가 가능
            timestamp: getCurrentTime(),
            displayname: messageData.displayName, // 보낸 사람의 username 추가
            username: messageData.username
          }
        ]);
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
      setIsSocketOpen(false); // 연결 상태를 false로 설정
      setTimeout(() => {
        console.log('Attempting to reconnect WebSocket...');
        setWs(new WebSocket(`ws://ec2-43-203-30-181.ap-northeast-2.compute.amazonaws.com:8080/api/chat/room/${roomNumber}`
        ));
      }, 3000); // 3초 후에 재연결 시도
    };
    
    socket.onerror = (error) => {
      console.log('WebSocket error:', error);
      setIsSocketOpen(false);
    };

    return () => {
      if (ws?.readyState === 1) { // <-- This is important
          ws.close();
      }
  }
  }, [roomNumber]);

  
  const handleSendMessage = () => {
    console.log(messages)
    if (newMessage.trim() === '') {
      console.log('Message is empty.');
      return; // 메시지가 비어 있으면 아무 작업도 하지 않음
    }
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      console.log('WebSocket is not connected.');
      return; // WebSocket이 연결되어 있지 않으면 아무 작업도 하지 않음
    }

    const messageData = {
      username: username, // 실제 사용자 이름으로 교체
      message: newMessage,
      roomNumber: roomNumber,
    };

    ws.send(JSON.stringify(messageData));

    console.log("Send\n"+ displayName + JSON.stringify(messageData))
    
    const isContinual =
    messages.length > 0 &&
    messages[messages.length - 1].username === username &&
    messages[messages.length - 1].timestamp === getCurrentTime();
  
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        text: newMessage,
        isSentByUser: true,
        isContinual: prevMessages.length > 0 && prevMessages[prevMessages.length - 1].isSentByUser,
        timestamp: getCurrentTime(),
        displayname: username,
        username: displayName
      }
    ]);

    setNewMessage('');
  };
  

  return (
    <div className="w-[393px] h-[852px] bg-white flex flex-col">
      <StatusBar />
      <div className="h-[37px] px-5 py-2.5 flex items-center">
        <div className="text-[#505156] text-[13px] flex items-center justify-center font-bold font-montserrat"><img src="/src/assets/logo.svg" alt="logo" className="w-[17px] h-[17px] mr-"/>DEVKOR</div>
      </div>


      <ChatHeader username={messages[0]?.username || ''} profileImageUrl="https://via.placeholder.com/32x32" />
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
                  profileImageUrl="https://via.placeholder.com/32x32" 
                  timestamp={message.timestamp} />
              ) : (
                <MessageTipOther
                  key={index}
                  message={message.text}
                  senderName={message.username}
                  profileImageUrl="https://via.placeholder.com/32x32" 
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
