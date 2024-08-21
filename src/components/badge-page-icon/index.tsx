import classNames from 'classnames/bind';
import Image from 'next/image';

import styles from './badgePageIcon.module.scss';

const cx = classNames.bind(styles);

export interface BadgePageIconProps {
  text: string;
  src: string;
  alt: string;
  disable?: boolean;
  onClick?: () => void;
}

const BadgePageIcon = ({
  text,
  src,
  alt,
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
          <Image
            src="/icon/icon-lock-closed.svg"
            width={22}
            height={28}
            alt="lockIcon"
          />
        ) : (
          <Image src={src} width={40} height={40} alt={alt} />
        )}
      </div>

      <div className={cx('badgePageIcon__text', 'label3-regular')}>{text}</div>
    </div>
  );
};
export default BadgePageIcon;