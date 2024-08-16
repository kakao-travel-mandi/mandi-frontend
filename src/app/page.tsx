"use client";

import { useState } from "react";

import { Button } from "@headlessui/react";
import classNames from "classnames/bind";

import Back from "@/assets/icon/icon-arrow-left-small-mono.svg";
import HomeIcon from "@/assets/tabBar/icon-home.svg";
import { TopNavBar } from "@/components/TopNavBar";
import BottomSheet from "@/components/common/Bottomsheet";
import Dialog from "@/components/common/Dialog";
import Input from "@/components/common/Input";
import useInput from "@/hooks/useInput";
import { useStore } from "@/stores/test";
import { handleInputValidate } from "@/utils/validate";

import style from "./page.module.scss";

const cn = classNames.bind(style);

export default function Home() {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isBottomSheetOpen, setBottomSheetOpen] = useState(false);

  const { bear, increaseBear } = useStore();

  const { values, errors, handleChange, handleError, validateAll } = useInput({
    initialValues: { username: "", email: "" },
    handleValidate: handleInputValidate,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const hasError = validateAll();
    if (hasError) return;
  };

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

      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "300px",
            // margin: "",
          }}
        >
          <Input
            name="username"
            label="Username"
            helper="이름을 입력해주세요"
            value={values.username}
            error={errors.username}
            placeholder="이름을 입력해주세요"
            leftIcon="/icon/icon-search-mono.svg"
            rightIcon="/icon/icon-xcircle.svg"
            onChange={(e) => handleChange("username", e.target.value)}
            onError={(value) => handleError("username", value)}
            onDelete={() => handleChange("username", "")}
          />

          <Input
            name="email"
            label="Email"
            helper="이메일을 입력해주세요"
            value={values.email}
            error={errors.email}
            placeholder="이메일을 입력해주세요"
            leftIcon="/icon/icon-search-mono.svg"
            rightIcon="/icon/icon-xcircle.svg"
            onChange={(e) => handleChange("email", e.target.value)}
            onError={(value) => handleError("email", value)}
            onDelete={() => handleChange("email", "")}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      <button onClick={() => setIsOpenDialog(true)}>Open</button>
      <Dialog
        isOpen={isOpenDialog}
        onClose={() => setIsOpenDialog(false)}
        title="제목입니다."
        description="내용입니다."
        buttons={<>children</>}
      />

      <button onClick={() => setBottomSheetOpen(true)}>Open BottomSheet</button>
      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setBottomSheetOpen(false)}
      >
        <p>콘텐츠 박스</p>
      </BottomSheet>
    </div>
  );
}
