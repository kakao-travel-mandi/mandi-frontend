'use client';

import {useState} from 'react';

import {Button, TabGroup, TabList} from '@headlessui/react';
import classNames from 'classnames/bind';

import Scrap from '@/assets/tabBar/icon-bookmark.svg';
import Home from '@/assets/tabBar/icon-home.svg';
import Course from '@/assets/tabBar/icon-map.svg';
import Ranking from '@/assets/tabBar/icon-ranking.svg';
import User from '@/assets/tabBar/icon-user-mono.svg';

import {TabItem} from './TabItem';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

const BLOCK = 'tab-bar';

// TODO: 라우팅 구조 정하고 url 수정하기
const tabData = [
  {id: 1, title: '홈', icon: <Home />, url: '/home'},
  {id: 2, title: '코스', icon: <Course />, url: '/course'},
  {id: 3, title: '스크랩', icon: <Scrap />, url: '/scrap'},
  {id: 4, title: '랭킹', icon: <Ranking />, url: '/ranking'},
  {id: 5, title: '내정보', icon: <User />, url: '/user'},
];

interface TabBarProps {
  defaultIndex?: number;
  onChange?: (index: number) => void;
}

export const TabBar = ({defaultIndex = 0, onChange}: TabBarProps) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);

  const handleChange = (index: number) => {
    console.log('index', index);
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