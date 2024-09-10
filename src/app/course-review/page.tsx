import Tabs from '@/components/common/taps';
import Layout from '@/components/layout';
import ReviewLayout from '@/components/review-layout';

// import {
//   dummyModalReviewsDataUnWrite,
//   dummyModalReviewsDataWrite,
// } from './dummy';

const Review = () => {
  const tapsFirstTitle = `Unwritten Review()`;
  const tapsSecondTitle = `written Review()`;
  // const tabsItem = [
  //   {
  //     title: tapsFirstTitle,
  //     content: (
  //       <ReviewLayout
  //         modal='unWrite'
  //         modalReviewsData={dummyModalReviewsDataUnWrite}
  //       />
  //     ),
  //   },
  //   {
  //     title: tapsSecondTitle,
  //     content: (
  //       <ReviewLayout
  //         modal='write'
  //         modalReviewsData={dummyModalReviewsDataWrite}
  //       />
  //     ),
  //   },
  // ];
  return (
    <Layout
      hasTopNav={true}
      hasTabBar={false}
      back={true}
      title='My course review'
    >
      <div></div>
      {/* <Tabs tabs={tabsItem} version={1} /> */}
    </Layout>
  );
};

export default Review;
