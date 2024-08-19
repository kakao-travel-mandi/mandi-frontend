// components/Tabs.tsx
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import classNames from "classnames/bind";

import styles from "./taps.module.scss"; // SCSS 모듈 import

interface TabItem {
  title: string;
  content: JSX.Element | string;
}

interface TabsProps {
  tabs: TabItem[];
  className: string;
  font?: string;
  version?: 1 | 2 | 3 | 4;
}

const cx = classNames.bind(styles);

export const Tabs = ({ tabs, className, font = "subtitle2-semibold", version = 1 }: TabsProps) => {
  return (
    <TabGroup className={cx(className, font)}>
      <div className={cx("tabs")}>
        <TabList
          className={cx("tabs__header", {
            tabs__header__vThree: version === 3,
            tabs__header__vFour: version === 4,
          })}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              className={({ selected }) =>
                cx(
                  "tabs__tab",
                  { tabs__header__active: selected },
                  {
                    tabs__header__active__vTwo : version === 2,
                    tabs__header__active__vThree: version === 3,
                    tabs__header__active__vFour: version === 4,
                  }
                )
              }
            >
              <div> {tab.title}</div>
            </Tab>
          ))}
        </TabList>
        <TabPanels >
          {tabs.map((tab, index) => (
            <TabPanel key={index}>{tab.content}</TabPanel>
          ))}
        </TabPanels>
      </div>
    </TabGroup>
  );
};
