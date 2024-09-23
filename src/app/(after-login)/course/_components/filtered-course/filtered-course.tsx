'use client';
import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';

import useCourseFiltersWithUrl from '@/hooks/useCourseFiltersWithUrl';
import {
  formatCourseFilterParams,
  useCourseFiltersStore,
} from '@/stores/course-filters';

import CourseListItem from '../course-list/course-list';
import FilterBottomsheet from '../filter-bottomsheet/filter-bottomsheet';

import styles from './filtered-course.module.scss';
import { useCoursesQuery } from '@/queries/courseQuery';
import useInfiniteScroll from '@/queries/useInfiniteScroll';
import CourseFilter from '../course-filter/course-filter';

const cx = classNames.bind(styles);

const FilteredCourse = () => {
  const { setFilters } = useCourseFiltersStore();
  const { filters } = useCourseFiltersWithUrl();
  const [isFilterOpened, setFilterOpened] = useState(false);

  const courseQuery =
    filters && useCoursesQuery(formatCourseFilterParams(filters));
  const { loadMoreRef, data, status } = useInfiniteScroll(courseQuery);

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
      <CourseFilter filters={filters} handleClickFilter={handleClickFilter} />
      <div className={cx('course-list')}>
        {status === 'success' &&
          data?.pages.map(page =>
            page.response.courses.map(course => (
              <CourseListItem key={course.id} course={course} />
            )),
          )}
        <div ref={loadMoreRef} />
        {/* TODO: spinner 필요 */}
      </div>
      <FilterBottomsheet
        isOpen={isFilterOpened}
        handleClose={handleCloseFilter}
      />
    </>
  );
};

export default FilteredCourse;
