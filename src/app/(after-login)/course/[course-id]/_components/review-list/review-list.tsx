'use client';
import { useState } from 'react';

import classNames from 'classnames/bind';

import EmptyIcon from '@/assets/colored-icon/paste.svg';
import Chip from '@/components/common/chip';
import { Menubox } from '@/components/common/menubox';
import { ReviewFilter } from '@/types/filter';

import { dummyReviews, Review } from './dummy-reviews';
import ReviewItem from './review-item';
import styles from './review-list.module.scss';

const BLOCK = 'review-list';
const cx = classNames.bind(styles);

interface ReviewListProps {
  hasFilter?: boolean;
  maxCount?: number;
}

const ReviewFilterMap: Record<ReviewFilter, string> = {
  latest: 'Latest',
  highest: 'Highest Rating',
  lowest: 'Lowest Rating',
};

// TODO: 실제 데이터로 변경
const ReviewList = ({ hasFilter, maxCount }: ReviewListProps) => {
  const [filter, setFilter] = useState<ReviewFilter>('latest');
  const dummyList = dummyReviews;
  const list = maxCount ? dummyList.slice(0, maxCount) : dummyList;
  return (
    <div className={cx(BLOCK)}>
      {hasFilter && (
        <div className={cx(`${BLOCK}__filter`)}>
          <Menubox
            triggerButton={<Chip action={true}>{ReviewFilterMap[filter]}</Chip>}
            items={Object.entries(ReviewFilterMap).map(([key, value]) => ({
              content: value,
              onClick: () => setFilter(key as ReviewFilter),
            }))}
          />
        </div>
      )}
      {list.length === 0 ? (
        <div className={cx(`${BLOCK}__empty`)}>
          <EmptyIcon />
          <span>There is no review yet.</span>
        </div>
      ) : (
        list.map(review => <ReviewItem key={review.id} {...review} />)
      )}
    </div>
  );
};

export default ReviewList;
