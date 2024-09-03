'use client';

import Tabs from '@/components/common/taps';
import Layout from '@/components/layout';
import ListReviewCourse from '@/components/list-review-course';
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
      <ListReviewCourse completedCourses={0} totalDistance={0} />
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
