import classNames from 'classnames/bind';

import RatingBar from './rating-bar';
import styles from './rating-chart.module.scss';

const BLOCK = 'rating-chart';
const cx = classNames.bind(styles);

export type Rating = {
  label: string;
  count: number;
};

interface RatingChartProps {
  ratings: Rating[];
}

const RatingChart = ({ ratings }: RatingChartProps) => {
  const total = ratings.reduce((acc, { count }) => acc + count, 0);
  return (
    <div className={cx(BLOCK)}>
      {ratings.map(rating => (
        <RatingBar
          key={rating.label}
          label={rating.label}
          count={rating.count}
          total={total}
        />
      ))}
    </div>
  );
};

export default RatingChart;
