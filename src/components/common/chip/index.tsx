import { useState } from 'react';

import { Button as HeadlessButton } from '@headlessui/react';
import classNames from 'classnames/bind';

import IconArrowDown from '@/assets/icon/icon-arrow-down-small-mono.svg';

import styles from './chip.module.scss';

interface ChipProps {
  type?: 'submit' | 'button' | 'reset';
  children: string;
  font?: string;
  className?: string;
  action?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const cx = classNames.bind(styles);

const Chip = ({
  children,
  type = 'button',
  font = 'label3-medium',
  disabled = false,
  action = false,
  onClick,
}: ChipProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(!isClicked);
    if (onClick) {
      onClick();
    }
  };
  return (
    <HeadlessButton
      type={type}
      className={cx(
        'chip',
        action ? font === 'label4-semibold' : font === 'label3-medium',
        action && 'chip__action',
        isClicked && 'chip__clicked',
      )}
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
      {action && <IconArrowDown width='14' height='14' />}
    </HeadlessButton>
  );
};
export default Chip;
