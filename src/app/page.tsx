"use client";

import { Button } from "@headlessui/react";
import classNames from "classnames/bind";

import { useStore } from "@/stores/test";

import style from "./page.module.scss";

const cn = classNames.bind(style);

export default function Home() {
    const { bear, increaseBear } = useStore();

    return <div></div>;
}

/*

            <button
                className={cn(`button`, {
                    ["button_blue"]: bear > 10,
                })}
                onClick={increaseBear}
            >
                {bear}
            </button>
            <Button className={cn("button")}>Save changes</Button>
     
*/
