import classNames from 'classnames/bind';

import Layout from '@/components/layout';

import ReviewList from '../_components/review-list/review-list';
import ReviewOverview from '../_components/review-overview/review-overview';

import styles from './page.module.scss';

const cx = classNames.bind(styles);

const CourseReviewsPage = ({ params }: { params: { 'course-id': string } }) => {
  const { 'course-id': courseId } = params;
  return (
    <Layout hasTabBar={false} hasTopNav={true} title='Reviews' back={true}>
      <div className={cx('review-overview-section')}>
        <ReviewOverview />
      </div>
      <div className={cx('review-list')}>
        <ReviewList hasFilter={true} />
      </div>
    </Layout>
  );
};

export default CourseReviewsPage;
