import { forwardRef } from "react";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import classNames from "classnames/bind";

import styles from "./Menubox.module.scss";

const cx = classNames.bind(styles);

type ListItemProps = {
  content: string;
  icon?: React.ReactNode;
  onClick?: () => void;
};

const ListItem = ({ content, icon, onClick }: ListItemProps) => {
  return (
    <MenuItem>
      <button onClick={onClick} className={cx("listItem")}>
        {content}
        {icon}
      </button>
    </MenuItem>
  );
};

type MenuboxProps = {
  translateX?: number; // 기본적으로 아래 오른쪽 맞춤인데, 좌우 미세 조정할 수 있게 하는 props
  triggerButton: React.ReactNode;
  items: ListItemProps[];
};

export const Menubox = ({ translateX, triggerButton, items }: MenuboxProps) => {
  const Trigger = forwardRef(function Trigger(props, ref: any) {
    return (
      <div ref={ref} {...props} className={cx("button")}>
        {triggerButton}
      </div>
    );
  });

  return (
    <Menu>
      <MenuButton as={Trigger} />
      <MenuItems
        anchor="bottom end"
        className={cx("menuItems")}
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
