import { Button as HeadlessButton } from '@headlessui/react';
import classNames from 'classnames/bind';

import IconArrowDown from '@/assets/icon/icon-arrow-down-small-mono.svg';

import styles from './chip.module.scss';

interface ChipProps {
  id?: string;
  type?: 'submit' | 'button' | 'reset';
  children: string;
  font?: string;
  className?: string;
  action?: boolean;
  disabled?: boolean;
  selected?: boolean;
  onChanges?: (selected: boolean, key: string) => void;
  onClick?: () => void;
}

const cx = classNames.bind(styles);

const Chip = ({
  id,
  children,
  type = 'button',
  font = 'label3-medium',
  disabled = false,
  action = false,
  selected = false,
  onChanges,
  onClick,
}: ChipProps) => {
  const chipFont = action ? 'label4-semibold' : 'label3-medium';
  const handleChange = () => {
    onChanges?.(!selected, id ?? '');
  };
  const handleClick = () => {
    if (!action) handleChange();
    onClick?.();
  };

  return (
    <HeadlessButton
      id={id}
      type={type}
      className={cx(
        'chip',
        chipFont,
        action && 'chip__action',
        selected && 'chip__selected',
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
