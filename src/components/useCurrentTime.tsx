import { useState, useEffect } from 'react';

const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000); // 1초마다 갱신

    return () => clearInterval(timer); // 컴포넌트가 언마운트될 때 타이머 제거
  }, []);

  return currentTime;
};

const getCurrentTime = () => {
  const now = new Date();
  return now.toLocaleTimeString('ko-KR', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true, // 12시간제
  });
};

export default useCurrentTime;
