import classNames from 'classnames/bind';

import CopyIcon from '@/assets/icon/icon-document-mono.svg';
import LocationIcon from '@/assets/icon/icon-map-pin.svg';

import styles from './course-points.module.scss';
import { useSnackbar } from '@/hooks/useSnackbar';

const cx = classNames.bind(styles);

const BLOCK = 'points';

interface CoursePointsProps {
  type: 'start' | 'end';
  address: string;
}

const CoursePoints = ({ type, address }: CoursePointsProps) => {
  const { createSnackbar } = useSnackbar();
  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(address);
      createSnackbar({
        type: 'check',
        content: 'Copied to clipboard',
      });
    } catch (err) {
      console.error('Failed to copy: ', err);
      createSnackbar({
        type: 'alert',
        content: 'Failed to copy. Please try again.',
      });
    }
  };
  return (
    <div className={cx(BLOCK)}>
      <LocationIcon className={cx(`${BLOCK}__location-icon`)} />
      <span className={cx(`${BLOCK}__address`)}>
        {`${type === 'start' ? 'Starting Point' : 'End Point'}: ${address}`}
      </span>
      <CopyIcon
        className={cx(`${BLOCK}__copy-icon`)}
        onClick={handleCopyClick}
      />
    </div>
  );
};

export default CoursePoints;
