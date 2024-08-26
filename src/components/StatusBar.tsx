// /src/components/statusbar/StatusBar.tsx
import React from 'react';
import useCurrentTime from './useCurrentTime';

const StatusBar: React.FC = () => {
  let time = useCurrentTime(); // 실시간 시간 가져오기

  time = time.replace(/오전|오후/, '');

  return (
    <div className="w-[393px] h-[54px] bg-white flex justify-between items-center pl-[20px]">
      {/* Time Display */}
      <div className="text-black text-[17px] font-bold font-['Pretendard'] leading-snug pl-[30px]">
        {time}
      </div>
      {/* Status Indicator */}
      <div className="relative flex items-center">
        <img src="../src/assets/status.svg" alt="status" className="h-[54px]"></img>
      </div>
    </div>
  );
};

export default StatusBar;
