'use client';

import { useRef, useState } from 'react';

import {
  Textarea as HeadlessTextarea,
  Input as HeadlessInput,
  Transition,
} from '@headlessui/react';
import classNames from 'classnames/bind';
import Image from 'next/image';

import IconArrowDown from '@/assets/icon/icon-arrow-down-small.svg';
import IconCamera from '@/assets/icon/icon-camera.svg';
import IconX from '@/assets/icon/icon-x-img.svg';
import BottomSheet from '@/components/common/bottomsheet';
import Input from '@/components/common/input';
import Layout from '@/components/layout';

import styles from './createPost.module.scss';

const cx = classNames.bind(styles);

const CreatePost = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [title, setTitle] = useState<string>(''); // 제목 상태 관리
  const [post, setPost] = useState<string>(''); // 설명 상태 관리
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  // 파일 선택 다이얼로그를 열기 위한 핸들러
  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 파일 선택 후 이미지 미리보기를 업데이트하는 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length > 0) {
      const newImages = files.map(file => {
        const reader = new FileReader();
        return new Promise<string>(resolve => {
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(file);
        });
      });
      Promise.all(newImages).then(results => {
        setImages(prevImages => [...prevImages, ...results]);
      });
    }
  };

  // 이미지를 삭제하는 핸들러
  const handleImageClick = (index: number) => {
    // 클릭된 이미지의 인덱스를 기반으로 해당 이미지를 제거
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsBottomSheetOpen(false); // 선택 후 바텀 시트 닫기
  };

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append('title', title); // 제목 추가
    formData.append('description', post); // 설명 추가
    formData.append('category', selectedCategory); // 선택된 카테고리 추가

    images.forEach((image, index) => {
      formData.append(`image-${index}`, image); // 이미지들 추가
    });

    console.log('Form Data:', Object.fromEntries(formData.entries()));

    // 서버에 제출하려면 fetch 등을 사용하여 요청을 보낼 수 있습니다.
    // 예: fetch('/api/create-post', { method: 'POST', body: formData });
  };

  return (
    <Layout
      title='Create Post'
      back={true}
      hasTopNav={true}
      hasTabBar={false}
      actions={[
        {
          text: 'Post', // 색깔 입히기
          onClick: handleSubmit,
        },
      ]}
    >
      <div className={cx('container')}>
        <Input
          value={selectedCategory}
          type='text'
          label='Category'
          rightIcon={<IconArrowDown />}
          placeholder='Please select a category.'
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
          }}
          onClick={() => setIsBottomSheetOpen(true)}
        />

        <div className={cx('container__picture')}>
          <div className={cx('container__picture__post')}>
            <input
              type='file'
              accept='image/*'
              id='fileInput'
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
              multiple
            />
            <label className={cx('file-input-label')} onClick={handleIconClick}>
              <IconCamera width='24' height='24' fill='#ADB1BA' />
            </label>
          </div>
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
                className={cx('container__picture__post__image')}
                onClick={() => handleImageClick(index)}
              >
                <Image
                  width={56} // 필요한 경우 크기를 조정합니다.
                  height={56} // 필요한 경우 크기를 조정합니다.
                  src={src}
                  alt={`Preview ${index}`}
                />
                <div className={cx('container__picture__post__image__x')}>
                  <IconX />
                </div>
              </div>
            </Transition>
          ))}
        </div>
      </div>
      <div className={cx('container__feed')}>
        <HeadlessInput
          className={cx('container__feed__title', 'subtitle1-semibold')}
          type='text'
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder='Please enter a title'
        />
        <HeadlessTextarea
          className={cx('container__feed__post', 'body1-regular')}
          placeholder='Please enter a description'
          value={post}
          onChange={e => setPost(e.target.value)}
        />
      </div>

      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
      >
        <div className={cx('container__bottomsheet', 'subtitle1-semibold')}>
          {['Tourism', 'Trekking', 'Dining', 'Accommodation', 'Other'].map(
            category => (
              <div
                key={category}
                className={cx('bottomsheet-item')}
                onClick={() => handleCategorySelect(category)} // 항목 클릭 시 선택 처리
              >
                {category}
              </div>
            ),
          )}
        </div>
      </BottomSheet>
    </Layout>
  );
};

export default CreatePost;
