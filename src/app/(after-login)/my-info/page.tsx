'use client';

import classNames from 'classnames/bind';

import Bell from '@/assets/icon/bell.svg';
import Layout from '@/components/layout';

import { ProfileInfo } from './_components/profile-info/ProfileInfo';
import { StaticsPanel } from './_components/statics-panel/StaticsPanel';
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

const MyInfo = () => {
  return (
    <Layout hasTopNav={true} hasTabBar={false} back={true} title='My'>
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
    </Layout>
  );
};

export default MyInfo;
