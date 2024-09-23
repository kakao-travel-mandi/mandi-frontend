'use client';
import { Suspense, useState } from 'react';

import classNames from 'classnames/bind';

import IconSearch from '@/assets/icon/icon-search-mono.svg';
import IconXCircle from '@/assets/icon/icon-xcircle.svg';
import Input from '@/components/common/input';
import Layout from '@/components/layout';

import CourseMapView from './_components/course-mapview/course-mapview';
import FilteredCourse from './_components/filtered-course/filtered-course';
import styles from './page.module.scss';
import ViewSwitchButton from './_components/view-switch-button/view-switch-button';

const cx = classNames.bind(styles);

const Course = () => {
  const [layout, setLayout] = useState<'list' | 'map'>('map');
  const [markerSelected, setMarkerSelected] = useState(false);

  const handleLayoutChange = () =>
    setLayout(layout === 'list' ? 'map' : 'list');

  return (
    <Layout hasTopNav={false} hasTabBar={true}>
      <div
        className={cx(layout === 'list' ? 'list-searchbox' : 'map-searchbox')}
      >
        <Input
          placeholder='Course name, Location or Other.'
          value=''
          leftIcon={<IconSearch width={20} height={20} />}
          rightIcon={<IconXCircle width={20} height={20} />}
          className={cx(layout === 'map' && 'map-searchbox__input')}
        />
      </div>
      {layout === 'list' ? (
        <div className={cx('list-container')}>
          <Suspense>
            <FilteredCourse />
          </Suspense>
        </div>
      ) : (
        layout === 'map' && (
          <CourseMapView setMarkerSelected={setMarkerSelected} />
        )
      )}
      <ViewSwitchButton
        visible={!markerSelected}
        layout={layout}
        onClick={handleLayoutChange}
        className={cx('layout-switch-button')}
      />
    </Layout>
  );
};

export default Course;
