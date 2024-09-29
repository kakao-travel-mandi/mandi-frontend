import { useState } from 'react';

import classNames from 'classnames/bind';
import Image from 'next/image';

import IconEllipsisVertical from '@/assets/icon/icon-ellipsis-vertical-small.svg';
import IconHeart from '@/assets/icon/icon-heart-small.svg';
import IconSiren from '@/assets/icon/icon-siren-mono.svg';
import IconTrash from '@/assets/icon/icon-trash.svg';
import Button from '@/components/common/button';
import Dialog from '@/components/common/dialog';
import { Menubox } from '@/components/common/menubox';
import { useSnackbar } from '@/hooks/useSnackbar';
import { useGetAuthId } from '@/queries/authQuery';
import {
  useDeleteCommentLike,
  usePostCommentLike,
} from '@/queries/commentQuery';
import { timeDifference } from '@/utils/community-time';

import styles from './detailFeedComment.module.scss';

const cx = classNames.bind(styles);

export interface Comment {
  userId: number;
  commentId?: number;
  parentCommentId?: number | null;
  imgUrl: string;
  nickname: string;
  uploadDate: string;
  content: string;
  likeCnt: number;
  childComments?: Comment[];
}
interface CommentItemProps {
  comment: Comment;
  isReply?: boolean;
  handleReplyClick?: () => void;
}

const CommentItem = ({
  comment,
  isReply = false,
  handleReplyClick,
}: CommentItemProps) => {
  const { createSnackbar } = useSnackbar();
  const { data: currentUserId } = useGetAuthId();
  const { mutate: deleteLike } = usePostCommentLike();
  const { mutate: addLike } = useDeleteCommentLike();

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likeCnt);
  const [commentDelete, setCommentDelete] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const menuBoxItem =
    Number(currentUserId.response) === comment.userId
      ? [
          {
            content: 'Delete',
            icon: IconTrash,
            onClick: () => {
              setDialogOpen(true);
            },
          },
        ]
      : [
          {
            content: 'Report',
            icon: IconSiren,
            onClick: () => {
              alert('신고 미구현');
            },
          },
        ];

  const handleLikeClick = () => {
    setIsLiked(prevIsLiked => !prevIsLiked);
    setLikeCount(prevLikeCount =>
      isLiked ? prevLikeCount - 1 : prevLikeCount + 1,
    );
    if (isLiked) {
      addLike(`${comment.commentId}`);
    } else {
      deleteLike(`${comment.commentId}`);
    }
  };
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  const handleDeleteSubmit = () => {
    //api 댓글삭제
    alert('api 연결 필요');
    setCommentDelete(true);
    createSnackbar({ type: 'alert', content: 'The comment has been deleted.' });
  };

  if (commentDelete) {
    return null;
  }

  return (
    <div className={cx('container', { container__reply: isReply })}>
      <Image
        className={cx('container__profile__img')}
        src={comment.imgUrl || '/default-profile.png'}
        width={isReply ? 30 : 40}
        height={isReply ? 30 : 40}
        alt={isReply ? 'Reply Profile Image' : 'Comment Profile Image'}
      />
      <div className={cx('container__comment')}>
        <div className={cx('container__profile')}>
          <span
            className={cx(isReply ? 'subtitle2-regular' : 'subtitle2-semibold')}
          >
            {comment.nickname}
          </span>
          <div className={cx('label6-regular')}>
            {timeDifference(comment.uploadDate)}
          </div>
          <Menubox
            triggerButton={<IconEllipsisVertical width={16} height={16} />}
            items={menuBoxItem}
          />
        </div>
        <div
          className={cx(
            isReply
              ? 'container__reply__content'
              : 'container__comment__content',
            'body2-regular',
          )}
        >
          {comment.content}
        </div>
        <div className={cx('container__comment__reaction')}>
          <div className={cx('container__comment__likecut')}>
            <IconHeart
              fill={isLiked ? '#F35E5E' : '#ADB1BA'}
              onClick={handleLikeClick}
            />
            <div className={cx('label5-regular')}>{likeCount}</div>
          </div>

          <button className={cx('label5-regular')} onClick={handleReplyClick}>
            Reply
          </button>
        </div>
      </div>
      <Dialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        title='Delete the comment?'
        description=''
        buttons={
          <div className={cx('container__dialog')}>
            <Button size='full' color='whitegray' onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button size='full' color='red' onClick={handleDeleteSubmit}>
              Delete
            </Button>
          </div>
        }
      />
    </div>
  );
};

export default CommentItem;
