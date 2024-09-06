import { useState } from 'react';

import classNames from 'classnames/bind';

import IconStar from '@/assets/icon/icon-star.svg';

import styles from './starScope.module.scss';

interface StarScopeProps {
  score: number;
  onChange?: (newScore: number) => void;
  isReadOnly?: boolean;
}

const cx = classNames.bind(styles);

const StarScope = ({ score, onChange, isReadOnly = false }: StarScopeProps) => {
  const [currentScore, setCurrentScore] = useState(score);

  const handleClick = (index: number) => {
    if (!isReadOnly) {
      const newScore = index + 1;
      setCurrentScore(newScore);
      if (onChange) {
        onChange(newScore);
      }
    }
  };
  return (
    <div className={cx('starscope')}>
      {[...Array(5)].map((_, index) => (
        <div key={index} onClick={() => handleClick(index)}>
          <IconStar fill={index < currentScore ? '#FFCD00' : '#F2F3F6'} />
        </div>
      ))}
    </div>
  );
};

export default StarScope;
