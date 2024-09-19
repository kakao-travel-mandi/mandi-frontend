import classNames from 'classnames/bind';

import CopyIcon from '@/assets/icon/icon-document-mono.svg';
import LocationIcon from '@/assets/icon/icon-map-pin.svg';

import styles from './course-points.module.scss';

const cx = classNames.bind(styles);

const BLOCK = 'points';

interface CoursePointsProps {
  type: 'start' | 'end';
  address: string;
}

const CoursePoints = ({ type, address }: CoursePointsProps) => {
  return (
    <div className={cx(BLOCK)}>
      <LocationIcon className={cx(`${BLOCK}__location-icon`)} />
      <span className={cx(`${BLOCK}__address`)}>
        {`${type === 'start' ? 'Starting Point' : 'End Point'}: ${address}`}
      </span>
      <CopyIcon className={cx(`${BLOCK}__copy-icon`)} />
    </div>
  );
};

export default CoursePoints;
