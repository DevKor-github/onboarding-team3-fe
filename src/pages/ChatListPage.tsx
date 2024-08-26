import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StatusBar from '../components/StatusBar';

// Define the type for the chat data
interface Chat {
  roomNumber: number;
  displayName: string;
  username: string;
  profileURL: string;
  message: string;
  messageCreatedDate: string;
}


// 임시데이터
const ChatListPage: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]); // State to store the fetched chat data
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const createTemporaryChatData = () => {
    const tempChats: Chat[] = [
      {
        roomNumber: 1,
        displayName: 'John Doe',
        username: 'johndoe',
        profileURL: 'https://via.placeholder.com/150',
        message: 'Hey there!',
        messageCreatedDate: new Date().toISOString(),
      },
      {
        roomNumber: 2,
        displayName: 'Jane Smith',
        username: 'janesmith',
        profileURL: 'https://via.placeholder.com/150',
        message: 'Let\'s catch up later.',
        messageCreatedDate: new Date().toISOString(),
      },
      {
        roomNumber: 3,
        displayName: 'Chris Evans',
        username: 'chrisevans',
        profileURL: 'https://via.placeholder.com/150',
        message: 'See you at the gym.',
        messageCreatedDate: new Date().toISOString(),
      },
    ];
    setChats(tempChats);
  };

  useEffect(() => {
    createTemporaryChatData(); // Load temporary chat data on component mount
  }, []);


// 진짜데이터,,
//   // Function to fetch chat data from the server using axios
//   const fetchChatData = async () => {
//     try {
//       const response = await axios.get<Chat[]>('http://ec2-43-203-30-181.ap-northeast-2.compute.amazonaws.com:8080/api/chat/list', {});
//       console.log('ChatList API response:', response); 
  
//       setChats(response.data); // Update the state with the fetched data
//     } catch (error) {
//       console.error('Error fetching chat data:', error);
//     }
//   };

//   const createChatRoom = async () => {
//     try {
//       // Send a POST request to create a new chat room
//       const response = await axios.post<Chat>('http://ec2-43-203-30-181.ap-northeast-2.compute.amazonaws.com:8080/api/chat/createRoom', {
//          // Include the username in the request body
//         username
//       }, {});
//       console.log('CreateChatRoom API response:', response);

//       // Update the chat list with the newly created chat room
//       setChats((prevChats) => [...prevChats, response.data]);
//       setUsername(''); // Clear the input field
//     } catch (error) {
//       console.error('Error creating chat room:', error);
//     }
//   };

  

//   const handleSelectChat = async (roomNumber: number) => {
//     try {
//       const response = await axios.get(`http://ec2-43-203-30-181.ap-northeast-2.compute.amazonaws.com:8080/api/chat/${roomNumber}`, {});
      
//       console.log('HandleSelectChat API response:', response);
//       // Pass the room messages as state when navigating to the ChatWindowPage
//       navigate(`/chat/${roomNumber}`, { state: { messages: response.data, roomNumber } });
//     } catch (error) {
//       console.error('Error fetching chat messages:', error);
//     }};

//     useEffect(() => {
//       fetchChatData(); // Fetch the chat data when the component mounts
//     }, []);

  return (
    <div className="w-[393px] h-[852px] bg-white flex flex-col">
      <StatusBar />
      <div className="h-[37px] px-5 py-2.5 flex items-center">
        <div className="text-[#505156] text-[13px] flex justify-center font-bold font-['Montserrat']"><img src="../src/assets/logo.svg" alt="logo" className="w-[17px] h-[17px] mr-1"/>DEVKOR</div>
      </div>
      <div className="h-[62px] px-6 py-[15px] bg-white flex items-center justify-between">
    <div className="text-[#2c2c2e] text-lg font-bold font-['Pretendard'] leading-[18px]">
      채팅
    </div>
    <div className="flex items-center space-x-2">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)} // Update the username state on input change
        placeholder="Enter username"
        className="rounded px-2 py-1 text-sm border-none focus:outline-none bg-gray-100"
      />
      <button
        // onClick={createChatRoom} // Trigger chat room creation on button click
        onClickCapture={() => {}} //임시데이터용
        className="text-black px-3 py-1 text-sm line"
      >
        +
      </button>
    </div>
  </div>
      <div className="w-[390px] h-2.5 bg-neutral-50 border-t border-b border-neutral-100"></div>
      <div className="flex-1 overflow-auto">
        {chats.map((chat) => (
          <div
            key={chat.roomNumber}
            className="h-[62px] px-6 py-[15px] bg-white border-[0.5px] flex justify-between items-center"
            // onClick={() => handleSelectChat(chat.roomNumber)} // 진짜,, 
            onClickCapture={() => console.log('Selected chat room number: ${chat.roomNumber')} //임시데이터용
          >
            <div className="flex items-center gap-1">
              <div className="w-8 h-8 relative">
                <div className="w-8 h-8 absolute flex justify-center items-center">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={chat.profileURL}
                    alt={chat.displayName}
                  />
                </div>
              </div>
              <div className="text-[#2c2c2e] text-sm font-normal font-['Pretendard'] leading-[18px]">
                {chat.displayName}
              </div>
            </div>
            <div className="text-black text-sm font-normal font-['Pretendard'] leading-[18px]">
              {/* Format the date to a readable time (e.g., 10:30 AM) */}
              {new Date(chat.messageCreatedDate).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatListPage;
