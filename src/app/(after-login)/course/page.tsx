'use client';

import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';

import IconSearch from '@/assets/icon/icon-search-mono.svg';
import IconXCircle from '@/assets/icon/icon-xcircle.svg';
import Chip from '@/components/common/chip';
import Input from '@/components/common/input';
import Layout from '@/components/layout';
import useCourseFiltersWithUrl from '@/hooks/useCourseFiltersWithUrl';
import { useCourseFiltersStore } from '@/stores/course-filters';
import { formatDifficulty, formatDistance, formatRating } from '@/utils/course';

import CourseListItem from './_components/course-list/course-list';
import FilterBottomsheet from './_components/filter-bottomsheet/filter-bottomsheet';
import styles from './page.module.scss';

const cx = classNames.bind(styles);

const Course = () => {
  const { setFilters } = useCourseFiltersStore();
  const { filters } = useCourseFiltersWithUrl();

  const [isFilterOpened, setFilterOpened] = useState(false);
  const handleCloseFilter = () => {
    setFilters(filters);
    setFilterOpened(false);
  };
  const handleClickFilter = () => setFilterOpened(true);

  // Set filters from URL
  useEffect(() => {
    setFilters(filters);
  }, [filters, setFilters]);

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
        <div className={cx('filters')}>
          <Chip
            action={true}
            onClick={handleClickFilter}
            selected={filters.sortBy !== null}
          >
            {formatDistance(filters.sortBy)}
          </Chip>
          <Chip
            action={true}
            onClick={handleClickFilter}
            selected={filters.difficulty.length > 0}
          >
            {formatDifficulty(filters.difficulty)}
          </Chip>
          <Chip
            action={true}
            onClick={handleClickFilter}
            selected={filters.stars !== null}
          >
            {formatRating(filters.stars)}
          </Chip>
        </div>
        <div className={cx('course-list')}>
          {Array.from({ length: 10 }).map((_, index) => (
            <CourseListItem key={index} />
          ))}
        </div>
      </div>
      <FilterBottomsheet
        isOpen={isFilterOpened}
        handleClose={handleCloseFilter}
      />
    </Layout>
  );
};

export default Course;
