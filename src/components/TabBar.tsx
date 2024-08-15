import { Tab, TabGroup, TabList } from "@headlessui/react";
import classNames from "classnames/bind";

import Scrap from "@/assets/tabBar/icon-bookmark.svg";
import Home from "@/assets/tabBar/icon-home.svg";
import Course from "@/assets/tabBar/icon-map.svg";
import Ranking from "@/assets/tabBar/icon-ranking.svg";
import User from "@/assets/tabBar/icon-user-mono.svg";

import styles from "./TabBar.module.scss";

const cx = classNames.bind(styles);

// TODO: 라우팅 구조 정하고 url 수정하기
const tabData = [
  { id: 1, title: "홈", icon: <Home />, url: "/home" },
  { id: 2, title: "코스", icon: <Course />, url: "/course" },
  { id: 3, title: "스크랩", icon: <Scrap />, url: "/scrap" },
  { id: 4, title: "랭킹", icon: <Ranking />, url: "/ranking" },
  { id: 5, title: "내정보", icon: <User />, url: "/user" },
];

type TabItemProps = {
  title: string;
  icon: React.ReactNode;
  url: string;
};

const TabItem = ({ title, icon, url }: TabItemProps) => {
  // const router = useRouter();
  // const handleClick = () => router.push(url);
  return (
    <Tab
      className={cx("tabItem")}
      // onClick={handleClick}
    >
      {icon}
      <span>{title}</span>
    </Tab>
  );
};

export const TabBar = () => {
  return (
    <TabGroup>
      <TabList className={cx("tabList")}>
        {tabData.map((item, index) => {
          return <TabItem key={index} {...item} />;
        })}
      </TabList>
    </TabGroup>
  );
};
