import classNames from 'classnames/bind';

import styles from './reviewBadge.module.scss';

export interface ReviewBadgeProps {
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  text: string;
  font?: string;
  onClick?: () => void;
}

const cx = classNames.bind(styles);

const ReviewBadge = ({
  text,
  icon: Icon,
  font = 'label4-regular',
  onClick,
}: ReviewBadgeProps) => {
  return (
    <div className={cx('reviewbadge', font)} onClick={onClick}>
      {Icon && <Icon width='16' height='16' />}
      {text}
    </div>
  );
};
export default ReviewBadge;
