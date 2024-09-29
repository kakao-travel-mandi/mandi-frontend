import classNames from 'classnames/bind';

import Star from './star';
import styles from './star-rating.module.scss';

const BLOCK = 'star-rating';
const cx = classNames.bind(styles);

interface StarRatingProps {
  rating: number;
}

const StarRating = ({ rating }: StarRatingProps) => {
  if (rating < 0 || rating > 5 || isNaN(rating)) {
    console.error('Rating must be between 0 and 5');
    rating = 0;
  }

  const score = Number(rating.toFixed(1));
  const filled = Math.trunc(score);
  const decimal = score - filled;

  return (
    <div className={cx(BLOCK)}>
      {Array.from({ length: 5 }, (_, i) => {
        const key = `star-${i}`;
        if (i < filled) {
          return <Star key={key} type='filled' />;
        }
        if (i === filled && decimal > 0) {
          return <Star key={key} type='half' />;
        }
        return <Star key={key} type='empty' />;
      })}
    </div>
  );
};

export default StarRating;
