'use client';

import { useState } from 'react';

import classNames from 'classnames/bind';

import Chip from '@/components/common/chip';
import { DISTANCE_LEVELS } from '@/constants/course';
import { useCoursesQuery } from '@/queries/courseQuery';

import CourseCard from '../common/CourseCard';

import styles from './index.module.scss';

const cn = classNames.bind(styles);
const BLOCK = 'distance-courses';

const DistanceCourses = () => {
  const [selectedDistance, setSelectedDistance] = useState<'ASC' | 'DESC'>(
    DISTANCE_LEVELS.SHORTEST,
  );
  const courseQuery = useCoursesQuery({
    orderByDirection: selectedDistance,
  });

  return (
    <div className={cn(BLOCK)}>
      <div className={cn(`${BLOCK}__title`)}>
        <p className={cn(`${BLOCK}__title--text`)}>Course by Distance</p>
        <div className={cn(`${BLOCK}__title--chips`)}>
          <Chip
            type='button'
            selected={selectedDistance === DISTANCE_LEVELS.SHORTEST}
            onClick={() => {
              setSelectedDistance(DISTANCE_LEVELS.SHORTEST);
            }}
          >
            Shortest
          </Chip>
          <Chip
            type='button'
            selected={selectedDistance === DISTANCE_LEVELS.LONGEST}
            onClick={() => {
              setSelectedDistance(DISTANCE_LEVELS.LONGEST);
            }}
          >
            Longest
          </Chip>
        </div>
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

export default DistanceCourses;

const courses = [
  {
    title: 'Sinseondae',
    difficulty: 'Easy',
    time: '1:30',
    distance: '1.93 km',
    image: '/test/course.png',
  },
  {
    title: 'Dongbaek Island',
    difficulty: 'Hard',
    time: '1:30',
    distance: '1.93 km',
    image: '/test/course.png',
  },
  {
    title: 'Haeparang',
    difficulty: 'Moderate',
    time: '1:30',
    distance: '1.93 km',
    image: '/test/course.png',
  },
];
