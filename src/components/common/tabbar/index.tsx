'use client';

import { useEffect, useState } from 'react';

import { TabGroup, TabList } from '@headlessui/react';
import classNames from 'classnames/bind';
import { usePathname } from 'next/navigation';

import Scrap from '@/assets/tabbar/icon-bookmark.svg';
import Community from '@/assets/tabbar/icon-chat-bubble-oval-left-ellipsis.svg';
import Home from '@/assets/tabbar/icon-home.svg';
import Course from '@/assets/tabbar/icon-map.svg';
import User from '@/assets/tabbar/icon-user-mono.svg';
import { PATHNAME } from '@/constants/pathname';

import styles from './index.module.scss';
import { TabItem } from './tab-item';

const cx = classNames.bind(styles);

const BLOCK = 'tab-bar';

// TODO: 라우팅 구조 정하고 url 수정하기
const tabData = [
  { id: 1, title: 'Home', icon: Home, url: '/home' },
  { id: 2, title: 'Course', icon: Course, url: '/course' },
  { id: 3, title: 'Scrap', icon: Scrap, url: '/scrap' },
  { id: 4, title: 'Community', icon: Community, url: '/community' },
  { id: 5, title: 'My', icon: User, url: '/user' },
];

interface TabBarProps {
  defaultIndex?: number;
  className?: string;
  onChange?: (index: number) => void;
}

const TabBar = ({ defaultIndex = 0, onChange, className }: TabBarProps) => {
  const pathname = usePathname();
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);

  useEffect(() => {
    const currentPath = pathname;
    const currentIndex = tabData.findIndex(tab => tab.url === currentPath);
    if (currentIndex !== -1) {
      setSelectedIndex(currentIndex);
    }
  }, [pathname]);

  const handleChange = (index: number) => {
    setSelectedIndex(index);
    onChange?.(index);
  };

  return (
    <TabGroup
      selectedIndex={selectedIndex}
      onChange={handleChange}
      className={cx(BLOCK, className)}
    >
      <TabList className={cx(`${BLOCK}__tab-list`)}>
        {tabData.map((item, index) => {
          return (
            <TabItem key={index} {...item} selected={index === selectedIndex} />
          );
        })}
      </TabList>
    </TabGroup>
  );
};

export default TabBar;
