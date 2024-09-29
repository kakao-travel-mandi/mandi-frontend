// 삭제시 토스트
'use client';
import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import IconChat from '@/assets/icon/icon-chat-bubble-oval-left-ellipsis.svg';
import IconEllipsisVertical from '@/assets/icon/icon-ellipsis-vertical.svg';
import IconHeart from '@/assets/icon/icon-heart.svg';
import IconPencil from '@/assets/icon/icon-pencil-mono-small.svg';
import IconSirenMono from '@/assets/icon/icon-siren-mono.svg';
import IconTrashRed from '@/assets/icon/icon-trash-red.svg';
import Badge from '@/components/common/badge/index';
import {
  useDeletePostId,
  useDeletePostLike,
  usePostPostLike,
} from '@/queries/postQuery';
import { useMyIdStore } from '@/stores/userId';
import { timeDifference } from '@/utils/community-time';

import BottomSheet from '../../../../../components/common/bottomsheet';

import styles from './communityFeed.module.scss';

const cx = classNames.bind(styles);

interface CommunityFeedProps {
  userId: number;
  postId: number;
  profileImage: string;
  nickname: string;
  uploadDate: string;
  category: string;
  communityPost: string;
  communityPostTitle: string;
  postImage?: string[];
  likesCount: number;
  commentCount: number;
  detail?: boolean; // detail prop 추가
}

const CommunityFeed = ({
  userId,
  postId,
  profileImage,
  nickname,
  uploadDate,
  category,
  communityPostTitle,
  communityPost,
  postImage,
  likesCount,
  commentCount,
  detail = false, // 기본값 false
}: CommunityFeedProps) => {
  const router = useRouter();
  const timeSincePost = timeDifference(uploadDate);
  const [like, setLike] = useState(false);
  const [currentLikesCount, setCurrentLikesCount] = useState(likesCount);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const likeColor = like ? '#F35E5E' : '#ADB1BA';

  const { userId: currentUserId } = useMyIdStore();

  const { mutate: deleteLike, error: deleteLikeError } = useDeletePostLike();
  const { mutate: addLike, error: addLikeError } = usePostPostLike();
  const { mutate: deletePost } = useDeletePostId();

  const handleLikeClick = () => {
    setLike(prevState => !prevState);
    setCurrentLikesCount(prevCount => (like ? prevCount - 1 : prevCount + 1));
    if (like) {
      deleteLike(`${postId}`);
      console.log('좋아요삭제 에러', addLikeError);
    } else {
      addLike(`${postId}`);
      console.log('좋아요추가 에러', deleteLikeError);
    }
  };

  const handleContentClick = () => {
    if (!detail) {
      router.push(`/community/${postId}`);
    }
  };
  const handleDeleteClick = () => {
    deletePost(`${postId}`, {
      onSuccess: () => {
        setDeleteSuccess(true);
      },
    });
    setIsBottomSheetOpen(false);
  };
  const handleEditClick = () => {
    router.push(`/community/create-post/${postId}`);
    setIsBottomSheetOpen(false);
  };
  const handleReportClick = () => {
    alert('아직 미완');
    setIsBottomSheetOpen(false);
  };

  useEffect(() => {
    setCurrentLikesCount(likesCount);
  }, [likesCount]);
  if (deleteSuccess) return null;
  return (
    <div className={cx('container')}>
      <div className={cx('container__profile')}>
        <Image
          src={profileImage || '/default-profile.png'}
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
        <IconEllipsisVertical onClick={() => setIsBottomSheetOpen(true)} />
      </div>

      <div onClick={handleContentClick} className={cx('container__post')}>
        <div
          className={cx('subtitle1-semibold', {
            container__post__title: !detail,
          })}
        >
          {communityPostTitle}
        </div>

        <div
          className={cx('body2-regular', {
            container__post__body: !detail,
          })}
        >
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
        <div
          onClick={handleContentClick}
          className={cx('container__reaction__section', 'label3-regular')}
        >
          <IconChat />
          {commentCount}
        </div>
      </div>
      {userId === Number(currentUserId) ? (
        <BottomSheet
          isOpen={isBottomSheetOpen}
          onClose={() => setIsBottomSheetOpen(false)}
        >
          <div
            onClick={handleEditClick}
            className={cx('container__bottomsheet')}
          >
            <IconPencil />
            <div className={cx('subtitle1-semibold')}>Edit</div>
          </div>
          <div
            onClick={handleDeleteClick}
            className={cx('container__bottomsheet')}
          >
            <IconTrashRed />
            <div className={cx('subtitle1-semibold')}>Delete Post</div>
          </div>
        </BottomSheet>
      ) : (
        <BottomSheet
          isOpen={isBottomSheetOpen}
          onClose={() => setIsBottomSheetOpen(false)}
        >
          <div
            onClick={handleReportClick}
            className={cx('container__bottomsheet', 'subtitle1-semibold')}
          >
            <IconSirenMono width='20' height='20' fill='#F35E5E' />
            Report
          </div>
        </BottomSheet>
      )}
    </div>
  );
};

export default CommunityFeed;
