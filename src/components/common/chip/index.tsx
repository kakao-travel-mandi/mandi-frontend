'use client';

import { Button as HeadlessButton } from '@headlessui/react';
import classNames from 'classnames/bind';

import IconArrowDown from '@/assets/icon/icon-arrow-down-small-mono.svg';

import styles from './chip.module.scss';

interface ChipProps {
  type?: 'submit' | 'button' | 'reset';
  children: string;
  className?: string;
  action?: boolean;
  disabled?: boolean;
  isActive?: boolean;
  onClick?: () => void;
}

const cx = classNames.bind(styles);

const Chip = ({
  children,
  className,
  type = 'button',
  disabled = false,
  action = false,
  isActive = false,
  onClick,
}: ChipProps) => {
  const chipFont = action ? 'label4-semibold' : 'label3-medium';
  return (
    <HeadlessButton
      type={type}
      className={cx(
        'chip',
        chipFont,
        action && 'chip__action',
        isActive && 'chip__clicked',
        className,
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
      {action && <IconArrowDown width='14' height='14' />}
    </HeadlessButton>
  );
};
export default Chip;
