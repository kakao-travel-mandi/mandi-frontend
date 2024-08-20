import {MenuItem} from '@headlessui/react';
import classNames from 'classnames/bind';

import styles from './ListItem.module.scss';
import React from 'react';

const cx = classNames.bind(styles);

const BLOCK = 'list-item';

export interface ListItemProps {
  content: string;
  icon?: React.ReactElement;
  onClick?: () => void;
}

export const ListItem = ({content, icon, onClick}: ListItemProps) => {
  const iconWithViewBox =
    icon && React.cloneElement(icon, {viewBox: '0 0 24 24'});

  return (
    <MenuItem>
      <button onClick={onClick} className={cx(BLOCK)}>
        <span className={cx(`${BLOCK}__content`)}>{content}</span>
        <div className={cx(`${BLOCK}__icon`)}>{iconWithViewBox}</div>
      </button>
    </MenuItem>
  );
};