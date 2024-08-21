import classNames from 'classnames/bind';

import styles from './TextActionButton.module.scss';

const cx = classNames.bind(styles);

const BLOCK = 'text-action-button';

export interface TextActionButtonProps {
  text: string;
  onClick: () => void;
}

export const TextButton = ({text, onClick}: TextActionButtonProps) => {
  return (
    <button className={cx('text-action-button')} onClick={onClick}>
      {text}
    </button>
  );
};