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

const MessageOther: React.FC<MessageOtherProps> = ({ message, senderName, profileImageUrl,timestamp }) => {
  return (
    <div className="h-[71px] pl-[55px] pb-2.5 flex items-start gap-1">

      <div className="relative bg-[#f2f2f7] text-black rounded-lg px-3 py-2">
        <div className="text-[#2c2c2e] text-sm text-left font-['Pretendard'] leading-[18px]">
              {senderName}
            </div>
        <div className="text-sm left font-normal font-['Pretendard Variable'] leading-tight">
          {message}
        </div>
        <div className="flex justify-end items-center gap-1 pt-1">
          <div className="text-xs font-light font-['Pretendard']">{timestamp}</div>
          <img src={ReadReceiptIcon} alt="Read Receipt" className="w-4 h-4" />
        </div>

        {/* Bubble Tip */}
        </div>
    </div>

    
  );
};

export default MessageOther;
