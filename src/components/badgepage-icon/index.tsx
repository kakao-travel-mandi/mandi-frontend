import classNames from 'classnames/bind';

import IconLockClosed from '@/assets/icon/icon-lock-closed.svg';

import styles from './badgepage-icon.module.scss';

const cx = classNames.bind(styles);

export interface BadgePageIconProps {
  text: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  disable?: boolean;
  onClick?: () => void;
}

const BadgePageIcon = ({
  text,
  icon: Icon, // icon 프롭을 Icon으로 변환
  disable = false,
  onClick,
}: BadgePageIconProps) => {
  return (
    <div onClick={onClick} className={cx('badgePageIcon')}>
      <div
        className={cx(
          'badgePageIcon__content',
          disable && 'badgePageIcon__content__disable',
        )}
      >
        {disable ? (
          <IconLockClosed width='22' height='28' />
        ) : (
          <Icon width='40' height='40' />
        )}
      </div>

      <div className={cx('badgePageIcon__text', 'label3-regular')}>{text}</div>
    </div>
  );
};

export default BadgePageIcon;
