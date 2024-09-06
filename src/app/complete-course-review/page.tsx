import Layout from '@/components/layout';
import ReviewCourseList from '@/components/review-course-list/index';
import ReviewLayout from '@/components/review-layout';

import { dummyModalReviewsDataCompleteCourse } from './dummy';

const Review = () => {
  return (
    <Layout
      hasTopNav={true}
      hasTabBar={false}
      back={true}
      title='My course review'
    >
      <ReviewCourseList completedCourses={0} totalDistance={0} />
      <div>
        <ReviewLayout
          modal='complete-course'
          modalReviewsData={dummyModalReviewsDataCompleteCourse}
        />
      </div>
    </Layout>
  );
};

export default Review;
