"use client";

import { Button } from "@headlessui/react";
import classNames from "classnames";

import { useStore } from "@/stores/test";

import style from "./page.module.scss";

const cx = classNames.bind(style);

export default function Home() {
  const { bear, increaseBear } = useStore();

  return (
    <div>
      <button
        className={cx(`button`, {
          ["button_blue"]: bear > 10,
        })}
        onClick={increaseBear}
      >
        {bear}
      </button>
      <Button className={cx("button")}>Save changes</Button>
    </div>
  );
}
