'use client';

import React from 'react';

import classNames from 'classnames/bind';
import { useRouter, useSearchParams } from 'next/navigation';

import IconCongratulation from '@/assets/icon/icon-congratulation.svg';
import Button from '@/components/common/button';
import Layout from '@/components/layout';

import styles from './index.module.scss';

const cn = classNames.bind(styles);

const BLOCK = 'welcome';

const Welcome = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nickname = searchParams.get('nickname');

  const handleStart = () => {
    router.push('/home');
  };

  return (
    <Layout hasTopNav={false} hasTabBar={false} back={true}>
      <div className={cn(`${BLOCK}__container`)}>
        <div className={cn(`${BLOCK}__content`)}>
          <IconCongratulation />
          <div className={cn(`${BLOCK}__text`)}>
            <h2>Registration Complete</h2>
            <h1>
              Welcome,
              <br />
              {nickname}!
            </h1>
          </div>
        </div>

        <div className={cn(`${BLOCK}__button-container`)}>
          <Button size='full' color='green' onClick={handleStart}>
            Start Mandi
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Welcome;
