import classNames from 'classnames/bind';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import IconClock from '@/assets/icon/icon-clock.svg';
import IconExerciseRunning from '@/assets/icon/icon-exercise_running.svg';
import Badge from '@/components/common/badge';
import { CourseDTO } from '@/types/course';

import styles from './CourseCard.module.scss';

const cn = classNames.bind(styles);
const BLOCK = 'course-card';

interface CourseCardProps {
  course: CourseDTO;
  index: number;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy':
      return 'green';
    case 'Moderate':
      return 'orange';
    case 'Difficult':
      return 'red';
    default:
      return 'gray';
  }
};

const CourseCard = ({ course, index }: CourseCardProps) => {
  const router = useRouter();

  const handleCourseClick = () => {
    router.push(`/course/${course.id}`);
  };

  return (
    <div key={index} className={cn(BLOCK)} onClick={handleCourseClick}>
      <Image
        src={course.imgUrl}
        alt={course.courseName}
        width={133}
        height={100}
        className={cn(`${BLOCK}__image`)}
      />
      <h3 className={cn(`${BLOCK}__title`)}>{course.courseName}</h3>
      <div className={cn(`${BLOCK}__info`)}>
        <div className={cn(`${BLOCK}__info--item`)}>
          <IconClock className={cn(`${BLOCK}__info--item__icon`)} />
          <span className={cn(`${BLOCK}__info--item__text`)}>
            {course.duration}
          </span>
        </div>
        <div className={cn(`${BLOCK}__info--item`)}>
          <IconExerciseRunning className={cn(`${BLOCK}__info--item__icon`)} />
          <span className={cn(`${BLOCK}__info--item__text`)}>
            {course.distance} km
          </span>
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
