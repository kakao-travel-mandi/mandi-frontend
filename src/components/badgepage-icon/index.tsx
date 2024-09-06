'use client';

import classNames from 'classnames/bind';
import Image from 'next/image';

import IconLockClosed from '@/assets/icon/icon-lock-closed.svg';

import styles from './badgepage-icon.module.scss';

const cx = classNames.bind(styles);

export interface BadgePageIconProps {
  text: string;
  icon?: string;
  disable?: boolean;
  onClick?: (details: {
    text?: string;
    icon?: string;
    disable?: boolean;
  }) => void; // 수정: text를 매개변수로 받는 onClick
}

const BadgePageIcon = ({
  text,
  icon,
  disable = false,
  onClick,
}: BadgePageIconProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick({ text, icon, disable }); // 객체 형태로 전달
    }
  };

  return (
    <div onClick={handleClick} className={cx('badgePageIcon')}>
      <div
        className={cx(
          'badgePageIcon__content',
          disable && 'badgePageIcon__content__disable',
        )}
      >
        {disable ? (
          <IconLockClosed />
        ) : (
          icon && <Image src={icon} width={40} height={40} alt='badge' />
        )}
      </div>
      <div className={cx('badgePageIcon__text', 'label3-regular')}>{text}</div>
    </div>
  );
};

export default BadgePageIcon;
