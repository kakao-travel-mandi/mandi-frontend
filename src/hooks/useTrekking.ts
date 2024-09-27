import { useTrekkerStore } from '@/stores/trekker';
import { getCurrentPosition } from '@/utils/geolocation';
import { useCallback, useEffect, useState } from 'react';
import { set } from 'react-hook-form';

export const useTrekking = () => {
  const {
    state,
    totalDistance,
    totalTime,
    lastPosition,
    updateTracking,
    pauseTracking,
    resumeTracking,
    startTracking,
    resetTracking,
  } = useTrekkerStore();
  const [showResult, setShowResult] = useState(true);
  const [displayTime, setDisplayTime] = useState(totalTime);
  const handleClickPlayAndPause = useCallback(async () => {
    const currentPosition = await getCurrentPosition();
    const currentTime = Date.now();
    if (state === 'Stopped') startTracking(currentPosition, currentTime);
    if (state === 'Running') pauseTracking(currentPosition, currentTime);
    if (state === 'Paused') resumeTracking(currentPosition, currentTime);
  }, [state, startTracking, pauseTracking, resumeTracking]);
  const handleClickStop = useCallback(async () => {
    //TODO: 구현 필요 - api로 여부에 따라서 다른 다이얼로그(상태필요) 보여주고
    // 여부(false)에 따라 홈으로 이동하면서 데이터 초기화.
    // 여부(true)면 showResult를 true로 변경
    setShowResult(true);
  }, []);

  useEffect(() => {
    setDisplayTime(totalTime);
  }, [totalTime]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (state === 'Running') {
      // 1초마다 표시시간 업데이트
      intervalId = setInterval(() => {
        setDisplayTime(prevTime => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [state, updateTracking]);

  useEffect(() => {
    const handleBeforeUnload = async (event: BeforeUnloadEvent) => {
      if (state === 'Running') {
        const currentPosition = await getCurrentPosition();
        updateTracking(currentPosition, Date.now());
        event.preventDefault();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [state, updateTracking]);

  return {
    showResult,
    state,
    lastPosition,
    displayTime,
    totalDistance,
    updateTracking,
    handleClickPlayAndPause,
    handleClickStop,
    resetTracking,
  };
};
