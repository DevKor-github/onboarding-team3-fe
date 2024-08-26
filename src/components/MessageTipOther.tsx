// src/components/MessageOther.tsx

import React from 'react';
import BubbleTip from '../assets/Other/Bubble tip.svg'; // Bubble Tip SVG
import BottomCurve from '../assets/Self/bottom-curve-vector.svg'; // Bottom Curve SVG
import ReadReceiptIcon from '../assets/Frame 2882.svg'; // Placeholder for Read Receipt Icon

interface MessageOtherProps {
  message: string;
  senderName: string;
  profileImageUrl: string;
  timestamp: string;
}

const MessageOther: React.FC<MessageOtherProps> = ({ message, senderName, profileImageUrl, timestamp }) => {
  return (
    <div className="flex mb-2.5 flex items-start gap-1">
      <div className="w-8 h-8 flex justify-center items-center">
        <img
          className="w-8 h-8 rounded-full"
          src={profileImageUrl}
          alt={`${senderName}'s profile`}
        />
      </div>

    <div className="flex pl-[10px]">
      <div className="relative bg-[#f2f2f7] text-black rounded-tr-lg rounded-br-lg rounded-bl-md px-3 py-2 max-w-[286px]  box-border">
        
        <img src={BubbleTip} alt="Bubble Tip" className="absolute top-0 left-[-8px] h-3" />
        
        <div className="text-[#2c2c2e] font-bold text-[14px] text-left font-['Pretendard'] leading-[18px] break-words">
              {senderName}
            </div>
        <div className="text-left text-[14px] left font-normal font-['Pretendard Variable'] leading-tight whitespace-normal">
          {message}
        </div>
        <div className="flex justify-end items-center gap-1 pt-1">
          <div className="text-[#666668] text-right text-[12px] font-light font-['Pretendard']">{timestamp}</div>
          </div>
        </div>
    </div>
    </div>

    
  );
};

export default MessageOther;
