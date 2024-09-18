'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import RunningIcon from '@/assets/icon/exercise_running.svg';
import BookmarkIconStroke from '@/assets/icon/icon-bookmark-Stroke.svg';
import BookmarkIcon from '@/assets/icon/icon-bookmark.svg';
import ClockIcon from '@/assets/icon/icon-clock.svg';
import EllipsisHorizontalIcon from '@/assets/icon/icon-ellipsis-horizontal.svg';
import LocationIcon from '@/assets/icon/icon-map-pin.svg';
import TagIcon from '@/assets/icon/icon-tag.svg';
import Badge from '@/components/common/badge';
import Button from '@/components/common/button';
import Divider from '@/components/common/divider';
import Layout from '@/components/layout';

import CoursePoints from './_components/course-points/course-points';
import DetailInfo from './_components/detail-info/detail-info';
import { Rating } from './_components/rating-chart/rating-chart';
import ReviewList from './_components/review-list/review-list';
import ReviewOverview from './_components/review-overview/review-overview';
import styles from './page.module.scss';

const cx = classNames.bind(styles);

const ratings: Rating[] = [
  { label: 'Excellent', count: 17 },
  { label: 'Very Good', count: 3 },
  { label: 'Average', count: 0 },
  { label: 'Poor', count: 1 },
  { label: 'Terrible', count: 0 },
];

const CourseDetailPage = ({ params }: { params: { 'course-id': string } }) => {
  const { 'course-id': courseId } = params;
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleBookmarkClick = () => {
    setBookmarked(prev => !prev);
  };
  const handleMoreRewiewsButtonClick = () =>
    router.push(`/course/${courseId}/reviews`);

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const isScrolled = containerRef.current.scrollTop > 0;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    }
  }, [scrolled]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleScroll]);
  return (
    <Layout
      hasTopNav={true}
      hasTabBar={false}
      back={true}
      topNavBarClassName={cx('navbar', {
        'navbar--not-scrolled': !scrolled,
      })}
      // TODO: 북마크 부분 기능, 디자인 수정 필요
      actions={[
        {
          icon: bookmarked ? BookmarkIcon : BookmarkIconStroke,
          onClick: handleBookmarkClick,
        },
      ]}
    >
      <div className={cx('container')} ref={containerRef}>
        <div className={cx('representative-image')}>
          <Image
            src={'/dummy-image.png'}
            alt='shinsundea'
            layout='fill'
            objectFit='cover'
          />
        </div>
        <div className={cx('overview-section')}>
          <h1 className={cx('course-name')}>Sinseondea</h1>
          <div className={cx('course-details')}>
            <DetailInfo icon={TagIcon} content='Easy' />
            <DetailInfo icon={ClockIcon} content='1:30' />
            <DetailInfo icon={RunningIcon} content='1.93 km' />
            <DetailInfo
              icon={LocationIcon}
              content={
                <div className={cx('course-points')}>
                  <Badge text='해운대' color='gray' />
                  <EllipsisHorizontalIcon />
                  <Badge text='봉오리산' color='gray' />
                </div>
              }
            />
          </div>
        </div>
        <Divider />
        <div className={cx('location-section')}>
          <h3 className={cx('section-title')}>Course Location</h3>
          <CoursePoints type='start' address='Yongdang-dong, Nam-gu, Busan' />
          <CoursePoints type='end' address='Yongdang-dong, Nam-gu, Busan' />
          <div className={cx('course-image')}></div>
          <Button color='green' size='full'>
            Course Start
          </Button>
        </div>
        <Divider />
        <div className={cx('review-overview-section')}>
          <ReviewOverview />
        </div>
        <div className={cx('review-list-section')}>
          <ReviewList maxCount={2} hasFilter={false} />
          <Button
            color='white'
            size='small'
            onClick={handleMoreRewiewsButtonClick}
          >
            more reviews
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default CourseDetailPage;
