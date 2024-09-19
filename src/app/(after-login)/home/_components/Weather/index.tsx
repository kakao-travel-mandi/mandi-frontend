import React from 'react';

import classNames from 'classnames/bind';

import IconReset from '@/assets/icon/icon-reset.svg';

import styles from './index.module.scss';

const cn = classNames.bind(styles);
const BLOCK = 'weather';

const weatherData = [
  { time: 'now', icon: '☀️', temp: '32°', humidity: '20%' },
  { time: '9:00', icon: '☀️', temp: '32°', humidity: '20%' },
  { time: '12:00', icon: '🌤️', temp: '32°', humidity: '34%' },
  { time: '15:00', icon: '☁️', temp: '28°', humidity: '40%' },
  { time: '18:00', icon: '☁️', temp: '28°', humidity: '60%' },
  { time: '21:00', icon: '🌧️', temp: '28°', humidity: '80%' },
];

const Weather = () => {
  return (
    <div className={cn(BLOCK)}>
      <div className={cn(`${BLOCK}__title`)}>
        <p className={cn(`${BLOCK}__title--text`)}>Weather</p>
        <p className={cn(`${BLOCK}__title--bar`)}>|</p>
        <p className={cn(`${BLOCK}__title--text`)}>Busan</p>
        <IconReset className={cn(`${BLOCK}__title--reset`)} />
      </div>
      <div className={cn(`${BLOCK}__content`)}>
        {weatherData.map((data, index) => (
          <div key={index} className={cn(`${BLOCK}__item`)}>
            <p className={cn(`${BLOCK}__item--time`)}>{data.time}</p>
            <p className={cn(`${BLOCK}__item--icon`)}>{data.icon}</p>
            <p className={cn(`${BLOCK}__item--temp`)}>{data.temp}</p>
            <p className={cn(`${BLOCK}__item--humidity`)}>{data.humidity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Weather;
