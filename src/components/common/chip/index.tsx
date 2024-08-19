import {Button as HeadlessButton} from '@headlessui/react';
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

export const Chip = ({
  children,
  type = 'button',
  font = 'label3-medium',
  disabled = false,
  action = false,
}: ChipProps) => {
  return (
    <HeadlessButton
      type={type}
      className={cx(
        'chip',
        action ? font === 'label4-semibold' : font === 'label3-medium',
        action && 'chip__action',
      )}
      disabled={disabled}
    >
      {children}
      {action && <IconArrowDown width="14" height="14" />}
    </HeadlessButton>
  );
};