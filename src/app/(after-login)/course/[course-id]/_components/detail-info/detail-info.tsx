import classNames from 'classnames/bind';
import TagIcon from '@/assets/icon/icon-tag.svg';
import ClockIcon from '@/assets/icon/icon-clock.svg';
import RunningIcon from '@/assets/icon/exercise_running.svg';
import StarIcon from '@/assets/icon/icon-star.svg';
import LocationIcon from '@/assets/icon/icon-map-pin.svg';
import EllipsisHorizontalIcon from '@/assets/icon/icon-ellipsis-horizontal.svg';

import styles from './detail-info.module.scss';
import Badge from '@/components/common/badge';

const cx = classNames.bind(styles);

const BLOCK = 'detail-info';

interface BaseDetailInfoProps {
  icon?: React.ElementType;
  iconVisible?: boolean;
}

type DetailInfoProps = BaseDetailInfoProps &
  (
    | {
        type?: 'duration' | 'distance' | 'difficulty' | 'rating';
        content: string | string[];
      }
    | {
        type: 'points';
        content: {
          startPoint: string;
          endPoint: string;
        };
      }
  );

const IconMap = {
  duration: ClockIcon,
  distance: RunningIcon,
  difficulty: TagIcon,
  rating: StarIcon,
  points: LocationIcon,
};

const DetailInfo = ({
  type,
  icon,
  content,
  iconVisible = true,
}: DetailInfoProps) => {
  const Icon = iconVisible && (icon || (type && IconMap[type]));
  return (
    <div className={cx(BLOCK)}>
      {Icon && <Icon className={cx(`${BLOCK}__icon`)} />}
      {type === 'points' && (
        <div className={cx('course-points')}>
          <Badge text={content.startPoint} color='gray' />
          <EllipsisHorizontalIcon />
          <Badge text={content.endPoint} color='gray' />
        </div>
      )}
      {type !== 'points' && (
        <span className={cx(`${BLOCK}__text`)}>{content}</span>
      )}
    </div>
  );
};

export default DetailInfo;
