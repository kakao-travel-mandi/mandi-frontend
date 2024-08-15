"use client";

import { useState } from "react";

import { Button } from "@headlessui/react";
import classNames from "classnames/bind";

import HomeIcon from "@/assets/tabBar/icon-home.svg";
import Dialog from "@/components/common/Dialog";
import Input from "@/components/common/Input";
import useInput from "@/hooks/useInput";
import { useStore } from "@/stores/test";
import { handleInputValidate } from "@/utils/validate";

import style from "./page.module.scss";

const cn = classNames.bind(style);

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
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

      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", gap: "10px" }}>
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
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onError={(value) => handleError("email", value)}
            error={errors.email}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      <button onClick={() => setIsOpen(true)}>Open</button>
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="제목입니다."
        description="내용입니다."
        buttons={
          <>
            <Button>취소</Button>
            <Button>확인</Button>
          </>
        }
      />
    </div>
  );
}
