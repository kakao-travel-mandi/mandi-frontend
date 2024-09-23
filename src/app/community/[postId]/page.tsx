'use client';

import { useState } from 'react';

import classNames from 'classnames/bind';
import Image from 'next/image';

import IconEllipsisVertical from '@/assets/icon/icon-ellipsis-vertical-small.svg';
import IconHeart from '@/assets/icon/icon-heart-small.svg';
import CommunityFeed from '@/components/community-feed';
import Layout from '@/components/layout';
import { timeDifference } from '@/utils/community-time';

import styles from './DetailFeed.module.scss';
import { mockCommunityFeedDataDetail } from './dummy';

const cx = classNames.bind(styles);

const DetailFeed = () => {
  // 각 댓글의 좋아요 상태와 추가될 숫자를 관리
  const [comments, setComments] = useState(
    mockCommunityFeedDataDetail.commentList.map(list => ({
      ...list,
      isLiked: false,
      add: 0, // 추가된 숫자 (좋아요 증가값)
      childComments: list.childComments.map(child => ({
        ...child,
        isLiked: false,
        add: 0, // 대댓글 좋아요 추가 상태
      })),
    })),
  );

  const handleLikeClick = (
    index: number,
    isChild = false,
    childIndex: number | null = null,
  ) => {
    setComments(prevComments =>
      prevComments.map((comment, i) => {
        if (i === index) {
          if (!isChild) {
            // 댓글의 좋아요 처리
            return {
              ...comment,
              isLiked: !comment.isLiked,
              add: comment.isLiked ? 0 : 1,
            };
          } else if (isChild && childIndex !== null) {
            // 대댓글의 좋아요 처리
            return {
              ...comment,
              childComments: comment.childComments.map((child, j) => {
                if (j === childIndex) {
                  return {
                    ...child,
                    isLiked: !child.isLiked,
                    add: child.isLiked ? 0 : 1,
                  };
                }
                return child;
              }),
            };
          }
        }
        return comment;
      }),
    );
  };

  // 여러 댓글의 대댓글 보기 상태 관리
  const [visibleReplyIndexes, setVisibleReplyIndexes] = useState<number[]>([]);

  const handleReplyClick = (index: number) => {
    setVisibleReplyIndexes(
      prevState =>
        prevState.includes(index)
          ? prevState.filter(i => i !== index) // 이미 열려 있으면 닫기
          : [...prevState, index], // 없으면 배열에 추가
    );
  };

  return (
    <Layout title='' back={true} hasTopNav={true} hasTabBar={false}>
      <div className={cx('container')}>
        <CommunityFeed
          postId='1'
          profileImage={mockCommunityFeedDataDetail.user.imgUrl}
          nickname={mockCommunityFeedDataDetail.user.nickname}
          uploadDate={mockCommunityFeedDataDetail.uploadDate}
          category={mockCommunityFeedDataDetail.category}
          communityPostTitle={mockCommunityFeedDataDetail.title}
          communityPost={mockCommunityFeedDataDetail.content}
          postImage={mockCommunityFeedDataDetail.imgUrlList.map(
            item => item.url,
          )}
          likesCount={mockCommunityFeedDataDetail.likesCount}
          commentCount={mockCommunityFeedDataDetail.commentCount}
          detail={true}
        />
        <div className={cx('container__comment')}>
          <div className={cx('label4-semibold')}>Comment</div>
          <div className={cx('container__comment__frame')}>
            {comments.map((comment, index) => (
              <div className={cx('container__comment__box')} key={index}>
                <Image
                  src={comment.imgUrl}
                  width={40}
                  height={40}
                  alt='Comment Profile Image'
                />
                <div className={cx('container__comment__profilebox')}>
                  <div className={cx('container__comment__profile')}>
                    <span className={cx('subtitle2-semibold')}>
                      {comment.nickname}
                    </span>
                    <div className={cx('label6-regular')}>
                      {timeDifference(comment.uploadDate)}
                    </div>
                    <IconEllipsisVertical width={16} height={16} />
                  </div>
                  <div
                    className={cx(
                      'container__comment__content',
                      'body2-regular',
                    )}
                  >
                    {comment.content}
                  </div>
                  <div className={cx('container__comment__reaction')}>
                    <div className={cx('container__comment__likecut')}>
                      <IconHeart
                        fill={comment.isLiked ? '#F35E5E' : '#ADB1BA'}
                        onClick={() => handleLikeClick(index)}
                      />
                      <div className={cx('label5-regular')}>
                        {comment.likeCnt + comment.add}
                      </div>
                    </div>
                    <button
                      className={cx('label5-regular')}
                      onClick={() => handleReplyClick(index)}
                    >
                      Reply
                    </button>
                  </div>

                  {visibleReplyIndexes.includes(index) && (
                    <div className={cx('container__comment__frame')}>
                      {comment.childComments.map((child, childIndex) => (
                        <div
                          className={cx('container__comment__box')}
                          key={childIndex}
                        >
                          <Image
                            src={child.imgUrl}
                            width={30}
                            height={30}
                            alt='Reply Profile Image'
                          />
                          <div className={cx('container__comment__profilebox')}>
                            <div className={cx('container__comment__profile')}>
                              <span className={cx('subtitle2-regular')}>
                                {child.nickname}
                              </span>
                              <div className={cx('label6-regular')}>
                                {timeDifference(child.uploadDate)}
                              </div>
                            </div>
                            <div
                              className={cx(
                                'container__reply__content',
                                'body2-regular',
                              )}
                            >
                              {child.content}
                            </div>
                            <div className={cx('container__comment__reaction')}>
                              <div
                                className={cx('container__comment__likecut')}
                              >
                                <IconHeart
                                  fill={child.isLiked ? '#F35E5E' : '#ADB1BA'}
                                  onClick={() =>
                                    handleLikeClick(index, true, childIndex)
                                  }
                                />
                                <div className={cx('label5-regular')}>
                                  {child.likeCnt + child.add}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailFeed;
