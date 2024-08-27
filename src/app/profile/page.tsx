'use client';
import classNames from 'classnames/bind';

import Bell from '@/assets/icon/bell.svg';
import {TopNavBar} from '@/components/common/top-navbar';

import {ProfileInfo} from './_components/ProfileInfo/ProfileInfo';
import {StaticsPanel} from './_components/StaticsPanel/StaticsPanel';
import styles from './page.module.scss';

const cx = classNames.bind(styles);

export default function Home() {
  // TODO: api 어떤것이 있고, 프로필정보랑 스태틱스 패널 정보 어떻게 받아올건지
  return (
    <>
      <TopNavBar
        title='My'
        actions={[{icon: Bell, onClick: () => console.log('bell clicked')}]}
      />
      <div className={cx('info')}>
        <ProfileInfo />
        <div className={cx('statics')}>
          <StaticsPanel icon={<Bell />} title='My course review' value={3} />
          <StaticsPanel icon={<Bell />} title={`Completed Courses`} value={3} />
        </div>
      </div>
    </>
  );
}
