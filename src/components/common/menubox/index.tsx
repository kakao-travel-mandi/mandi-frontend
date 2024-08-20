import {forwardRef} from 'react';

import {Menu, MenuButton, MenuItems} from '@headlessui/react';
import classNames from 'classnames/bind';

import {ListItem, ListItemProps} from './ListItem';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

const BLOCK = 'menubox';

interface MenuboxProps {
  triggerButton: React.ReactNode;
  items: ListItemProps[];
  align?: 'center' | 'start' | 'end';
  translateX?: number; // 기본적으로 아래 오른쪽 맞춤인데, 좌우 미세 조정할 수 있게 하는 props
}

export const Menubox = ({
  translateX,
  triggerButton,
  items,
  align = 'end',
}: MenuboxProps) => {
  const Trigger = forwardRef(function Trigger(props, ref: any) {
    return (
      <div ref={ref} {...props} className={cx(`${BLOCK}__trigger-button`)}>
        {triggerButton}
      </div>
    );
  });

  return (
    <Menu>
      <MenuButton as={Trigger} />
      <MenuItems
        anchor={`bottom ${align}`}
        className={cx(BLOCK)}
        style={{
          transform: `translateX(${translateX}px)`,
        }}
      >
        {items.map((item, idx) => (
          <ListItem key={idx} {...item} />
        ))}
      </MenuItems>
    </Menu>
  );
};