import classNames from 'classnames/bind';

import styles from './badge.module.scss';

export interface BadgeProps {
  text: string;
  color: 'gray' | 'green' | 'red' | 'greenDeep';
  rounded?: 'small' | 'large';
  font?: string;
  onClick?: () => void;
}

const cx = classNames.bind(styles);

const Badge = ({ text, color, rounded = "small", font = "label4-regular", onClick }: BadgeProps) => {
   const colorClass = `badge__${color}`
   const roundedClass= `badge__round__${rounded}`
  return (
    <div className={cx("badge", font, colorClass, roundedClass)} onClick={onClick}>
      {text}
    </div>
  );
};
export default Badge