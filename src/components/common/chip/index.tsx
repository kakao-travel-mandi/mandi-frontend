import { Button as HeadlessButton } from "@headlessui/react";
import classNames from "classnames/bind";
import Image from "next/image";

import styles from "./chip.module.scss";

interface ChipProps {
  type?: "submit" | "button" | "reset";
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
  type = "button",
  font = "label3-medium",
  disabled = false,
  action = false,
}: ChipProps) => {
  return (
    <HeadlessButton
      type={type}
      className={cx("chip", action ? font === "label4-semibold" : font === "label3-medium", action && "action")}
      disabled={disabled}
    >
      {children}
      {action && (
        <Image src="/icon/icon-arrow-down-small-mono.svg" alt="Check" width={14} height={14} className="actionImg" />
      )}
    </HeadlessButton>
  );
};
