//import { Button } from "@headlessui/react";
import classNames from "classnames/bind";

import styles from "./page.module.scss";

interface ButtonProps {
    size: string;
    color: string;
}

const cn = classNames.bind(styles);

export const Button = ({ size, color }: ButtonProps) => {
    return <button></button>;
};
