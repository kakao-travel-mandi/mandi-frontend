"use client";
import classNames from "classnames/bind";

import style from "@/components/button/button.module.scss";
import { Button } from "@/components/button/index";

const cn = classNames.bind(style);

export default function Home() {
    const handleClick = () => {
        console.log("버튼이 클릭되었습니다!");
    };
    return (
        <div className={cn("container")}>
            <Button type="button" size="large" color="gray" onClick={handleClick} disabled={true}>
                테스트테스트테스트
            </Button>
            <Button type="button" size="large" color="gray" onClick={handleClick}>
                테스트테스트테스트
            </Button>
            <Button type="button" size="small" color="gray" onClick={handleClick}>
                테스트테스트테스트
            </Button>
            <Button type="button" size="xSmall" color="gray" onClick={handleClick}>
                테스트테스트테스트
            </Button>
            <Button type="button" size="full" color="gray" onClick={handleClick}>
                테스트테스트테스트
            </Button>

            <Button type="button" size="large" color="green" onClick={handleClick} disabled={true}>
                테스트테스트테스트
            </Button>
            <Button type="button" size="large" color="green" onClick={handleClick}>
                테스트테스트테스트
            </Button>
            <Button type="button" size="small" color="green" onClick={handleClick}>
                테스트테스트테스트
            </Button>
            <Button type="button" size="xSmall" color="green" onClick={handleClick}>
                테스트테스트테스트
            </Button>
            <Button type="button" size="full" color="green" onClick={handleClick}>
                테스트테스트테스트
            </Button>

            <Button type="button" size="large" color="white" onClick={handleClick} disabled={true}>
                테스트테스트테스트
            </Button>
            <Button type="button" size="large" color="white" onClick={handleClick}>
                테스트테스트테스트
            </Button>
            <Button type="button" size="small" color="white" onClick={handleClick}>
                테스트테스트테스트
            </Button>
            <Button type="button" size="xSmall" color="white" onClick={handleClick}>
                테스트테스트테스트
            </Button>
            <Button type="button" size="full" color="white" onClick={handleClick}>
                테스트테스트테스트
            </Button>
        </div>
    );
}
