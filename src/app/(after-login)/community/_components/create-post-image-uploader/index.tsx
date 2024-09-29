import { useRef } from 'react';

import { Transition } from '@headlessui/react';
import classNames from 'classnames/bind';
import Image from 'next/image';

import IconCamera from '@/assets/icon/icon-camera.svg';
import IconX from '@/assets/icon/icon-x-img.svg';

import styles from './createPostImageUploader.module.scss';

const cx = classNames.bind(styles);

interface CreatePostImageUploaderProps {
  images: string[];
  onUpload: (files: File[]) => void;
  onDelete: (index: number) => void;
}

const CreatePostImageUploader = ({
  images,
  onUpload,
  onDelete,
}: CreatePostImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length > 0) {
      onUpload(files);
    }
  };

  return (
    <div className={cx('container')}>
      <div className={cx('container__picture')} onClick={handleIconClick}>
        <IconCamera width='24' height='24' fill='#ADB1BA' />
      </div>
      <input
        type='file'
        accept='image/*'
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        multiple
      />
      {images.map((src, index) => (
        <Transition
          key={index}
          show={true}
          enter='transition-opacity duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='transition-opacity duration-300'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div
            className={cx('container__image')}
            onClick={() => onDelete(index)}
          >
            <Image width={56} height={56} src={src} alt={`Preview ${index}`} />
            <div className={cx('container__image__remove')}>
              <IconX />
            </div>
          </div>
        </Transition>
      ))}
    </div>
  );
};

export default CreatePostImageUploader;
