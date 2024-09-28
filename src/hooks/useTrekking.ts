import { useFinishTrekkingMutation } from '@/queries/trekkingQuery';
import { useTrekkerStore } from '@/stores/trekker';
import { getCurrentPosition } from '@/utils/geolocation';
import { deleteCookie, getCookie } from 'cookies-next';
import { useCallback, useEffect, useState } from 'react';

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
  const courseId = Number(getCookie('trekkingId'));
  const [showResult, setShowResult] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const { mutate } = useFinishTrekkingMutation(courseId, {
    onSuccess: (data, variables) => {
      if (data.response.enabled) {
        pauseTracking(
          variables.userLocation,
          new Date(variables.completedAt).getTime(),
        );
        setShowResult(true);
      } else {
        setShowDialog(true);
      }
    },
    onError: error => {
      console.error(error);
    },
  });
  const [displayTime, setDisplayTime] = useState(totalTime);
  const handleClickPlayAndPause = useCallback(async () => {
    const currentPosition = await getCurrentPosition();
    const currentTime = Date.now();
    if (state === 'Stopped') startTracking(currentPosition, currentTime);
    if (state === 'Running') pauseTracking(currentPosition, currentTime);
    if (state === 'Paused') resumeTracking(currentPosition, currentTime);
  }, [state, startTracking, pauseTracking, resumeTracking]);
  const handleClickStop = useCallback(async () => {
    const currentPosition = await getCurrentPosition();
    // 코스 11번 테스트용 코드
    // const currentPosition = {
    //   latitude: 35.073949,
    //   longitude: 129.015331,
    // };

    const currentTime = Date.now();

    mutate({
      userLocation: {
        latitude: currentPosition.latitude,
        longitude: currentPosition.longitude,
      },
      completedAt: new Date(currentTime).toISOString(),
    });
  }, []);
  const closeDialog = () => setShowDialog(false);

  useEffect(() => {
    setDisplayTime(totalTime);
  }, [totalTime]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (state === 'Running') {
      intervalId = setInterval(() => {
        setDisplayTime(prevTime => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [state, updateTracking]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (showResult) {
        resetTracking();
        deleteCookie('trekkingId');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [showResult, resetTracking]);

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
    showDialog,
    closeDialog,
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
