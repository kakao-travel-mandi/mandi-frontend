import classNames from "classnames/bind";

import styles from "./badge.module.scss";

interface BadgeProps {
  text: string;
  color: "gray" | "green" | "red" | "green-deep";
  rounded?: "small" | "large";
  font?: string;
  onClick?: () => void;
}

const cx = classNames.bind(styles);

export const Badge = ({ text, color, rounded = "small", font = "label4-regular", onClick }: BadgeProps) => {
  return (
    <div className={cx("badge", color, font, rounded === "small" ? "round-small" : "round-large")} onClick={onClick}>
      {text}
    </div>
  );
};
