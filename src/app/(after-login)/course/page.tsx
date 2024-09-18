import { Suspense } from 'react';

import classNames from 'classnames/bind';

import IconSearch from '@/assets/icon/icon-search-mono.svg';
import IconXCircle from '@/assets/icon/icon-xcircle.svg';
import Input from '@/components/common/input';
import Layout from '@/components/layout';

import FilteredCourse from './_components/filtered-course/filtered-course';
import styles from './page.module.scss';

const cx = classNames.bind(styles);

const Course = () => {
  return (
    <Layout hasTopNav={false} hasTabBar={true}>
      <div className={cx('container')}>
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
    </Layout>
  );
};

export default Course;
