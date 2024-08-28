'use client';

import { useEffect, useState } from 'react';

import { redirect } from 'next/navigation';

import Mountain from '@/assets/icon/icon-mandi-image.svg';
import Splash from '@/assets/icon/icon-splash.svg';
import Layout from '@/components/layout';
import { getUser } from '@/utils/auth';

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);
  const user = getUser();

  useEffect(() => {
    if (!user) {
      redirect('/home');
    } else {
      setTimeout(() => {
        setFade(true);
        setTimeout(() => setLoading(false), 500); // 0.3초 후에 loading을 false로 설정
      }, 800); // 1초 후에 fade를 true로 설정
    }
  }, [user]);

  if (loading) {
    return (
      <Layout hasTopNav={false} hasTabBar={false}>
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: fade ? 0 : 1,
            transition: 'opacity 0.5s ease-in',
          }}
        >
          <Splash />
        </div>
      </Layout>
    );
  }

  return (
    <Layout hasTopNav={false} hasTabBar={false}>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: fade ? 1 : 0,
          transition: 'opacity 0.5s ease-in',
        }}
      >
        <button>로그인</button>
      </div>
    </Layout>
  );
};

export default Main;
