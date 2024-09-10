'use client';

import { Suspense } from 'react';

import Layout from '@/components/layout';

import Content from './_component/Content';

const Welcome = () => {
  return (
    <Layout hasTopNav={false} hasTabBar={false} back={true}>
      <Suspense fallback={<div>Loading...</div>}>
        <Content />
      </Suspense>
    </Layout>
  );
};

export default Welcome;
