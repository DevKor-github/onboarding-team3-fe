// src/pages/ChatWindowPage.tsx

import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import SockJS from 'sockjs-client';
import ChatInput from '../components/ChatInput';
import ChatHeader from '../components/ChatHeader';
import StatusBar from '../components/StatusBar';
import MessageTipSelf from '../components/MessageTipSelf';
import MessageTipOther from '../components/MessageTipOther';
import MessageOther from '../components/MessageOther';
import MessageSelf from '../components/MessageSelf';
import ChatList from '../components/ChatList';

interface ChatMessage {
  text: string;
  isSentByUser: boolean;
  isContinual: boolean;
  timestamp: string;
  displayname: string;
  username:string;
}

const storedNickname = localStorage.getItem('myname') || 'Unknown';

const getCurrentTime = () => {
  const now = new Date();
  return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};


const ChatWindowPage: React.FC = () => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  

  const { chatId } = useParams<{ chatId: string }>(); // URL의 chatId 파라미터 사용
  const location = useLocation();
  const { messages: initialMessages, roomNumber, displayName, username } = location.state as { messages: any[], roomNumber: number, displayName: string, username: string  };

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
    }));
  };
  
  const [messages, setMessages] = useState<ChatMessage[]>(transformMessages(initialMessages) || []);
  const [newMessage, setNewMessage] = useState('');
  const [ws, setWs] = useState<WebSocket | null>(null);


  useEffect(() => {
    // 메시지가 추가될 때마다 스크롤을 맨 아래로 이동
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
    const uniqueMessages = (messages: ChatMessage[], newMessage: ChatMessage) => {
      // 메시지 ID 또는 타임스탬프 등을 사용하여 중복된 메시지를 필터링합니다.
      return messages.some(msg => msg.text === newMessage.text && msg.timestamp === newMessage.timestamp)
        ? messages
        : [...messages, newMessage];
    };
    
    // WebSocket onmessage에서 메시지 추가
    ws.onmessage = (event) => {
      console.log('Received message:', event.data);
      if(username == storedNickname){
        console.log(username)
      }
      else{
        console.log(username, storedNickname)
      }
      try {
        const message = event.data;
        const match = message.match(/ChatEntity\(id=(\d+), username=([^,]+), message=([^,]+), roomNumber=(\d+), createdAt=([^,]+), updatedAt=([^,]+)\)/);
    
        if (match) {
          const [, id, username, messageText, roomNumber, createdAt, updatedAt] = match;
          const chatMessage: ChatMessage = {
            text: messageText || '',
            isSentByUser: username === storedNickname, // 현재 사용자 이름으로 교체
            isContinual: false,
            timestamp: new Date(createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            displayname: displayName || 'Unknown',
            username: username || 'Unknown',
          };
    
          setMessages(prevMessages => uniqueMessages(prevMessages, chatMessage));
        } else {
          //console.error('Invalid message format:', message);
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
      return; // 메시지가 비어 있으면 아무 작업도 하지 않음
    }
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      console.log('WebSocket is not connected.');
      return; // WebSocket이 연결되어 있지 않으면 아무 작업도 하지 않음
    }
    
    
    const messageData = {
      username: storedNickname, // 실제 사용자 이름으로 교체
      message: newMessage,
      roomNumber: roomNumber,
    };

    ws.send(JSON.stringify(messageData));

    console.log("Send\n"+ displayName + JSON.stringify(messageData))
  
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


      <ChatHeader username={username || ''} profileImageUrl="https://via.placeholder.com/32x32" roomNumber={roomNumber}/>
      
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
