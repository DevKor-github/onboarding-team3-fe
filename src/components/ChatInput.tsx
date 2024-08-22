// src/components/MessageInput.tsx

import React from 'react';


interface ChatInputProps {
  newMessage: string;
  setNewMessage: (value: string) => void;
  handleSendMessage: () => void;
}

const MessageInput: React.FC<ChatInputProps> = ({ newMessage, setNewMessage, handleSendMessage }) => {
  return (
    <div className="w-[393px] h-[83px] px-6 pt-3 pb-[30px] bg-white shadow-inner flex items-center gap-3">
      {/* Placeholder for potential icons */}
      <div className="w-4 h-4 relative"></div>

      {/* Input box */}
      <div className={`grow shrink basis-0 h-[41px] px-5 py-3 rounded-[30px] flex items-center gap-5 ${newMessage ? 'bg-white text-[#2c2c2e]' : 'bg-[#f2f2f7] text-[#666668]'}`}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Start typing..."
          className="w-full bg-transparent text-sm font-normal font-['Pretendard'] outline-none"
        />
        <button
          onClick={handleSendMessage}
          className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${
            newMessage ? 'bg-[#3d3d3d] text-white' : 'bg-[#f2f2f7] text-[#666668]'
          }`}
          disabled={!newMessage} // Disable button if no input
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
