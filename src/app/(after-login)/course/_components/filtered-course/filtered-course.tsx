'use client';
import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';

import Chip from '@/components/common/chip';
import useCourseFiltersWithUrl from '@/hooks/useCourseFiltersWithUrl';
import { useCourseFiltersStore } from '@/stores/course-filters';
import { formatDifficulty, formatDistance, formatRating } from '@/utils/course';

import CourseListItem from '../course-list/course-list';
import FilterBottomsheet from '../filter-bottomsheet/filter-bottomsheet';

import styles from './filtered-course.module.scss';

const cx = classNames.bind(styles);

const FilteredCourse = () => {
  const { setFilters } = useCourseFiltersStore();
  const { filters } = useCourseFiltersWithUrl();
  const [isFilterOpened, setFilterOpened] = useState(false);
  const handleCloseFilter = () => {
    setFilters(filters);
    setFilterOpened(false);
  };
  const handleClickFilter = () => setFilterOpened(true);

  useEffect(() => {
    setFilters(filters);
  }, [filters, setFilters]);
  return (
    <>
      <>
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
      </>
      <FilterBottomsheet
        isOpen={isFilterOpened}
        handleClose={handleCloseFilter}
      />
    </>
  );
};

export default FilteredCourse;
