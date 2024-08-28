import { Button as HeadlessButton } from '@headlessui/react';
import classNames from 'classnames/bind';

import styles from './button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  size: 'large' | 'small' | 'xSmall' | 'full';
  color: 'green' | 'gray' | 'white';
  font?: string;
  className?: string;
}

const cn = classNames.bind(styles);

const Button = ({
  children,
  size,
  color,
  className,
  disabled = false,
  font = 'subtitle1-semibold',
  type = 'button',
  onClick,
  ...rest
}: ButtonProps) => {
  const colorClass = `button__${color}`;
  const sizeClass = `button__${size}`;

  return (
    <HeadlessButton
      type={type}
      onClick={onClick}
      className={cn('button', sizeClass, colorClass, font, className)}
      disabled={disabled}
      {...rest}
    >
      {children}
    </HeadlessButton>
  );
};

export default Button;
