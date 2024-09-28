import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';

import BookmarkIcon from '@/assets/icon/icon-bookmark.svg';
import Badge from '@/components/common/badge';
import Button from '@/components/common/button';
import { MapCourseDTO, NearbyPoint, PointDTO } from '@/types/course';
import { getDifficultyColor } from '@/utils/course';

import DetailInfo from '../../[course-id]/_components/detail-info/detail-info';

import styles from './marker-info-card.module.scss';
import { useCourseStart } from '@/hooks/useCourseStart';

const cx = classNames.bind(styles);

const BLOCK = 'card';

type MarkerInfoCardProps =
  | {
      type: 'course';
      data: MapCourseDTO;
    }
  | {
      type: 'point';
      data: PointDTO;
    };
const MarkerInfoCard = ({ type, data }: MarkerInfoCardProps) => {
  const router = useRouter();
  const { handleClickStart } = useCourseStart((data as MapCourseDTO).id);
  const handleClickButton = () => {
    if (type === 'point') {
      let url;
      if (data.hasOwnProperty('id')) {
        const id = (data as NearbyPoint).id;
        url = `https://www.google.com/maps/place/?q=place_id:${id}`;
      } else {
        const { latitude, longitude } = data.coordinate;
        url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
      }

      window.open(url, '_blank');
    } else if (type === 'course') {
      handleClickStart();
    }
  };
  const handleClickName = () => {
    if (type === 'course') router.push(`/course/${data.id}`);
  };
  const handleClickCard = () => {};
  return (
    <div className={cx(BLOCK)} onClick={handleClickCard}>
      <div className={cx(`${BLOCK}__header`)}>
        <span
          className={cx(`${BLOCK}__header__name`)}
          onClick={handleClickName}
        >
          {type === 'course' ? data.courseName : data.name}
        </span>
        {type === 'course' && (
          <>
            <Badge
              text={data.difficulty}
              color={getDifficultyColor(data.difficulty)}
            />
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
              <DetailInfo
                type='rating'
                content={data.ratingAverage.toString()}
              />
            </div>
          </div>
        )}
        {type === 'point' && (
          <div className={cx('points-content')}>{data.address}</div>
        )}
      </div>
      <div className={cx(`${BLOCK}__footer`)}>
        <Button
          color={type === 'course' ? 'green' : 'darkgray'}
          size='xSmall'
          onClick={handleClickButton}
        >
          {type === 'course' ? 'Course Start' : 'Directions'}
        </Button>
      </div>
    </div>
  );
};

export default MarkerInfoCard;
