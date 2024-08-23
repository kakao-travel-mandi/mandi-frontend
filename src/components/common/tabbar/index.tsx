'use client';

import {useEffect, useState} from 'react';

import {TabGroup, TabList} from '@headlessui/react';
import classNames from 'classnames/bind';

import Scrap from '@/assets/tabBar/icon-bookmark.svg';
import Community from '@/assets/tabBar/icon-chat-bubble-oval-left-ellipsis.svg';
import Home from '@/assets/tabBar/icon-home.svg';
import Course from '@/assets/tabBar/icon-map.svg';
import User from '@/assets/tabBar/icon-user-mono.svg';

import {TabItem} from './TabItem';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

const BLOCK = 'tab-bar';

// TODO: 라우팅 구조 정하고 url 수정하기
const tabData = [
  {id: 1, title: 'Home', icon: Home, url: '/home'},
  {id: 2, title: 'Course', icon: Course, url: '/course'},
  {id: 3, title: 'Scrap', icon: Scrap, url: '/scrap'},
  {id: 4, title: 'Community', icon: Community, url: '/community'},
  {id: 5, title: 'My', icon: User, url: '/user'},
];

interface TabBarProps {
  defaultIndex?: number;
  onChange?: (index: number) => void;
}

export const TabBar = ({defaultIndex = 0, onChange}: TabBarProps) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);

  useEffect(() => {
    setSelectedIndex(defaultIndex);
  }, [defaultIndex]);

  const handleChange = (index: number) => {
    // console.log('index', index);
    setSelectedIndex(index);
    onChange?.(index);
  };

  return (
    <TabGroup
      selectedIndex={selectedIndex}
      onChange={handleChange}
      className={cx(BLOCK)}
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
