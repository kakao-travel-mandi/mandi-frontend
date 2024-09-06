import classNames from 'classnames/bind';

import IconStar from '@/assets/icon/icon-star.svg';

import styles from './starScope.module.scss';

interface StarScopeProps {
  score: number;
}

const cx = classNames.bind(styles);

const StarScope = ({ score }: StarScopeProps) => {
  return (
    <div className={cx('starscope')}>
      <IconStar fill='#FFCD00' />
      <span className={cx('body1-semibold')}>{score}</span>
    </div>
  );
};
export default StarScope;
