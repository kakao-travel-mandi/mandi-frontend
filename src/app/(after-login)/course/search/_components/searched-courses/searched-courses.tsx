import classNames from 'classnames/bind';

import NoResultIcon from '@/assets/colored-icon/empty_course.svg';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useCoursesQuery } from '@/queries/courseQuery';

import CourseListItem from '../../../_components/course-list/course-list';
import NoResult from '../no-result/no-result';

import styles from './searched-courses.module.scss';

const cx = classNames.bind(styles);

interface SearchedCoursesProps {
  keyword: string;
}

const SearchedCourses = ({ keyword }: SearchedCoursesProps) => {
  const courseQuery = useCoursesQuery({ keyword });
  const { loadMoreRef, data, status } = useInfiniteScroll(courseQuery);
  return (
    <div className={cx('list')}>
      {status === 'success' &&
        (data?.pages.some(page => page.response.courses.length > 0) ? (
          data.pages.map(page =>
            page.response.courses.map(course => (
              <CourseListItem key={course.id} course={course} />
            )),
          )
        ) : (
          <div className={cx('no-results')}>
            <NoResult
              title='No results found'
              desc='Ensure the spelling of your search term is correct.'
              icon={NoResultIcon}
            />
          </div>
        ))}
      <div ref={loadMoreRef} />
    </div>
  );
};

export default SearchedCourses;
