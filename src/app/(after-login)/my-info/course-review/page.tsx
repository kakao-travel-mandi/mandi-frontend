'use client';
import ReviewLayout from '@/app/(after-login)/my-info/_components/review-layout';
import Tabs from '@/components/common/taps';
import Layout from '@/components/layout';
import { useCourseCompleteReviewQuery } from '@/queries/courseReviewQuery';

const Review = () => {
  const { data, isLoading, error } = useCourseCompleteReviewQuery();
  const reviewData = data?.response.reviewedCourses.map(course => ({
    ...course.completedCourse, // completedCourse 속성 내의 데이터를 병합
    isReviewed: course.isReviewed,
    content: course.content,
    score: course.score,
    reviewedAt: course.reviewedAt,
  }));
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
      <Tabs
        tabs={[
          {
            title: 'Unwritten Review()',
            content: (
              <ReviewLayout
                modal='unWrite'
                reviewsData={data?.response.notReviewedCourses}
              />
            ),
          },
          {
            title: 'written Review()',
            content: <ReviewLayout modal='write' reviewsData={reviewData} />,
          },
        ]}
        version={1}
      />
    </Layout>
  );
};
export default Review;
