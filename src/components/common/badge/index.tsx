import classNames from "classnames/bind";

import styles from "./badge.module.scss";

interface BadgeProps {
  text: string;
  color: "gray" | "green" | "red" | "green-deep";
  Rounded?: "small" | "large";
  font?: string;
  onClick?: () => void;
}

const cx = classNames.bind(styles);

export const Badge = ({ text, color, Rounded = "small", font = "label4-regular", onClick }: BadgeProps) => {
  return (
    <div className={cx("badge", color, font, Rounded === "small" ? "round-small" : "round-large")} onClick={onClick}>
      {text}
    </div>
  );
};
