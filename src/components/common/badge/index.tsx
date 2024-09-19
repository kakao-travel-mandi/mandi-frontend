import classNames from 'classnames/bind';

import styles from './badge.module.scss';

export interface BadgeProps {
  text: string;
  color: 'gray' | 'green' | 'red' | 'greenDeep' | 'orange';
  rounded?: 'small' | 'large';
  font?: string;
  className?: string;
  onClick?: () => void;
}

const cx = classNames.bind(styles);

const Badge = ({ text, color, rounded = "small", font = "label4-regular",className, onClick }: BadgeProps) => {
   const colorClass = `badge__${color}`
   const roundedClass= `badge__round__${rounded}`
  return (
    <div className={cx("badge", font, colorClass, roundedClass, className)} onClick={onClick}>
      {text}
    </div>
  );
};
export default Badge;
