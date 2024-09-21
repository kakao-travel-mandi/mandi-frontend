'use client';
import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import Image from 'next/image';
import { useParams } from 'next/navigation';

import IconChat from '@/assets/icon/icon-chat-bubble-oval-left-ellipsis.svg';
import IconEllipsisVertical from '@/assets/icon/icon-ellipsis-vertical.svg';
import IconHeart from '@/assets/icon/icon-heart.svg';
import Badge from '@/components/common/badge/index';
import Layout from '@/components/layout';
import { timeDifference } from '@/utils/community-time';

import styles from './communityFeed.module.scss';

const cx = classNames.bind(styles);

interface CommunityFeedProps {
  profileImage: string;
  nickname: string;
  uploadDate: string;
  category: string;
  communityPost: string;
  communityPostTitle: string;
  postImage?: string[];
  likesCount: number;
  commentCount: number;
  onContentClick: () => void;
}

const SpecificPost = ({
  profileImage,
  nickname,
  uploadDate,
  category,
  communityPostTitle,
  communityPost,
  postImage,
  likesCount,
  commentCount,
  onContentClick,
}: CommunityFeedProps) => {
  const { postId } = useParams();
  const timeSincePost = timeDifference(uploadDate);
  const [like, setLick] = useState(false);
  const [currentLikesCount, setCurrentLikesCount] = useState(likesCount);
  const likeColor = like ? '#F35E5E' : '#ADB1BA';
  const handleLikeClick = () => {
    setLick(prevState => !prevState);
    setCurrentLikesCount(prevCount => (like ? prevCount - 1 : prevCount + 1));
  };
  useEffect(() => {
    setCurrentLikesCount(likesCount);
  }, [likesCount]);

  return (
    <Layout title='' back={true} hasTopNav={true} hasTabBar={false}>
      <div className={cx('container')}>
        <div className={cx('container__profile')}>
          <Image
            src={profileImage}
            className={cx('container__profile__image')}
            width={40}
            height={40}
            alt='profileImage'
          />
          <div className={cx('container__profile__content')}>
            <div className={cx('container__profile__text')}>
              <span className={cx('subtitle2-semibold')}>{nickname}</span>
              <span className={cx('label4-regular')}>{timeSincePost}</span>
            </div>
            <Badge text={category} color='green' />
          </div>
          <IconEllipsisVertical />
        </div>
        <div onClick={onContentClick} className={cx('container__post')}>
          <div className={cx('subtitle1-semibold', 'container__post__title')}>
            {communityPostTitle}
          </div>
          <div className={cx('body2-regular', 'container__post__body')}>
            {communityPost}
          </div>
        </div>
        <div className={cx('container__imagepost')}>
          {postImage &&
            postImage.map((imageSrc, index) => (
              <Image
                className={cx('container__imagepost__image')}
                width={180}
                height={180}
                key={index}
                src={imageSrc}
                alt={`Post Image ${index + 1}`}
              />
            ))}
        </div>
        <div className={cx('container__reaction')}>
          <div className={cx('container__reaction__section', 'label3-regular')}>
            <IconHeart fill={likeColor} onClick={handleLikeClick} />
            {currentLikesCount}
          </div>
          <div className={cx('container__reaction__section', 'label3-regular')}>
            <IconChat />
            {commentCount}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SpecificPost;
