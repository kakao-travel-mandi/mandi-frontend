import ReviewList from "../_components/review-list/review-list";

const CourseReviewsPage = ({ params }: { params: { 'course-id': string } }) => {
  const { 'course-id': courseId } = params;
  return (
    <div>
      <h1>Course Reviews</h1>
      <p>Course ID: {courseId}</p>
      <ReviewList />
    </div>
  );
};

export default CourseReviewsPage;
