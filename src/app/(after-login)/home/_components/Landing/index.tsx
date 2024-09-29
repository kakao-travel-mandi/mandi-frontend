'use client';

import React from 'react';

import classNames from 'classnames/bind';

import { useMyInfoQuery } from '@/queries/myInfoQuery';

import SearchInput from './SearchInput';
import styles from './index.module.scss';

const cn = classNames.bind(styles);
const BLOCK = 'landing';

const Landing = () => {
  const { data: userInfo } = useMyInfoQuery();
  return (
    <div className={cn(BLOCK)}>
      <div className={cn(`${BLOCK}__title`)}>
        <p>{userInfo?.response.nickname}</p>
        <p>Where should we go today?</p>
      </div>
      <SearchInput />
    </div>
  );
};

export default Landing;
