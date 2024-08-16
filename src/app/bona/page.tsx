"use client";
import classNames from "classnames/bind";

import { useSnackbar } from "@/hooks/useSnackbar";

import styles from "./page.module.scss";

const cx = classNames.bind(styles);

export default function Page() {
  const { snackbar, open } = useSnackbar({
    content: "스낵바 테스트",
    full: false,
    type: "alert",
    position: "bottom",
  });
  
  return (
    <div className={cx("container")}>
      <div className={cx("phone")}>
        <div className={cx("page")}>
          <button className={cx("button")} onClick={open}>
            버튼
            {/* 항상 snackbar를 쓰는 곳에서 렌더링 해줘야함... 컨텍스트로 바꿔야하나 */}
            {snackbar}
          </button>
        </div>
        {/* 스낵바 이용할 때, 루트 필요 */}
        <div id="snackbarRoot" />
      </div>
    </div>
  );
}
