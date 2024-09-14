import Layout from "@/components/layout";

const CourseDetailPage = ({ params }: { params: { 'course-id': string } }) => {
  const { 'course-id': courseId } = params; // URL에서 코스 ID 추출

  return (
    <Layout hasTopNav={true} hasTabBar={false} back={true}>
      <div>Course Detail Page: {courseId}</div>
    </Layout>
  );
};

export default CourseDetailPage;
