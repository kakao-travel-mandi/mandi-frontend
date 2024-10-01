import classNames from 'classnames/bind';

import IconCompletedCourses from '@/assets/icon/icon-completed-course.svg';
import IconTotalDistance from '@/assets/icon/icon-total-distance.svg';

import styles from './listReviewCourse.module.scss';

interface ListReviewCourseProps {
  completedCourses: number | undefined;
  totalDistance: number | undefined;
}

const cx = classNames.bind(styles);

const ReviewCourseList = ({
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
        <span className={cx('body2-semibold ')}>{completedCourses ?? 0}</span>
      </div>
      <div className={cx('container__conetent')}>
        <span className={cx('label6-semibold')}>
          <IconTotalDistance />
          Total Distance
        </span>
        <span className={cx('body2-semibold ')}>{totalDistance ?? 0} km</span>
      </div>
    </div>
  );
};

export default ReviewCourseList;
