import classNames from 'classnames/bind';

import IconCompletedCourses from '@/assets/icon/icon-completed-course.svg';
import IconTotalDistance from '@/assets/icon/icon-total-distance.svg';

import styles from './listReviewCourse.module.scss';

interface ListReviewCourseProps {
  completedCourses: number;
  totalDistance: number;
}

const cx = classNames.bind(styles);

const ListReviewCourse = ({
  completedCourses,
  totalDistance,
}: ListReviewCourseProps) => {
  return (
    <div className={cx('container')}>
      <div className={cx('container__conetent')}>
        <span className={cx('label6-semibold')}>
          <IconCompletedCourses />
          Completed Courses
        </span>
        <span className={cx('body2-semibold ')}>{completedCourses}</span>
      </div>
      <div className={cx('container__conetent')}>
        <span className={cx('label6-semibold')}>
          <IconTotalDistance />
          Total Distance
        </span>
        <span className={cx('body2-semibold ')}>{totalDistance} km</span>
      </div>
    </div>
  );
};

export default ListReviewCourse;
