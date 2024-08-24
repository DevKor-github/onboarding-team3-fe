import React from 'react';
import BubbleTip from '../assets/Self/Bubble tip.svg'; // Bubble Tip SVG
import BottomCurve from '../assets/Self/bottom-curve-vector.svg'; // Bottom Curve SVG
import ReadReceiptIcon from '../assets/Frame 2882.svg'; // Placeholder for Read Receipt Icon

interface SelfMessageProps {
  message: string;
  timestamp: string;
}

const SelfMessage: React.FC<SelfMessageProps> = ({ message, timestamp }) => {
  return (
    <div className="flex justify-end pr-6 pb-2.5">
      {/* Message Bubble */}
      <div className="relative bg-[#3188ef] text-white rounded-tl-lg rounded-bl-lg rounded-br-md px-3 py-2 max-w-[286px] box-border">
        <div className="text-left text-[14px] font-normal font-['Pretendard Variable'] leading-tight whitespace-pre-wrap break-words">
          {message}
        </div>
        
        <div className="flex justify-end items-center gap-1 pt-1">
          <div className="text-[12px] text-right font-light font-['Pretendard']">{timestamp}</div>
          <img src={ReadReceiptIcon} alt="Read Receipt" className="w-4 h-4" />
        </div>
        
        {/* Bubble Tip */}
        <img src={BubbleTip} alt="Bubble Tip" className="absolute top-0 right-[-8px] h-3" />
        </div>

    </div>
  );
};

export default SelfMessage;
