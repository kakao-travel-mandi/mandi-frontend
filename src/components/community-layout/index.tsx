import { ReactNode } from 'react';

import classNames from 'classnames/bind';

import IconPencil from '@/assets/icon/icon-pencil.svg';
import Chip from '@/components/common/chip/index';

import styles from './communityLayout.module.scss';

interface CommunityLayoutProps {
  children: ReactNode;
}

const cx = classNames.bind(styles);

const CommunityLayout = ({ children }: CommunityLayoutProps) => {
  return (
    <div className={cx('container')}>
      <div className={cx('container__nav')}>
        <Chip>All</Chip>
        <Chip>Tourism</Chip>
        <Chip>Trekking</Chip>
        <Chip>Dining</Chip>
        <Chip>Accommodation</Chip>
        <Chip>Other</Chip>
      </div>
      <div>{children}</div>
      <div className={cx('container__pencil')}>
        <IconPencil />
      </div>
    </div>
  );
};

export default CommunityLayout;
