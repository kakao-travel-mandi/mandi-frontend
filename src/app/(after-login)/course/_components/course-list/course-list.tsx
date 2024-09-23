import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';

import RunningIcon from '@/assets/icon/exercise_running.svg';
import ClockIcon from '@/assets/icon/icon-clock.svg';
import StarIcon from '@/assets/icon/icon-star.svg';
import Badge from '@/components/common/badge';

import styles from './course-list.module.scss';
import { CourseDTO } from '@/types/course';
import { getDifficultyColor } from '@/utils/course';
import Image from 'next/image';

interface CourseListItemProps {
  course: CourseDTO;
}

const cx = classNames.bind(styles);

const BLOCK = 'course-item';

const CourseListItem = ({ course }: CourseListItemProps) => {
  const router = useRouter();
  const detailData = [
    {
      icon: ClockIcon,
      content: course.duration,
    },
    {
      icon: RunningIcon,
      content: `${course.distance} km`,
    },
    {
      icon: StarIcon,
      content: course.ratingAverage.toFixed(2),
    },
  ];
  const handleClick = () => router.push('/course/1');

  return (
    <div className={cx(BLOCK)} onClick={handleClick}>
      <div className={cx(`${BLOCK}__image`)}>
        <Image
          src={course.imgUrl}
          alt='course'
          width={120}
          height={90}
          priority
        />
      </div>
      <div className={cx(`${BLOCK}__content`)}>
        <div className={cx(`${BLOCK}__content__info`)}>
          <h2 className={cx(`${BLOCK}__content__info__title`)}>
            {course.courseName}
          </h2>
        </div>
        <div className={cx(`${BLOCK}__content__details`)}>
          {detailData.map((item, index) => (
            <div key={index} className={cx(`${BLOCK}__content__details__item`)}>
              <item.icon
                className={cx(`${BLOCK}__content__details__item__icon`)}
              />
              <div className={cx(`${BLOCK}__content__details__item__text`)}>
                {item.content}
              </div>
            </div>
          ))}
        </div>
        <Badge
          color={getDifficultyColor(course.difficulty)}
          text={course.difficulty}
          rounded='small'
          className={cx(`${BLOCK}__content__difficulty`)}
        />
      </div>
    </div>
  );
};

export default CourseListItem;
