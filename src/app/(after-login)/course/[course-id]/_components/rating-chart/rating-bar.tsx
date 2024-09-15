import classNames from 'classnames/bind';

import styles from './rating-bar.module.scss';

const BLOCK = 'rating-bar';

const cx = classNames.bind(styles);

interface RatingBarProps {
  label: string;
  count: number;
  total: number;
}

const RatingBar = ({ label, count, total }: RatingBarProps) => {
  const percentage = total === 0 ? 0 : (count / total) * 100;
  return (
    <div className={cx(BLOCK)}>
      <div className={cx(`${BLOCK}__label`)}>{label}</div>
      <div className={cx(`${BLOCK}__bar`)}>
        <div
          className={cx(`${BLOCK}__bar__fill`)}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className={cx(`${BLOCK}__count`)}>{count}</div>
    </div>
  );
};

export default RatingBar;
