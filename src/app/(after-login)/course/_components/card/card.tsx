import classNames from 'classnames/bind';

import BookmarkIcon from '@/assets/icon/icon-bookmark.svg';
import Badge from '@/components/common/badge';
import Button from '@/components/common/button';
import { CourseType, Point } from '@/types/course';

import DetailInfo from '../../[course-id]/_components/detail-info/detail-info';

import styles from './card.module.scss';

const cx = classNames.bind(styles);

const BLOCK = 'card';

type CourseProps = {
  type: 'course';
  data: CourseType;
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
        <Button color={type === 'course' ? 'green' : 'darkgray'} size='xSmall'>
          {type === 'course' ? 'Course Start' : 'Directions'}
        </Button>
      </div>
    </div>
  );
};

export default Card;
