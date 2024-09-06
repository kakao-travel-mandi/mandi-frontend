'use client';

import classNames from 'classnames/bind';

import Flag from '@/assets/colored-icon/flag.svg';
import Pencil from '@/assets/colored-icon/pencil.svg';
import Layout from '@/components/layout';
import { useMyInfoQuery } from '@/queries/myInfoQuery';
import { StaticsPanelType } from '@/types/static-panel';

import { ProfileInfo } from './_components/profile-info/profile-info';
import { StaticsPanel } from './_components/statics-panel/statics-panel';
import styles from './page.module.scss';

const cx = classNames.bind(styles);

const MyInfo = () => {
  const { data: userInfo, error } = useMyInfoQuery();

  // TODO: 에러 처리 하기
  if (!userInfo) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const staticsPanelData: StaticsPanelType[] = [
    {
      icon: Pencil,
      title: 'My course review',
      value: userInfo.response.totalReviews,
    },
    {
      icon: Flag,
      title: 'Completed Courses',
      value: userInfo.response.completedCourses,
    },
  ];

  return (
    <Layout hasTopNav={true} hasTabBar={true} back={true} title='My'>
      <div className={cx(`user-info`)}>
        <ProfileInfo
          className={cx(`user-info__profile`)}
          nickname={userInfo.response.nickname}
          profileImageUrl={userInfo.response.imgUrl}
          bio={userInfo.response.description}
        />
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
