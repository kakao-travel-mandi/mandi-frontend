'use client';

import Home from '@/assets/icon/bell.svg';
import {TabBar} from '@/components/common/tabbar';
import {TopNavBar} from '@/components/common/top-navbar';

export default function Page() {
  return (
    <div>
      <TabBar />
      <TopNavBar
        title="헬로"
        actions={[
          {
            icon: <Home />,
            onClick: () => {
              console.log('home');
            },
          },
          {
            text: '알림',
            onClick: () => {
              console.log('notification');
            },
          }
        ]}
      />
    </div>
  );
}