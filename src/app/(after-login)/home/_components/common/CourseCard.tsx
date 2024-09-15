import React from 'react';

import classNames from 'classnames/bind';
import Image from 'next/image';

import IconClock from '@/assets/icon/icon-clock.svg';
import IconExerciseRunning from '@/assets/icon/icon-exercise_running.svg';
import Badge from '@/components/common/badge';
import { Course } from '@/types/course';

import styles from './CourseCard.module.scss';

const cn = classNames.bind(styles);
const BLOCK = 'course-card';

interface CourseCardProps {
  course: Course;
  index: number;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy':
      return 'green';
    case 'Moderate':
      return 'orange';
    case 'Hard':
      return 'red';
    default:
      return 'gray';
  }
};

const CourseCard = ({ course, index }: CourseCardProps) => {
  return (
    <div key={index} className={cn(BLOCK)}>
      <Image
        src={course.image}
        alt={course.title}
        width={133}
        height={100}
        className={cn(`${BLOCK}__image`)}
      />
      <h3 className={cn(`${BLOCK}__title`)}>{course.title}</h3>
      <div className={cn(`${BLOCK}__info`)}>
        <div className={cn(`${BLOCK}__info-item`)}>
          <IconClock />
          {course.time}
        </div>
        <div className={cn(`${BLOCK}__info-item`)}>
          <IconExerciseRunning />
          {course.distance}
        </div>
      </div>
      <Badge
        text={course.difficulty}
        color={getDifficultyColor(course.difficulty)}
      />
    </div>
  );
};

export default CourseCard;
