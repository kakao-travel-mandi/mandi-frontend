'use client';

import { useState } from 'react';

import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

import CdIcon from '@/assets/colored-icon/cd.svg';
import TrashcanIcon from '@/assets/colored-icon/trashcan.svg';
import Button from '@/components/common/button';
import Dialog from '@/components/common/dialog';
import { SizedBox } from '@/components/common/sizedbox';
import Layout from '@/components/layout';
import { useWithdrawalMutation } from '@/queries/authQuery';
import { deleteAccessToken, deleteRefreshToken } from '@/utils/auth';

import styles from './page.module.scss';

const BLOCK = 'delete-confirmation';
const cx = classNames.bind(styles);

const reviewList = [
  {
    icon: TrashcanIcon,
    text: 'Reviews you have written will not be automatically deleted. Please remove them  individually before deleting your account.',
  },
  {
    icon: CdIcon,
    text: 'Personal information and service data, including scraps, cannot be recovered.',
  },
];

export default function Page() {
  const router = useRouter();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const handleDialogClose = () => setDeleteDialogOpen(false);

  const withdraw = useWithdrawalMutation({
    onSuccess: () => {
      deleteAccessToken();
      deleteRefreshToken();

      signOut({ callbackUrl: '/' });
    },
    onError: error => {
      console.error(error);
    },
  });

  const handleContinueClick = () => router.push('/my-info');
  const handleDeleteClick = () => setDeleteDialogOpen(true);
  const deleteAccount = () => {
    withdraw.mutate();
  };

  return (
    <Layout
      title='Delete Account'
      hasTopNav={true}
      back={true}
      hasTabBar={false}
    >
      <div className={cx('page')}>
        <div className={cx('content')}>
          <SizedBox height='2.75rem' />
          <div className={cx(BLOCK)}>
            <h2 className={cx(`${BLOCK}__title`)}>
              Are you sure you want to
              <br />
              delete your Mandi account?
            </h2>
            <p className={cx(`${BLOCK}__description`)}>
              Before you delete your account,
              <br />
              please review the information below.
            </p>
          </div>
          <SizedBox height='2rem' />
          <ul className={cx(`${BLOCK}__list`)}>
            {reviewList.map(({ icon: Icon, text }, index) => (
              <li key={index} className={cx(`${BLOCK}__list-item`)}>
                <Icon className={cx(`${BLOCK}__list-item__icon`)} />
                <p className={cx(`${BLOCK}__list-item__text`)}>{text}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className={cx(`bottom-area`)}>
          <Button color='whitegray' size='full' onClick={handleContinueClick}>
            Continue using
          </Button>
          <Button color='green' size='full' onClick={handleDeleteClick}>
            Delete Account
          </Button>
        </div>
      </div>
      <Dialog
        isOpen={deleteDialogOpen}
        title='Delete account'
        description='Are you sure you want to delete your account?'
        onClose={handleDialogClose}
        buttons={
          <div className={cx(`dialog-buttons`)}>
            <Button size='full' color='darkgray' onClick={handleDialogClose}>
              Cancel
            </Button>
            <Button size='full' color='red' onClick={deleteAccount}>
              Delete Account
            </Button>
          </div>
        }
      />
    </Layout>
  );
}
