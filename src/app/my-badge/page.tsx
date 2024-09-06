'use client';
import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';

import IconMedal from '@/assets/icon/icon-medal.svg';
import BadgePageIcon from '@/components/badgepage-icon';
import BadgePageIconInfo from '@/components/badgepage-icon/badgepage-icon-info';
import BottomSheet from '@/components/common/bottomsheet';
import Layout from '@/components/layout';
import { useBadgesMutation } from '@/queries/badgeQuery';

import styles from './myBadge.module.scss';

const cx = classNames.bind(styles);

const MyBadge = () => {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const { mutate, data, error, isError } = useBadgesMutation({
    onSuccess: data => {
      console.log('Badges fetched successfully:', data);
    },
    onError: error => {
      console.error('Error fetching badges:', error);
    },
  });
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

  useEffect(() => {
    mutate('1');
  }, [mutate]);

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }
  console.log(data?.response.badges[0].imgUrl);

  return (
    <Layout hasTopNav={true} hasTabBar={false} back={true} title='My Badges'>
      <div className={cx('container')}>
        <div className={cx('container__medal')}>
          <IconMedal />
          <span className={cx('body1-semibold')}>0 / 6</span>
          <span className={cx('label3-regular')}>
            Check the requirements and
            <br />
            collect your badges!
          </span>
        </div>
        <div className={cx('container__content')}>
          <BadgePageIcon
            icon='/test/icon-hole-cup.svg'
            disable={false}
            text='Mandi Starter'
            onClick={handleClick}
          />
          <BadgePageIcon
            disable={true}
            text='Course Collector'
            onClick={handleClick}
          />
          <BadgePageIcon
            disable={true}
            text='Joy of Sharing'
            onClick={handleClick}
          />
          <BadgePageIcon
            disable={true}
            text='Beginning of Completion'
            onClick={handleClick}
          />
          <BadgePageIcon
            disable={true}
            text='Walked 10,000 Steps'
            onClick={handleClick}
          />
          <BadgePageIcon
            disable={true}
            text='Mandiholic'
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
