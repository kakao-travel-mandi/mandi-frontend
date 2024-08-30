'use client';

import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import classNames from 'classnames/bind';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import CameraIcon from '@/assets/icon/icon-camera.svg';
import UserIcon from '@/assets/icon/icon-user-mono.svg';
import IconXCircle from '@/assets/icon/icon-xcircle.svg';
import Button from '@/components/common/button';
import Dialog from '@/components/common/dialog';
import Input from '@/components/common/input';
import { SizedBox } from '@/components/common/sizedbox';
import Textarea from '@/components/common/textarea';
import Layout from '@/components/layout';
import { useImagePreview } from '@/hooks/usePreviewImage';

import styles from './page.module.scss';

const cx = classNames.bind(styles);
type FormInputs = {
  nickname: string;
  introduction: string;
};

export default function Home() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  // TODO: 이미지 url 바로 요청하는 걸로 변경.
  const [previewImage, setPreviewImage] = useState<FileList | null>(null);
  const previewImageUrl = useImagePreview(previewImage);
  const handleImagePickerClick = () => {
    inputRef.current?.click();
  };
  const handleDialogClose = () => setDialogOpen(false);

  const handleConfirmClick = () => router.back();
  const handleLeaveClick = () => handleDialogClose();
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {};

  // react-hook-form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      nickname: 'Kimmandi',
      introduction: 'Passionate about exploring and sharing hidden gems!',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: FormInputs) => {
    console.log(data);
  };
  const handleSaveButtonClick = () => handleSubmit(onSubmit)();

  return (
    <Layout hasTopNav={true} back={true} hasTabBar={false}>
      <SizedBox height='1.6875rem' />
      <div className={cx('profile-image')}>
        {previewImageUrl ? (
          <Image
            src={previewImageUrl}
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
            // onChange={e => setPreviewImage(e.target.files)}
            onChange={handleChangeFile}
          />
          <CameraIcon
            width={12}
            height={12}
            className={cx('profile-image__picker__icon')}
          />
        </button>
      </div>
      <SizedBox height='2.3125rem' />
      <form className={cx('form')}>
        <Controller
          name='nickname'
          control={control}
          rules={{
            required: 'Please enter your nickname.',
            // 2-12글자
            pattern: {
              value: /^.{2,12}$/,
              message: 'Please enter between 2 and 12 characters.',
            },
            validate: {
              // 영문, 숫자만 입력 가능
              validNickname: value => {
                return (
                  /^[a-zA-Z0-9]*$/.test(value) ||
                  'You can only use letters and numbers.'
                );
              },
            },
          }}
          render={({ field }) => (
            <Input
              label='Nickname'
              helper='You can use 2 to 12 characters, including letters and numbers'
              placeholder='Please enter your nickname.'
              value={field.value}
              onChange={field.onChange}
              rightIcon={
                <IconXCircle width={12} height={12} className={cx('x-icon')} />
              }
              error={errors.nickname && errors.nickname.message}
            />
          )}
        />
        <Controller
          name='introduction'
          control={control}
          rules={{
            pattern: {
              value: /^.{0,80}$/,
              message: 'Please enter up to 80 characters.',
            },
          }}
          render={({ field }) => (
            <Textarea
              label='One liner'
              placeholder='Introduce yourself in a short text (up to 80 characters, including spaces).'
              value={field.value}
              onChange={field.onChange}
              error={errors.introduction && errors.introduction.message}
              maxLength={80}
            />
          )}
        />
      </form>
      <Dialog
        isOpen={dialogOpen}
        title='Change it later?'
        description='Changes have not been saved.'
        onClose={handleDialogClose}
        buttons={
          <div
            style={{
              display: 'flex',
              gap: '10px',
            }}
          >
            <Button size='full' color='green' onClick={handleConfirmClick}>
              Confrim
            </Button>
            <Button size='full' color='white' onClick={handleLeaveClick}>
              Leave
            </Button>
          </div>
        }
      />
      <Button
        type='submit'
        size='full'
        color='green'
        className={cx('save-button')}
        onClick={handleSaveButtonClick}
      >
        Save
      </Button>
    </Layout>
  );
}
