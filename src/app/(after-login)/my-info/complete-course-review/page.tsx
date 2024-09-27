'use client';
import ReviewCourseList from '@/app/(after-login)/my-info/_components/review-course-list/index';
import ReviewLayout from '@/app/(after-login)/my-info/_components/review-layout';
import Layout from '@/components/layout';
import { useCourseCompleteQuery } from '@/queries/courseReviewQuery';

const CompleteReview = () => {
  const { data, isLoading, error } = useCourseCompleteQuery();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }
  return (
    <Layout
      hasTopNav={true}
      hasTabBar={false}
      back={true}
      title='My course review'
    >
      <ReviewCourseList
        completedCourses={data?.response.totalCount}
        totalDistance={data?.response.totalDistance}
      />
      <div>
        <ReviewLayout
          modal='complete-course'
          reviewsData={data?.response.completedCourses}
        />
      </div>
    </Layout>
  );
};

export default CompleteReview;
//
