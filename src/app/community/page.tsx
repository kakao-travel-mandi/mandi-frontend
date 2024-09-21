'use client';
import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';

import IconAlarm from '@/assets/icon/icon-alarm.svg';
import IconSearchMono from '@/assets/icon/icon-search-mono.svg';
import CommunityFeed from '@/components/community-feed';
import CommunityLayout from '@/components/community-layout';
import Layout from '@/components/layout';
import { usePostCategoryMutation } from '@/queries/postQuery';

import styles from './community.module.scss';
import { mockCommunityFeedData } from './dummy';

const cx = classNames.bind(styles);

const Community = () => {
  const router = useRouter();
  const [activeChip, setActiveChip] = useState<string | null>('All');
  const [sortOption, setSortOption] = useState('Latest');
  const [feedData, setFeedData] = useState(mockCommunityFeedData);
  const onContentClick = () => {
    const postId = 1;
    router.push(`/community/${postId}`);
  };
  const { mutate, data, error, isError } = usePostCategoryMutation({
    onSuccess: data => {
      console.log('PostCategory fetched successfully:', data);
    },
    onError: error => {
      console.error('Error fetching PostCategory:', error);
    },
  });
  //console.log('데이터', data?.posts);
  useEffect(() => {
    //mutate('ALL');
    const data = [...mockCommunityFeedData] // 원본 배열 복사
      .filter(data => activeChip === 'All' || data.category === activeChip) // 필터링
      .sort((a, b) => {
        if (sortOption === 'Latest') {
          return (
            new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime() // 최신순
          );
        } else if (sortOption === 'Popular') {
          return Number(b.likesCount) - Number(a.likesCount); // 인기순
        }
        return 0;
      });
    setFeedData(data);
    // 상태 업데이트
  }, [sortOption, activeChip]);

  return (
    <Layout
      title='Community'
      back={false}
      hasTopNav={true}
      hasTabBar={true}
      actions={[
        {
          icon: IconSearchMono,
          onClick: () => console.log('검색바 클릭'),
        },
        {
          icon: IconAlarm,
          onClick: () => console.log('알람 클릭'),
        },
      ]}
    >
      <CommunityLayout
        activeChip={activeChip}
        setActiveChip={setActiveChip}
        sortOption={sortOption}
        setSortOption={setSortOption}
      >
        {feedData.map((data, index) => (
          <CommunityFeed
            key={index}
            onContentClick={onContentClick}
            profileImage={data.profileImage}
            nickname={data.nickname}
            uploadDate={data.uploadDate}
            category={data.category}
            communityPostTitle={data.communityPostTitle}
            communityPost={data.communityPost}
            postImage={data.postImage}
            likesCount={data.likesCount}
            commentCount={data.commentCount}
          />
        ))}
      </CommunityLayout>
    </Layout>
  );
};

export default Community;

/*
  
   

    
*/
