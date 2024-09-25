'use client';

import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import Image from 'next/image';

import IconReset from '@/assets/icon/icon-reset.svg';
import { useWeatherQuery } from '@/queries/weatherQuery';
import { PositionType } from '@/types/weather';
import { getWeatherIcon } from '@/utils/weather';

import styles from './index.module.scss';

const cn = classNames.bind(styles);
const BLOCK = 'weather';

const Weather = () => {
  const [position, setPosition] = useState<PositionType>({
    latitude: 35.179554,
    longitude: 129.075642,
  });

  const { data, isLoading, refetch } = useWeatherQuery({
    request: {
      lat: position.latitude,
      lon: position.longitude,
      appid: process.env.NEXT_PUBLIC_WEATHER_API_KEY as string,
    },
  });

  const handleGetCurrentPosition = async () => {
    await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => resolve(position),
        error => reject(error),
      );
    })
      .then(position => {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    refetch();
  }, [position.latitude, position.longitude]);

  return (
    <div className={cn(BLOCK)}>
      <div className={cn(`${BLOCK}__title`)}>
        <p className={cn(`${BLOCK}__title--text`)}>Weather</p>
        <p className={cn(`${BLOCK}__title--bar`)}>|</p>
        <p className={cn(`${BLOCK}__title--text`)}>
          {isLoading ? 'Loading...' : data?.city.name}
        </p>
        <IconReset
          className={cn(`${BLOCK}__title--reset`)}
          onClick={handleGetCurrentPosition}
        />
      </div>
      {isLoading ? (
        <div className={cn(`${BLOCK}__skeleton`)}></div>
      ) : (
        <div className={cn(`${BLOCK}__content`)}>
          {data?.list.map((item, index) => (
            <div key={index} className={cn(`${BLOCK}__item`)}>
              <p
                className={cn(`${BLOCK}__item--time`, {
                  [`${BLOCK}__item--time--now`]: index === 0,
                })}
              >
                {index === 0 ? 'now' : item.dt_txt}
              </p>
              <p className={cn(`${BLOCK}__item--icon`)}>
                {item.Icon && <item.Icon width={32} height={32} />}
              </p>
              <p className={cn(`${BLOCK}__item--temp`)}>
                {Math.round(item.main.temp)}°
              </p>
              <p className={cn(`${BLOCK}__item--humidity`)}>
                {item.main.humidity}%
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Weather;
