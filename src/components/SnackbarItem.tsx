import {
  AnimationEvent,
  AnimationEventHandler,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

import classNames from "classnames/bind";

import { Snackbar } from "@/hooks/useSnackbar";

import styles from "./SnackbarItem.module.scss";

import Check from "@/assets/icon-check-circle.svg";
import Alert from "@/assets/icon-exclamation-circle.svg";

const cx = classNames.bind(styles);

export const SnackbarItem = ({
  status,
  setStatus,
  content,
  position,
  type,
  full,
}: Snackbar) => {
  const elemRef = useRef<HTMLDivElement>(null);
  const [animationClassName, setAnimationClassName] = useState<string[]>([]);

  // console.log(status);
  // console.log(animationClassName);
  const handleAnimationEnd = (e: AnimationEvent<HTMLDivElement>) => {
    if (elemRef.current?.className.includes("enter") && status === "open") {
      setAnimationClassName(["show"]);
    } else {
      setStatus(null);
    }
    // enter => show => show exit
  };

  useEffect(() => {
    setAnimationClassName(status === "open" ? ["enter"] : ["show", "exit"]);
  }, [status]);

  return (
    <div
      ref={elemRef}
      className={cx(
        "snackbar_item",
        "body2-semibold",
        {
          full,
          center: position === "center",
          bottom: position === "bottom",
        },
        animationClassName
      )}
      onAnimationEnd={handleAnimationEnd}
    >
      {type === "alert" && <Alert />}
      {type === "check" && <Check />}
      <span>{content}</span>
    </div>
  );
};
