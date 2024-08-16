"use client";

import { Button } from "@headlessui/react";
import classNames from "classnames/bind";

import Back from "@/assets/icon/icon-arrow-left-small-mono.svg";
import HomeIcon from "@/assets/tabBar/icon-home.svg";
import { TopNavBar } from "@/components/TopNavBar";
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
      <>
        <TopNavBar logo={true} />
        <TopNavBar
          logo={true}
          actions={[{ text: "확인", onClick: () => console.log("확인") }]}
        />

        <TopNavBar
          logo={true}
          actions={[
            {
              icon: <Back />,
              onClick: () => console.log("확인"),
            },
          ]}
        />
        <TopNavBar
          logo={true}
          actions={[
            {
              icon: <Back />,
              onClick: () => console.log("확인"),
            },
            {
              icon: <Back />,
              onClick: () => console.log("확인"),
            },
          ]}
        />

        {/* 두번째 */}
        <TopNavBar title="테스트" />
        <TopNavBar
          title="테스트"
          actions={[{ text: "확인", onClick: () => console.log("확인") }]}
        />
        <TopNavBar
          title="테스트"
          actions={[
            {
              icon: <Back />,
              onClick: () => console.log("확인"),
            },
          ]}
        />
        <TopNavBar
          title="테스트"
          actions={[
            {
              icon: <Back />,
              onClick: () => console.log("확인"),
            },
            {
              icon: <Back />,
              onClick: () => console.log("확인"),
            },
          ]}
        />
        {/* 세번째 */}
        <TopNavBar title="테스트" back={true} />
        <TopNavBar
          back={true}
          title="테스트"
          actions={[{ text: "확인", onClick: () => console.log("확인") }]}
        />
        <TopNavBar
          back={true}
          title="테스트"
          actions={[
            {
              icon: <Back />,
              onClick: () => console.log("확인"),
            },
          ]}
        />
        <TopNavBar
          back={true}
          title="테스트"
          actions={[
            {
              icon: <Back />,
              onClick: () => console.log("확인"),
            },
            {
              icon: <Back />,
              onClick: () => console.log("확인"),
            },
          ]}
        />
        {/* 네번째 */}
        <TopNavBar back={true} />
        <TopNavBar
          back={true}
          actions={[{ text: "확인", onClick: () => console.log("확인") }]}
        />
        <TopNavBar
          back={true}
          actions={[
            {
              icon: <Back />,
              onClick: () => console.log("확인"),
            },
          ]}
        />
        <TopNavBar
          back={true}
          actions={[
            {
              icon: <Back />,
              onClick: () => console.log("확인"),
            },
            {
              icon: <Back />,
              onClick: () => console.log("확인"),
            },
          ]}
        />
        {/* 마지막 */}
        <TopNavBar />
        <TopNavBar
          actions={[{ text: "확인", onClick: () => console.log("확인") }]}
        />
        <TopNavBar
          actions={[
            {
              icon: <Back />,
              onClick: () => console.log("확인"),
            },
          ]}
        />
        <TopNavBar
          actions={[
            {
              icon: <Back />,
              onClick: () => console.log("확인"),
            },
            {
              icon: <Back />,
              onClick: () => console.log("확인"),
            },
          ]}
        />
      </>
    </div>
  );
}
