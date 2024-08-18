'use client';

import Home from '@/assets/icon/bell.svg';
import {TabBar} from '@/components/common/tabbar';
import {TopNavBar} from '@/components/common/top-navbar';
import {useSnackbar} from '@/hooks/useSnackbar';

export default function Page() {
  const {open, snackbar} = useSnackbar({
    content: '알림메시지',
    position: 'center',
    type: 'check',
    full: true,
  });
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
          },
        ]}
      />
      <button onClick={open}>
        스낵바 열기
        {snackbar}
      </button>
      <div id="snackbarRoot" />
    </div>
  );
}