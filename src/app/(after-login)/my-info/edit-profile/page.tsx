'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';

import IconXCircle from '@/assets/icon/icon-xcircle.svg';
import Button from '@/components/common/button';
import Dialog from '@/components/common/dialog';
import Input from '@/components/common/input';
import { SizedBox } from '@/components/common/sizedbox';
import Textarea from '@/components/common/textarea';
import Layout from '@/components/layout';
import { BIO_RULES, NICKNAME_RULES } from '@/constants/form';
import { useSnackbar } from '@/hooks/useSnackbar';
import {
  useMyInfoImageMutation,
  useMyInfoMutation,
  useMyInfoQuery,
} from '@/queries/myInfoQuery';
import { EditFormData } from '@/types/form';

import { EditProfileImage } from '../_components/edit-profile-image/edit-profile-image';

import styles from './page.module.scss';

const cx = classNames.bind(styles);

export default function Home() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { createSnackbar } = useSnackbar();

  const { data: userInfo, error } = useMyInfoQuery();
  const { mutate: updateInfo } = useMyInfoMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-info'] });
      createSnackbar({
        type: 'check',
        content: 'Profile has been updated.',
      });
      navigateToMyInfo();
    },
    onError: error => {
      if (error.status === 409) {
        setError('nickname', {
          type: 'validate',
          message:
            'The nickname is already in use. Please choose a different one.',
        });
      }
    },
  });
  const { mutate: updateImage } = useMyInfoImageMutation({
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['my-info'] }),
    onError: error => console.log(error.status),
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid, isDirty },
  } = useForm<EditFormData>({
    defaultValues: {
      nickname: userInfo?.response.nickname || '',
      introduction: userInfo?.response.description || '',
    },
    mode: 'onChange',
  });

  const navigateToMyInfo = () => router.push('/my-info');
  const handleBack = () => (isDirty ? setDialogOpen(true) : navigateToMyInfo());
  const handleImageChange = (base64: string) =>
    updateImage({ Base64EncodedImage: base64 });
  const handleDialogClose = () => setDialogOpen(false);
  const handleCancelClick = () => handleDialogClose();
  const handleLeaveClick = () => navigateToMyInfo();

  const onSubmit = (data: EditFormData) => {
    if (isDirty) {
      updateInfo({
        nickname: data.nickname,
        description: data.introduction,
      });
    } else {
      navigateToMyInfo();
    }
  };
  const handleSaveButtonClick = () => handleSubmit(onSubmit)();

  return (
    <Layout hasTopNav={true} back={true} hasTabBar={false} onBack={handleBack}>
      <SizedBox height='1.6875rem' />
      <EditProfileImage
        imageUrl={userInfo?.response.imgUrl}
        onImageChange={handleImageChange}
      />
      <SizedBox height='2.3125rem' />
      <form className={cx('form')}>
        <Controller
          name='nickname'
          control={control}
          rules={NICKNAME_RULES}
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
          rules={BIO_RULES}
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
            <Button size='full' color='green' onClick={handleCancelClick}>
              Cancel
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
        disabled={!isValid}
      >
        Save
      </Button>
    </Layout>
  );
}
