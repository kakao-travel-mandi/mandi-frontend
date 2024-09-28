'use client';

import { useState } from 'react';

import classNames from 'classnames/bind';

import Chip from '@/components/common/chip';
import { DIFFICULTY_LEVELS } from '@/constants/course';
import { useCoursesQuery } from '@/queries/courseQuery';

import CourseCard from '../common/CourseCard';

import styles from './index.module.scss';

const cn = classNames.bind(styles);
const BLOCK = 'difficult-courses';

const DifficultCourses = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>(
    DIFFICULTY_LEVELS.EASY,
  );
  const courseQuery = useCoursesQuery({
    levels: selectedDifficulty,
  });

  return (
    <div className={cn(BLOCK)}>
      <div className={cn(`${BLOCK}__title`)}>
        <p className={cn(`${BLOCK}__title--text`)}>Course by Difficulty</p>
        <div className={cn(`${BLOCK}__title--chips`)}>
          <Chip
            type='button'
            selected={selectedDifficulty === DIFFICULTY_LEVELS.EASY}
            onClick={() => setSelectedDifficulty(DIFFICULTY_LEVELS.EASY)}
          >
            Easy
          </Chip>
          <Chip
            type='button'
            selected={selectedDifficulty === DIFFICULTY_LEVELS.MODERATE}
            onClick={() => setSelectedDifficulty(DIFFICULTY_LEVELS.MODERATE)}
          >
            Moderate
          </Chip>
          <Chip
            type='button'
            selected={selectedDifficulty === DIFFICULTY_LEVELS.DIFFICULT}
            onClick={() => setSelectedDifficulty(DIFFICULTY_LEVELS.DIFFICULT)}
          >
            Difficult
          </Chip>
        </div>
      </div>
      <div className={cn(`${BLOCK}__list`)}>
        {courseQuery.data?.pages.map((page, index) =>
          page.response.courses.map((course, index) => (
            <CourseCard key={index} course={course} index={index} />
          )),
        )}
      </div>
    </div>
  );
};

export default DifficultCourses;
