import classNames from 'classnames/bind';

import Button from './button/button';
import styles from './trekker.module.scss';
import { useTrekkerStore } from '@/stores/trekker';
import { useCallback, useEffect, useState } from 'react';
import { getCurrentPosition } from '@/utils/geolocation';

const cx = classNames.bind(styles);

const BLOCK = 'trekker';

interface TrekkingDataProps {
  title: string;
  content: string;
}
const TrekkingData = ({ title, content }: TrekkingDataProps) => (
  <div className={cx('trekking_data')}>
    <div className={cx('trekking_data__title')}>{title}</div>
    <span className={cx('trekking_data__content')}>{content}</span>
  </div>
);

const Trekker = () => {
  const {
    state,
    totalDistance,
    totalTime,
    updateTracking,
    pauseTracking,
    resumeTracking,
    resetTracking,
    startTracking,
  } = useTrekkerStore();
  const [displayTime, setDisplayTime] = useState(totalTime);
  const handleClick = useCallback(async () => {
    const currentPosition = await getCurrentPosition();
    const currentTime = Date.now();
    if (state === 'Stopped') startTracking(currentPosition, currentTime);
    if (state === 'Running') pauseTracking(currentPosition, currentTime);
    if (state === 'Paused') resumeTracking(currentPosition, currentTime);
  }, [state, startTracking, pauseTracking, resumeTracking]);

  useEffect(() => {
    setDisplayTime(totalTime);
  }, [totalTime]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    let updateIntervalId: NodeJS.Timeout;

    if (state === 'Running') {
      // 1초마다 표시시간 업데이트
      intervalId = setInterval(() => {
        setDisplayTime(prevTime => prevTime + 1);
      }, 1000);

      // 1분마다 위치 업데이트 및 트래킹 데이터 갱신
      updateIntervalId = setInterval(async () => {
        const currentPosition = await getCurrentPosition();
        updateTracking(currentPosition, Date.now());
      }, 60000);
    }

    return () => {
      clearInterval(intervalId);
      clearInterval(updateIntervalId);
    };
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

  return (
    <div className={cx(BLOCK)}>
      <h3 className={cx(`${BLOCK}__name`)}>Sinseondae</h3>
      <div className={cx(`${BLOCK}__data`)}>
        <TrekkingData title='Time' content={formatTime(displayTime)} />
        <div className={cx('divider')} />
        <TrekkingData
          title='Distance'
          content={formatDistance(totalDistance)}
        />
      </div>
      <div className={cx(`${BLOCK}__buttons`)}>
        <Button
          type={state === 'Running' ? 'pause' : 'play'}
          onClick={handleClick}
        />
        <Button type='stop' />
      </div>
    </div>
  );
};

export default Trekker;

const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const formatDistance = (distanceInMeters: number): string => {
  const distanceInKm = distanceInMeters / 1000;
  return `${distanceInKm.toFixed(2)} km`;
};
