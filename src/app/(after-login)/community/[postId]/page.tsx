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
import { usePostCommentAdd } from '@/queries/commentQuery';
import { useMyInfoQuery } from '@/queries/myInfoQuery';
import { useGetPostId } from '@/queries/postQuery';

import styles from './detailFeed.module.scss';

const cx = classNames.bind(styles);

const DetailFeed = () => {
  const params = useParams();
  const postId = params?.postId;
  const { mutate, data } = useGetPostId();
  const { data: myInfoData } = useMyInfoQuery();
  const { data: userId } = useGetAuthId();
  const { mutate: addComment } = usePostCommentAdd();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newReply, setNewReply] = useState<string>('');
  const [selectedComment, setSelectedComment] = useState<{
    parentIndex: number | null;
    childIndex: number | null;
    tag: string | null;
    valueParentIndex: number | null | undefined;
  }>({
    parentIndex: null,
    childIndex: null,
    tag: null,
    valueParentIndex: null,
  });

  const feedData = data?.response;
  const remainingParentCommentsCount = comments.length;
  const remainingChildCommentsCount = comments.reduce(
    (count, comment) =>
      count +
      (comment.childComments
        ? comment.childComments.filter(child => !child.isDeleted).length
        : 0),
    0,
  );

  const handleReplyClick = (
    parentIndex: number | null,
    childIndex: number | null = null,
    nickname: string,
    valueParentIndex: number | null | undefined,
  ) => {
    setSelectedComment({
      parentIndex,
      childIndex,
      tag: nickname,
      valueParentIndex,
    });
    console.log('버튼클릭', selectedComment);
    setNewReply(`@${nickname} `);
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
      setComments(prevComments => [
        ...prevComments,
        {
          ...newComment,
          parentCommentId: null,
        },
      ]);
      addComment({
        commentId: String(postId),
        parentCommentId: null,
        content: newReply,
      });
    } else {
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
      addComment({
        commentId: String(selectedComment.valueParentIndex),
        parentCommentId: Number(selectedComment.valueParentIndex),
        content: newReply,
      });
    }

    setNewReply('');
    setSelectedComment({
      parentIndex: null,
      childIndex: null,
      tag: null,
      valueParentIndex: null,
    });
  };

  useEffect(() => {
    mutate(`${postId}`);
  }, [mutate, postId]);

  useEffect(() => {
    if (feedData?.commentList) {
      // 삭제되지 않은 댓글을 필터링하고, 날짜순으로 정렬
      const filteredAndSortedComments = feedData.commentList
        .filter(comment => !comment.isDeleted) // isDeleted가 false인 댓글만 남김
        .sort(
          (a, b) =>
            new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime(),
        );

      const transformedComments = filteredAndSortedComments.map(list => ({
        userId: list.user.userId,
        commentId: list.commentId,
        parentCommentId: list.parentCommentId,
        imgUrl: list.user.imgUrl,
        nickname: list.user.nickname,
        uploadDate: list.uploadDate,
        content: list.content,
        likeCnt: list.likeCnt,
        childComments:
          list.childComments
            ?.filter(child => !child.isDeleted) // 자식 댓글도 isDeleted 필터링
            .sort(
              (a, b) =>
                new Date(a.uploadDate).getTime() -
                new Date(b.uploadDate).getTime(),
            )
            .map(child => ({
              userId: child.user.userId,
              commentId: child.commentId,
              parentCommentId: child.parentCommentId,
              imgUrl: child.user.imgUrl,
              nickname: child.user.nickname,
              uploadDate: child.uploadDate,
              content: child.content,
              likeCnt: child.likeCnt,
              childComments: [], // 중첩된 자식 댓글을 처리하는 로직
            })) || [],
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
          commentCount={
            remainingParentCommentsCount + remainingChildCommentsCount
          }
          detail={true}
        />

        <div className={cx('container__comment')}>
          <div className={cx('label4-semibold')}>Comment</div>
          <div className={cx('container__comment__frame')}>
            {comments?.map((comment, index) => (
              <>
                <CommentItem
                  key={index}
                  comment={comment}
                  handleReplyClick={() =>
                    handleReplyClick(
                      index,
                      null,
                      comment.nickname,
                      comment.commentId,
                    )
                  }
                />
                <>
                  {comment.childComments?.map((child, childIndex) => (
                    <CommentItem
                      key={childIndex}
                      comment={child}
                      isReply={true}
                      handleReplyClick={() =>
                        handleReplyClick(
                          index,
                          childIndex,
                          child.nickname,
                          comment.commentId,
                        )
                      }
                    />
                  ))}
                </>
              </>
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
