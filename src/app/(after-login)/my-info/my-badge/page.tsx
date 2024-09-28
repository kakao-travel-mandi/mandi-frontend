'use client';
import { useState } from 'react';

import classNames from 'classnames/bind';

import BadgePageIcon from '@/app/(after-login)/my-info/_components/badgepage-icon';
import BadgePageIconInfo from '@/app/(after-login)/my-info/_components/badgepage-icon/badgepage-icon-info';
import IconMedal from '@/assets/icon/icon-medal.svg';
import BottomSheet from '@/components/common/bottomsheet';
import Layout from '@/components/layout';
import { useBadgesQuery } from '@/queries/badgeQuery';

import styles from './myBadge.module.scss';

const cx = classNames.bind(styles);

const MyBadge = () => {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const { data, isError, error } = useBadgesQuery();
  const toggleSheet = () => {
    setSheetOpen(prev => !prev);
  };
  const [selectedBadge, setSelectedBadge] = useState<{
    text?: string;
    icon?: string;
    disable?: boolean;
  } | null>(null);
  const handleClick = (info: {
    text?: string;
    icon?: string;
    disable?: boolean;
  }) => {
    setSelectedBadge(info);
    toggleSheet();
  };

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }
  console.log(data?.response.badges[0].imgUrl);

  return (
    <Layout hasTopNav={true} hasTabBar={false} back={true} title='My Badges'>
      <div className={cx('container')}>
        <div className={cx('container__medal')}>
          <IconMedal />
          <span className={cx('body1-semibold')}>
            {`${data?.response.userBadgeCount}`} / 6
          </span>
          <span className={cx('label3-regular')}>
            Check the requirements and
            <br />
            collect your badges!
          </span>
        </div>
        <div className={cx('container__content')}>
          <BadgePageIcon
            icon={undefined ?? '/badge/mountain.svg'}
            disable={false}
            text={`${data?.response.badges[0].name}` ?? 'Mandi Starter'}
            onClick={handleClick}
          />
          <BadgePageIcon
            disable={true}
            text={`${data?.response.badges[1].name}` ?? 'Course Collector'}
            onClick={handleClick}
          />
          <BadgePageIcon
            disable={true}
            text={`${data?.response.badges[2].name}` ?? 'Joy of Sharing'}
            onClick={handleClick}
          />
          <BadgePageIcon
            disable={true}
            text={
              `${data?.response.badges[3].name}` ?? 'Beginning of Completion'
            }
            onClick={handleClick}
          />
          <BadgePageIcon
            disable={true}
            text={`${data?.response.badges[4].name}` ?? 'Walked 10,000 Steps'}
            onClick={handleClick}
          />
          <BadgePageIcon
            disable={true}
            text={`${data?.response.badges[5].name}` ?? 'Mandiholic'}
            onClick={handleClick}
          />
        </div>
        <BottomSheet isOpen={isSheetOpen} onClose={toggleSheet}>
          <BadgePageIconInfo
            text={selectedBadge?.text}
            icon={selectedBadge?.icon}
            disable={selectedBadge?.disable}
            onClick={() => {
              setSelectedBadge(null);
              setSheetOpen(prev => !prev);
            }}
          />
        </BottomSheet>
      </div>
    </Layout>
  );
};

export default MyBadge;
