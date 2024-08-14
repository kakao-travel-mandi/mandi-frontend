import classNames from "classnames/bind";

import styles from "./button.module.scss";

interface ButtonProps {
    children: string;
    size: "large" | "small" | "xSmall" | "full";
    color: "green" | "gray" | "white";
    type?: "submit" | "button" | "reset";
    font?: string;
    className?: string;
    disabled?: boolean;
    onClick?: () => void;
}

const cn = classNames.bind(styles);

export const Button = ({
    children,
    size,
    color,
    className,
    disabled = false,
    font = "subtitle1-semibold",
    type = "button",
    onClick,
    ...rest
}: ButtonProps) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={cn("button", size, color, font, className)}
            disabled={disabled}
            {...rest}
        >
            {children}
        </button>
    );
};
