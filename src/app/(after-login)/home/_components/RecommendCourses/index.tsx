'use client';

import React from 'react';

import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';

import IconArrowRight from '@/assets/icon/icon-arrow-right-small-mono.svg';
import { useMyInfoQuery } from '@/queries/myInfoQuery';

import CourseCard from '../common/CourseCard';

import styles from './index.module.scss';

const cn = classNames.bind(styles);
const BLOCK = 'recommend-courses';

const RecommendCourses = () => {
  const router = useRouter();
  const { data: userInfo } = useMyInfoQuery();

  return (
    <div className={cn(BLOCK)}>
      <div className={cn(`${BLOCK}__title`)}>
        <p>{userInfo?.response.nickname}&apos;s Recommended Course!</p>
        <IconArrowRight
          className={cn(`${BLOCK}__title--arrow`)}
          onClick={() => {
            router.push('/home/recommend-courses');
          }}
        />
      </div>
      <div className={cn(`${BLOCK}__list`)}>
        {courses.map((course, index) => (
          <CourseCard key={index} course={course} index={index} />
        ))}
      </div>
    </div>
  );
};

export default RecommendCourses;
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
