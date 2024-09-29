'use client';

import classNames from 'classnames/bind';

import { useCoursesQuery } from '@/queries/courseQuery';
import { useMyInfoQuery } from '@/queries/myInfoQuery';

import CourseCard from '../common/CourseCard';

import styles from './index.module.scss';

const cn = classNames.bind(styles);
const BLOCK = 'recommend-courses';

const RecommendCourses = () => {
  const { data: userInfo } = useMyInfoQuery();
  const courseQuery = useCoursesQuery({
    size: '5',
  });

  return (
    <div className={cn(BLOCK)}>
      <div className={cn(`${BLOCK}__title`)}>
        <p>{userInfo?.response.nickname}&apos;s Recommended Course!</p>
      </div>
      <div
        className={cn([
          `${BLOCK}__list`,
          courseQuery.isLoading && `${BLOCK}__list--isLoading`,
        ])}
      >
        {courseQuery.data?.pages.map((page, index) =>
          page.response.courses.map((course, index) => (
            <CourseCard key={index} course={course} index={index} />
          )),
        )}
      </div>
    </div>
  );
};

export default RecommendCourses;
