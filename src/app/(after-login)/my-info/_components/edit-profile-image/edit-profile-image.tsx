import Image from 'next/image';
import styles from './edit-profile-image.module.scss';
import classNames from 'classnames/bind';
import { useRef } from 'react';
import { convertFileToBase64 } from '@/utils/file';
import CameraIcon from '@/assets/icon/icon-camera.svg';
import UserIcon from '@/assets/icon/icon-user-mono.svg';

const cx = classNames.bind(styles);

interface EditProfileImageProps {
  imageUrl?: string;
  onImageChange: (base64: string) => void;
}

export const EditProfileImage = ({
  imageUrl,
  onImageChange,
}: EditProfileImageProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImagePickerClick = () => inputRef.current?.click();
  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64String = await convertFileToBase64(file);
      onImageChange(base64String);
    }
  };

  return (
    <div className={cx('profile-image')}>
      {imageUrl ? (
        <Image
          src={imageUrl}
          width={82}
          height={82}
          alt='profile-image'
          className={cx('profile-image__selected-image')}
        />
      ) : (
        <UserIcon
          width={40}
          height={40}
          className={cx('profile-image__empty-icon')}
        />
      )}
      <button
        type='button'
        className={cx('profile-image__picker')}
        onClick={handleImagePickerClick}
      >
        <input
          type='file'
          accept='image/*'
          className={cx('profile-image__input')}
          ref={inputRef}
          onChange={handleChangeFile}
        />
        <CameraIcon
          width={12}
          height={12}
          className={cx('profile-image__picker__icon')}
        />
      </button>
    </div>
  );
};
