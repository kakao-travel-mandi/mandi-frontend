import Badge from '@/components/common/badge';
import styles from './card.module.scss';
import classNames from 'classnames/bind';
import Button from '@/components/common/button';
import { Course, Point } from '@/types/course';
import DetailInfo from '../../[course-id]/_components/detail-info/detail-info';

import BookmarkIcon from '@/assets/icon/icon-bookmark.svg';
const cx = classNames.bind(styles);

const BLOCK = 'card';

type CourseProps = {
  type: 'course';
  data: Course;
};
type PointProps = {
  type: 'point';
  data: Point;
};

type CardProps = CourseProps | PointProps;

const Card = ({ type, data }: CardProps) => {
  return (
    <div className={cx(BLOCK)}>
      <div className={cx(`${BLOCK}__header`)}>
        <span className={cx(`${BLOCK}__header__name`)}>{data.name}</span>
        {type === 'course' && (
          <>
            <Badge text='Easy' color='green' />
            <div className={cx(`${BLOCK}__header__bookmark-button`)}>
              <BookmarkIcon
                className={cx(`${BLOCK}__header__bookmark-button__icon`)}
              />
            </div>
          </>
        )}
      </div>
      <div className={cx(`${BLOCK}__content`)}>
        {type === 'course' && (
          <div className={cx('course-content')}>
            <div className={cx('course-content__points')}>
              <DetailInfo
                type='points'
                content={{
                  startPoint: data.startPoint.name,
                  endPoint: data.endPoint.name,
                }}
                iconVisible={false}
              />
            </div>
            <div className={cx('course-content__info')}>
              <DetailInfo type='duration' content={data.duration} />
              <DetailInfo type='distance' content={data.distance.toString()} />
              <DetailInfo type='rating' content={data.ratingAverage} />
            </div>
          </div>
        )}
        {type === 'point' && (
          <div className={cx('points-content')}>{data.address}</div>
        )}
      </div>
      <div className={cx(`${BLOCK}__footer`)}>
        <Button color={type === 'course' ? 'green' : 'gray__one'} size='xSmall'>
          {type === 'course' ? 'Course Start' : 'Directions'}
        </Button>
      </div>
    </div>
  );
};

export default Card;
