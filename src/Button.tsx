import { ReactNode } from "react";
import classNames from "classnames/bind";
import styles from "./Button.module.scss";

const cn = classNames.bind(styles);

interface ButtonProps {
  children: ReactNode;
  type?: "submit" | "button" | "reset";
  size: "large" | "medium" | "small";
  variant?: "solid" | "outline";
  color?: "primary" | "secondary";
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  children,
  type = "button",
  size,
  variant = "solid",
  color = "primary",
  className,
  disabled = false,
  onClick,
  ...rest
}: ButtonProps) {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      disabled={disabled}
      className={cn("button", size, variant, color, className)}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
