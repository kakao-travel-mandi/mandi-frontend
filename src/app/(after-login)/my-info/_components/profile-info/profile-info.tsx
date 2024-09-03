'use client';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import ArrowRight from '@/assets/icon/icon-arrow-right-small-mono.svg';
import UserIcon from '@/assets/icon/icon-user-mono.svg';

import styles from './profile-info.module.scss';

const cx = classNames.bind(styles);

const BLOCK = 'profile';

interface ProfileInfoProps {
  nickname: string;
  profileImageUrl?: string;
  bio: string;
  className?: string;
}

export const ProfileInfo = ({
  nickname,
  profileImageUrl,
  bio,
  className,
}: ProfileInfoProps) => {
  const router = useRouter();
  const handleClick = () => router.push('/my-info/edit-profile');

  return (
    <div className={cx(BLOCK, className)} onClick={handleClick}>
      <div className={cx(`${BLOCK}__avatar`)}>
        {profileImageUrl ? (
          <Image
            src={profileImageUrl}
            width={52}
            height={52}
            alt='profile image'
          />
        ) : (
          <UserIcon className={cx(`${BLOCK}__avatar__empty-icon`)} />
        )}
      </div>
      <div className={cx(`${BLOCK}__details`)}>
        <div className={cx(`${BLOCK}__name`)}>{nickname}</div>
        {bio && <div className={cx(`${BLOCK}__introduction`)}>{bio}</div>}
      </div>
      <ArrowRight
        width={12}
        height={12}
        className={cx(`${BLOCK}__right-icon`)}
      />
    </div>
  );
};
