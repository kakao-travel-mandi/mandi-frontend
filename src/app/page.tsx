"use client";

import { Button } from "@headlessui/react";
import classNames from "classnames/bind";

import Pencil from "@/assets/icon/icon-pencil-square.svg";
import HomeIcon from "@/assets/tabBar/icon-home.svg";
import { Menubox } from "@/components/Menubox";
import { useStore } from "@/stores/test";

import style from "./page.module.scss";

const cn = classNames.bind(style);

export default function Home() {
  const { bear, increaseBear } = useStore();

  return (
    <div>
      <button
        className={cn(`button`, {
          ["button_blue"]: bear > 10,
        })}
        onClick={increaseBear}
      >
        {bear}
      </button>
      <Button className={cn("button")}>Save changes</Button>
      <HomeIcon />

      <Menubox
        triggerButton={<Button>Open</Button>}
        items={[
          { content: "Item 1" },
          { content: "Item 2" },
          { content: "Item 3" },
        ]}
      />
      <Menubox
        triggerButton={<Button>Open</Button>}
        items={[
          { content: "Item 1", icon: <Pencil /> },
          { content: "Item 2", icon: <Pencil /> },
          { content: "Item 3", icon: <Pencil /> },
        ]}
      />
    </div>
  );
}
