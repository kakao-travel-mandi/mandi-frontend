'use client';
import ReviewCourseList from '@/app/(after-login)/my-info/_components/review-course-list/index';
import ReviewLayout from '@/app/(after-login)/my-info/_components/review-layout';
import Layout from '@/components/layout';
import { useCourseCompleteQuery } from '@/queries/courseReviewQuery';

const CompleteReview = () => {
  const { data, isLoading, error } = useCourseCompleteQuery();
  console.log(data);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(data);
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
