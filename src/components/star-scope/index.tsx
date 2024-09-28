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
      <IconStar width='16' height='16' fill='#FFCD00' />
      <span className={cx('body1-semibold')}>{score}.0</span>
    </div>
  );
};
export default StarScope;
