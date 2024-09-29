import classNames from 'classnames/bind';

import RatingChart, { Rating } from '../rating-chart/rating-chart';
import StarRating from '../star-raing/star-rating';

import styles from './review-overview.module.scss';

const cx = classNames.bind(styles);

const BLOCK = 'review-overview';

const ratings: Rating[] = [
  { label: 'Excellent', count: 17 },
  { label: 'Very Good', count: 3 },
  { label: 'Average', count: 0 },
  { label: 'Poor', count: 1 },
  { label: 'Terrible', count: 0 },
];

const ReviewOverview = () => {
  return (
    <div className={cx(BLOCK)}>
      <h3 className={cx(`${BLOCK}__header`)}>
        Reviews
        <span className={cx(`${BLOCK}__header__review-counts`)}>23</span>
      </h3>
      <div className={cx(`${BLOCK}__content`)}>
        <div className={cx(`${BLOCK}__score`)}>
          <span className={cx(`${BLOCK}__score__number`)}>4.1</span>
          <StarRating rating={4.8} />
        </div>
        <RatingChart ratings={ratings} />
      </div>
    </div>
  );
};

export default ReviewOverview;
