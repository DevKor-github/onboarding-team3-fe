// /src/components/statusbar/StatusBar.tsx
import React from 'react';
import useCurrentTime from './useCurrentTime';

const StatusBar: React.FC = () => {
  const time = useCurrentTime(); // 실시간 시간 가져오기

  return (
    <div className="w-[393px] h-[54px] bg-white flex justify-between items-center px-6">
      {/* Time Display */}
      <div className="text-black text-[17px] font-['SF Pro'] leading-snug">
        {time}
      </div>
      
      {/* Status Indicator */}
      <div className="relative flex items-center">
        <div className="w-[27.33px] h-[13px] rounded opacity-0">
          {/* Invisible border */}
        </div>
        <div className="w-[21px] h-[9px] bg-black rounded-sm absolute top-[2px] left-[2px]"></div>
      </div>
    </div>
  );
};

export default StatusBar;
