'use client';

import classNames from 'classnames/bind';

import Chip from '@/components/common/chip';

import CourseCard from '../common/CourseCard';

import styles from './index.module.scss';

const cn = classNames.bind(styles);
const BLOCK = 'difficult-courses';

const DifficultCourses = () => {
  return (
    <div className={cn(BLOCK)}>
      <div className={cn(`${BLOCK}__title`)}>
        <p className={cn(`${BLOCK}__title--text`)}>Course by Difficulty</p>
        <div className={cn(`${BLOCK}__title--chips`)}>
          <Chip type='button' onClick={() => {}}>
            3 hours
          </Chip>
          <Chip type='button' onClick={() => {}}>
            4 hours
          </Chip>
          <Chip type='button' onClick={() => {}}>
            5 hours
          </Chip>
          <Chip type='button' onClick={() => {}}>
            more than
          </Chip>
        </div>
      </div>
      <div className={cn(`${BLOCK}__list`)}>
        {courses.map((course, index) => (
          <CourseCard key={index} course={course} index={index} />
        ))}
      </div>
    </div>
  );
};

export default DifficultCourses;

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
