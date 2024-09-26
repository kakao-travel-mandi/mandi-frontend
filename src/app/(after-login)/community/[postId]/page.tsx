'use client';
import { useEffect, useState } from 'react';

import { Input as HeadlessInput } from '@headlessui/react';
import classNames from 'classnames/bind';
import { useParams } from 'next/navigation';

import CommentItem, {
  Comment,
} from '@/app/(after-login)/community/_components/comment-item/index';
import CommunityFeed from '@/app/(after-login)/community/_components/community-feed/index';
import IconPaperAirplane from '@/assets/icon/icon-paper-airplane.svg';
import Layout from '@/components/layout';
import { useGetAuthId } from '@/queries/authQuery';
import { useMyInfoQuery } from '@/queries/myInfoQuery';
import { useGetPostId } from '@/queries/postQuery';

import styles from './DetailFeed.module.scss';

const cx = classNames.bind(styles);

const DetailFeed = () => {
  const params = useParams();
  const postId = params?.postId;
  const { mutate, data } = useGetPostId();
  const { data: myInfoData } = useMyInfoQuery();
  const { data: userId } = useGetAuthId();
  const feedData = data?.response;

  const [comments, setComments] = useState<Comment[]>([]);
  const [newReply, setNewReply] = useState<string>(''); // 인풋 필드 상태
  const [selectedComment, setSelectedComment] = useState<{
    parentIndex: number | null;
    childIndex: number | null;
    tag: string | null;
  }>({
    parentIndex: null,
    childIndex: null,
    tag: null,
  });

  const handleReplyClick = (
    parentIndex: number,
    childIndex: number | null = null,
    nickname: string,
  ) => {
    setSelectedComment({ parentIndex, childIndex, tag: nickname });
    setNewReply(`@${nickname} `); // @태그 넣기
  };

  const handleReplyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewReply(e.target.value);
  };

  const handleReplySubmit = () => {
    if (!newReply.trim()) return;

    const newComment = {
      userId: userId.response,
      commentId: Date.now(),
      parentCommentId:
        selectedComment.childIndex === null
          ? selectedComment.parentIndex
          : selectedComment.childIndex,
      imgUrl: myInfoData?.response.imgUrl || '/default-profile.png',
      nickname: myInfoData?.response.nickname || '조금만 기다리세요',
      uploadDate: new Date().toISOString(),
      content: newReply,
      likeCnt: 0,
      childComments: [],
    };

    if (selectedComment.parentIndex === null) {
      // 새로운 댓글 추가 (Reply 버튼을 클릭하지 않은 경우)
      setComments(prevComments => [
        ...prevComments,
        {
          ...newComment,
          parentCommentId: null, // 최상위 댓글로 추가
        },
      ]);
    } else {
      // 대댓글 추가 (Reply 버튼을 클릭한 경우)
      setComments(prevComments =>
        prevComments.map((comment, index) => {
          if (index === selectedComment.parentIndex) {
            return {
              ...comment,
              childComments: [...(comment.childComments || []), newComment],
            };
          }
          return comment;
        }),
      );
    }

    // 상태 초기화
    setNewReply('');
    setSelectedComment({ parentIndex: null, childIndex: null, tag: null });
  };

  useEffect(() => {
    mutate(`${postId}`);
  }, [mutate, postId]);

  useEffect(() => {
    if (feedData?.commentList) {
      const transformedComments = feedData.commentList.map(list => ({
        userId: list.user.userId,
        commentId: list.commentId,
        parentCommentId: list.parentCommentId,
        imgUrl: list.user.imgUrl,
        nickname: list.user.nickname,
        uploadDate: list.uploadDate,
        content: list.content,
        likeCnt: list.likeCnt,
        childComments:
          list.childComments?.map(child => ({
            userId: child.user.userId,
            commentId: child.commentId,
            parentCommentId: child.parentCommentId,
            imgUrl: child.user.imgUrl,
            nickname: child.user.nickname,
            uploadDate: child.uploadDate,
            content: child.content,
            likeCnt: child.likeCnt,
            childComments: [], // 대댓글은 비워두기
          })) || [], // undefined일 경우 빈 배열로 처리
      }));

      setComments(transformedComments);
    }
  }, [feedData]);

  if (!feedData) {
    return <div>Loading...</div>;
  }

  return (
    <Layout title='' back={true} hasTopNav={true} hasTabBar={false}>
      <div className={cx('container')}>
        <CommunityFeed
          userId={feedData.user.userId}
          postId={feedData.postId}
          profileImage={feedData.user.imgUrl}
          nickname={feedData.user.nickname}
          uploadDate={feedData.uploadDate}
          category={feedData.category}
          communityPostTitle={feedData.title}
          communityPost={feedData.content}
          postImage={feedData.imgUrlList.map(item => item.url)}
          likesCount={feedData.likeCnt}
          commentCount={feedData.CommentCnt}
          detail={true}
        />

        <div className={cx('container__comment')}>
          <div className={cx('label4-semibold')}>Comment</div>
          <div className={cx('container__comment__frame')}>
            {comments?.map((comment, index) => (
              <div className={cx('container__comment__box')} key={index}>
                <CommentItem
                  comment={comment}
                  handleReplyClick={() =>
                    handleReplyClick(index, null, comment.nickname)
                  }
                />
                <div className={cx('container__reply')}>
                  {comment.childComments?.map((child, childIndex) => (
                    <CommentItem
                      key={childIndex}
                      comment={child}
                      isReply={true}
                      handleReplyClick={() =>
                        handleReplyClick(index, childIndex, child.nickname)
                      }
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={cx('container__nav')}>
          <HeadlessInput
            type='text'
            value={newReply}
            onChange={handleReplyChange}
            placeholder='Enter your comment'
            className={cx('container__nav__input', 'body1-regular')}
          />
          <button
            onClick={handleReplySubmit}
            className={cx('submit-button')}
            disabled={newReply.trim() === ''}
          >
            <IconPaperAirplane width='20' height='20' fill='#ADB1BA' />
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default DetailFeed;
