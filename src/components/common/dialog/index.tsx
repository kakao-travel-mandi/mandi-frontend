import React, { ReactNode } from "react";

import {
  Description,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Dialog as HeadlessDialog,
} from "@headlessui/react";
import classNames from "classnames/bind";

import styles from "./Dialog.module.scss";

const cn = classNames.bind(styles);

const BLOCK = "dialog";

interface DialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  buttons: ReactNode;
  onClose: () => void;
}

const Dialog = ({
  isOpen,
  onClose,
  title,
  description,
  buttons,
}: DialogProps) => {
  return (
    <HeadlessDialog open={isOpen} onClose={onClose}>
      <DialogBackdrop className={cn(`${BLOCK}__backdrop`)} />
      <div className={cn(`${BLOCK}__container`)}>
        <DialogPanel className={cn(`${BLOCK}__panel`)}>
          <div className={cn(`${BLOCK}__panel__content`)}>
            <DialogTitle
              className={cn(`title3-semibold`, `${BLOCK}__panel__title`)}
            >
              {title}
            </DialogTitle>
            <Description
              className={cn(`body2-regular`, `${BLOCK}__panel__description`)}
            >
              {description}
            </Description>
          </div>
          {buttons}
        </DialogPanel>
      </div>
    </HeadlessDialog>
  );
};

export default Dialog;
