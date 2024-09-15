import IconMandi from '@/assets/icon/icon-mandi.svg';
import Layout from '@/components/layout';

import DifficultCourses from './_components/DifficultCourses';
import Landing from './_components/Landing';
import LeadTimeCourses from './_components/LeadTimeCourses';
import RecommendCourses from './_components/RecommendCourses';
import Weather from './_components/Weather';

const Home = () => {
  return (
    <Layout
      hasTopNav={true}
      hasTabBar={true}
      back={false}
      logo={<IconMandi />}
      topNavColor='gray'
      backgroundColor='#F2F3F6'
    >
      <Landing />
      <RecommendCourses />
      <Weather />
      <LeadTimeCourses />
      <DifficultCourses />
    </Layout>
  );
};

export default Home;
