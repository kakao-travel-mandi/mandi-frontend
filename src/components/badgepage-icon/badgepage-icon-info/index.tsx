import { useState } from 'react';

import classNames from 'classnames/bind';
import Image from 'next/image';

import IconLockClosed from '@/assets/icon/icon-lock-closed.svg';
import Button from '@/components/common/button';

import styles from './badgePageIconInfo.module.scss';

interface BadgePageIconInfoProps {
  text: string | undefined;
  icon?: string | undefined;
  disable?: boolean | undefined;
  onClick: () => void;
}

const cx = classNames.bind(styles);

const BadgePageIconInfo = ({
  text,
  icon,
  disable,
  onClick,
}: BadgePageIconInfoProps) => {
  return (
    <div className={cx('container')}>
      <div
        className={cx('container__icon', disable && 'container__icon__disable')}
      >
        {disable ? (
          <IconLockClosed />
        ) : (
          icon && <Image src={icon} width={40} height={40} alt='badge' />
        )}
      </div>
      <div className={cx('container__text')}>
        <span className={cx('label1-semibold')}>{text}</span>

        <span className={cx('label2-regular')}>Join the Mandi service</span>
      </div>
      <Button size='full' color='green' onClick={onClick}>
        Close
      </Button>
    </div>
  );
};

export default BadgePageIconInfo;
