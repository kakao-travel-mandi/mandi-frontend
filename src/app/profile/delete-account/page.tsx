'use client';

import {useState} from 'react';

import classNames from 'classnames/bind';
import {useRouter} from 'next/navigation';

import CdIcon from '@/assets/colored-icon/cd.svg';
import TrashcanIcon from '@/assets/colored-icon/trashcan.svg';
import {Button} from '@/components/common/button';
import Dialog from '@/components/common/dialog';
import {TopNavBar} from '@/components/common/top-navbar';

import {SizedBox} from '../../../components/common/SizedBox/SizedBox';

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

  const handleContinueClick = () => router.back();
  const handleDeleteClick = () => setDeleteDialogOpen(true);

  // TODO: 계정 삭제 API 호출
  const deleteAccount = () => {};

  return (
    <>
      <TopNavBar title='Delete Account' back />
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
        {reviewList.map(({icon: Icon, text}, index) => (
          <li key={index} className={cx(`${BLOCK}__list-item`)}>
            <Icon className={cx(`${BLOCK}__list-item__icon`)} />
            <p className={cx(`${BLOCK}__list-item__text`)}>{text}</p>
          </li>
        ))}
      </ul>
      {/* TODO: 하단 위치고정도 생각하기 */}
      <div className={cx(`${BLOCK}__buttons`)}>
        <Button
          color='white'
          size='full'
          className={cx('continue-button')}
          onClick={handleContinueClick}
        >
          Continue using
        </Button>
        <Button color='green' size='full' onClick={handleDeleteClick}>
          Delete Account
        </Button>
      </div>
      <Dialog
        isOpen={deleteDialogOpen}
        title='Delete account'
        description='Are you sure you want to delete your account?'
        onClose={handleDialogClose}
        buttons={
          <div
            style={{
              display: 'flex',
              gap: '10px',
            }}
          >
            {/* TODO: 버튼 색상 바꾸기 */}
            <Button size='full' color='gray' onClick={handleDialogClose}>
              Cancel
            </Button>
            <Button
              size='full'
              color='green'
              onClick={deleteAccount}
              className='bg-red'
            >
              Delete Account
            </Button>
          </div>
        }
      />
    </>
  );
}
