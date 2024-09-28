'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import BookmarkIconStroke from '@/assets/icon/icon-bookmark-Stroke.svg';
import BookmarkIcon from '@/assets/icon/icon-bookmark.svg';
import Button from '@/components/common/button';
import Divider from '@/components/common/divider';
import Layout from '@/components/layout';

import CoursePoints from './_components/course-points/course-points';
import DetailInfo from './_components/detail-info/detail-info';
import ReviewList from './_components/review-list/review-list';
import ReviewOverview from './_components/review-overview/review-overview';
import styles from './page.module.scss';

const cx = classNames.bind(styles);

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
            <DetailInfo type='difficulty' content='Easy' />
            <DetailInfo type='duration' content='1:30' />
            <DetailInfo type='distance' content='1.93 km' />
            <DetailInfo
              type='points'
              content={{ startPoint: '해운대', endPoint: '봉오리산' }}
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
