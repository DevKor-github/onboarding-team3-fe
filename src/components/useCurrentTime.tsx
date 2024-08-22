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
  return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

export default useCurrentTime;
