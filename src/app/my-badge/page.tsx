'use client';
import { useState } from 'react';

import classNames from 'classnames/bind';

import IconMedal from '@/assets/icon/icon-medal.svg';
import BadgePageIcon from '@/components/badgepage-icon';
import BadgePageIconInfo from '@/components/badgepage-icon/badgepage-icon-info';
import Layout from '@/components/layout';

import styles from './myBadge.module.scss';

const cx = classNames.bind(styles);

const MyBadge = () => {
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
    console.log(info);
    setSelectedBadge(info);
  };
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
        {selectedBadge && (
          <BadgePageIconInfo
            text={selectedBadge?.text}
            icon={selectedBadge?.icon}
            disable={selectedBadge?.disable}
            onClick={() => setSelectedBadge(null)}
          />
        )}
      </div>
    </Layout>
  );
};

export default MyBadge;
