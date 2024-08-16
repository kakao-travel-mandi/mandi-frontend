import { ReactNode } from "react";

import classNames from "classnames/bind";

import styles from "./bottomsheet.module.scss";

const cn = classNames.bind(styles);

const BLOCK = "bottomsheet";

interface BottomSheetProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const BottomSheet = ({ children, isOpen, onClose }: BottomSheetProps) => {
  return (
    <div
      className={cn(BLOCK, {
        [`${BLOCK}--active`]: isOpen,
      })}
    >
      <div className={cn(`${BLOCK}__overlay`)} onClick={onClose}></div>
      <div
        className={cn(`${BLOCK}__sheet`, {
          [`${BLOCK}__sheet--active`]: isOpen,
        })}
      >
        <div className={cn(`${BLOCK}__handle`)}></div>
        <div className={cn(`${BLOCK}__content`)}>{children}</div>
        <div className={cn(`${BLOCK}__bottom`)}></div>
      </div>
    </div>
  );
};

export default BottomSheet;
