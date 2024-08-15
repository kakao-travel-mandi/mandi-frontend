import classNames from "classnames/bind";

import { TabBar } from "@/components/TabBar";

import styles from "./page.module.scss";

const cx = classNames.bind(styles);

export default function Page() {
  return (
    <div className={cx("container")}>
      <div className={cx("phone")}>
        <div className={cx("page")}></div>
        <TabBar />
      </div>
    </div>
  );
}
