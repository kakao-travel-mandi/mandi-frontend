'use client';

import {useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';

import classNames from 'classnames/bind';
import Image from 'next/image';
import {useRouter} from 'next/navigation';

import CameraIcon from '@/assets/icon/icon-camera.svg';
import UserIcon from '@/assets/icon/icon-user-mono.svg';
import IconXCircle from '@/assets/icon/icon-xcircle.svg';
import {SizedBox} from '@/components/common/SizedBox/SizedBox';
import {Button} from '@/components/common/button';
import Dialog from '@/components/common/dialog';
import Input from '@/components/common/input';
import Textarea from '@/components/common/textarea';
import {TopNavBar} from '@/components/common/top-navbar';
import {useImagePreview} from '@/hooks/usePreviewImage';

import styles from './page.module.scss';

const cx = classNames.bind(styles);
type FormInputs = {
  nickname: string;
  introduction: string;
};

export default function Home() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // const [nickname, setNickname] = useState('Kimmandi');
  // const [introduction, setIntroduction] = useState(
  //   'Passionate about exploring and sharing hidden gems!',
  // );

  const [dialogOpen, setDialogOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<FileList | null>(null);
  const previewImageUrl = useImagePreview(previewImage);

  const handleDialogClose = () => setDialogOpen(false);
  const handleDialogOpen = () => setDialogOpen(true);
  const handleImagePickerClick = () => {
    inputRef.current?.click();
  };

  const handleConfirmClick = () => router.back();
  const handleLeaveClick = () => handleDialogClose();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
  };

  // react-hook-form
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormInputs>({
    defaultValues: {
      nickname: 'Kimmandi',
      introduction: 'Passionate about exploring and sharing hidden gems!',
    },
    mode: 'onChange',
  });

  console.log(errors);

  return (
    <>
      <TopNavBar back onClickBack={handleDialogOpen} />
      <form className={cx('container')} onSubmit={onSubmit}>
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
              onChange={e => setPreviewImage(e.target.files)}
            />
            <CameraIcon
              width={12}
              height={12}
              className={cx('profile-image__picker__icon')}
            />
          </button>
        </div>
        <SizedBox height='2.3125rem' />
        <Controller
          name='nickname'
          control={control}
          rules={{
            // 2-12글자
            pattern: {
              value: /^.{2,12}$/,
              message: "Please enter between 2 and 12 characters."
            },
        validate:{
          // 영문, 숫자만 입력 가능
          validNickname: (value) => {
            return /^[a-zA-Z0-9]*$/.test(value) || "You can only use letters and numbers
          }}
          }}
          render={({field}) => (
            <Input
              label='Nickname'
              helper='You can use 2 to 12 characters, including letters and numbers'
              placeholder='Please enter your nickname.'
              value={field.value}
              onChange={field.onChange}
              rightIcon={
                <IconXCircle width={12} height={12} className={cx('x-icon')} />
              }
              maxLength={12}
              error={errors.nickname && errors.nickname.message}
            />
          )}
        />
        {/* <Input
          label='Nickname'
          helper='You can use 2 to 12 characters, including letters and numbers'
          placeholder='Please enter your nickname.'
          value={nickname}
          onChange={value => setNickname(value)}
          rightIcon={
            <IconXCircle width={12} height={12} className={cx('x-icon')} />
          }
          maxLength={12}
        /> */}
        <SizedBox height='1.75rem' />
        {/* <Textarea
          label='One liner'
          placeholder='Introduce yourself in a short text (up to 80 characters, including spaces).'
          value={introduction}
          onChange={value => setIntroduction(value)}
        /> */}
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
        >
          Save
        </Button>
      </form>
    </>
  );
}
