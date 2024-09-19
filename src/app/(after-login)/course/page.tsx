'use client';
import { Suspense, useState } from 'react';

import { GoogleMap } from '@react-google-maps/api';
import classNames from 'classnames/bind';

import ListIcon from '@/assets/icon/icon-list-bullet.svg';
import MapIcon from '@/assets/icon/icon-map.svg';
import IconSearch from '@/assets/icon/icon-search-mono.svg';
import IconXCircle from '@/assets/icon/icon-xcircle.svg';
import Input from '@/components/common/input';
import Layout from '@/components/layout';

import CourseMapView from './_components/course-mapview/course-mapview';
import FilteredCourse from './_components/filtered-course/filtered-course';
import { MapProvider } from './map-provider';
import styles from './page.module.scss';

const cx = classNames.bind(styles);

const center = {
  lat: 37.5612811, // 위도
  lng: 126.964338, // 경도
};

const Course = () => {
  const [layout, setLayout] = useState<'list' | 'map' | 'none'>('list');
  const handleLayoutChange = () =>
    setLayout(layout === 'list' ? 'map' : 'list');
  return (
    <Layout hasTopNav={false} hasTabBar={true}>
      {layout === 'list' && (
        <div className={cx('list-container')}>
          <div className={cx('searchbox')}>
            <Input
              placeholder='Course name, Location or Other.'
              value=''
              leftIcon={<IconSearch width={20} height={20} />}
              rightIcon={<IconXCircle width={20} height={20} />}
            />
          </div>
          <Suspense>
            <FilteredCourse />
          </Suspense>
        </div>
      )}
      {layout !== 'list' && (
        <>
          <div className={cx('map-searchbox')}>
            <Input
              placeholder='Course name, Location or Other.'
              value=''
              leftIcon={<IconSearch width={20} height={20} />}
              rightIcon={<IconXCircle width={20} height={20} />}
              className={cx('map-searchbox__input')}
            />
          </div>
          <CourseMapView setLayout={setLayout} />
        </>
      )}
      {layout !== 'none' && (
        <button
          className={cx('layout-button', {
            'layout-button--white': layout === 'map',
            'layout-button--green': layout === 'list',
          })}
          onClick={handleLayoutChange}
        >
          {layout === 'list' && (
            <MapIcon className={cx('layout-button__icon')} />
          )}
          {layout === 'map' && (
            <ListIcon className={cx('layout-button__icon')} />
          )}
          <span>{layout === 'list' ? 'Maps' : 'List'}</span>
        </button>
      )}
    </Layout>
  );
};

export default Course;
