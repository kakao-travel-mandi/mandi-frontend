'use client';
import classNames from 'classnames/bind';

import Bell from '@/assets/icon/bell.svg';
import {TopNavBar} from '@/components/common/top-navbar';

import {ProfileInfo} from './_components/ProfileInfo/ProfileInfo';
import {StaticsPanel} from './_components/StaticsPanel/StaticsPanel';
import styles from './page.module.scss';

const cx = classNames.bind(styles);

const staticsPanelData = [
  {
    icon: <Bell />,
    title: 'My course review',
    value: 3,
  },
  {
    icon: <Bell />,
    title: 'Completed Courses',
    value: 3,
  },
];

export default function Home() {
  // TODO: api 어떤것이 있고, 프로필정보랑 스태틱스 패널 정보 어떻게 받아올건지
  return (
    <div>
      <TopNavBar
        title='My'
        actions={[{icon: Bell, onClick: () => console.log('bell clicked')}]}
      />
      <div className={cx(`user-info`)}>
        <ProfileInfo className={cx(`user-info__profile`)} />
        <div className={cx(`user-info__statics`)}>
          {staticsPanelData.map((data, index) => (
            <StaticsPanel
              className={cx(`user-info__statics__panel`)}
              key={index}
              {...data}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
