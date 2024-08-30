import React from 'react';

import {MenuItem} from '@headlessui/react';
import classNames from 'classnames/bind';

import styles from './list-item.module.scss';

const cx = classNames.bind(styles);

const BLOCK = 'list-item';

export interface ListItemProps {
  content: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
}

export const ListItem = ({content, icon: Icon, onClick}: ListItemProps) => {
  return (
    <MenuItem>
      <button onClick={onClick} className={cx(BLOCK)}>
        <span className={cx(`${BLOCK}__content`)}>{content}</span>
        {Icon && <Icon className={cx(`${BLOCK}__icon`)} />}
      </button>
    </MenuItem>
  );
};
