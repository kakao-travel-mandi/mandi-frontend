import classNames from 'classnames/bind';

import styles from './IconActionButton.module.scss';

const cx = classNames.bind(styles);

const BLOCK = 'icon-action-button';

export interface IconActionButtonProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  onClick: () => void;
}

export const IconButton = ({icon: Icon, onClick}: IconActionButtonProps) => {
  return (
    <button className={cx(BLOCK)} onClick={onClick}>
      <Icon />
    </button>
  );
};
