'use client';

import { useState } from 'react';

import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

import GoogleIcon from '@/assets/provider/Google.svg';
import KakaoIcon from '@/assets/provider/Kakao.svg';
import Button from '@/components/common/button';
import Dialog from '@/components/common/dialog';
import { SizedBox } from '@/components/common/sizedbox';
import Layout from '@/components/layout';
import { useLogoutMutation } from '@/queries/authQuery';
import { useMyInfoQuery } from '@/queries/myInfoQuery';
import { OauthProviderEnum } from '@/types/oauth-provider';
import { deleteAccessToken, deleteRefreshToken } from '@/utils/auth';

import styles from './page.module.scss';

const cx = classNames.bind(styles);

export default function Page() {
  const { data: infoData } = useMyInfoQuery();
  const router = useRouter();
  const [logoutConfirmDialog, setLogoutConfirmDialog] = useState(false);

  const logout = useLogoutMutation({
    onSuccess: () => {
      deleteAccessToken();
      deleteRefreshToken();

      signOut({ callbackUrl: '/' });
    },
    onError: error => {
      console.error(error);
    },
  });

  const handleDialogClose = () => setLogoutConfirmDialog(false);

  const handleLogoutMenuClick = () => setLogoutConfirmDialog(true);
  const handleDeleteAccountMenuClick = () =>
    router.push('/my-info/delete-account');

  const handleDialogLogout = () => {
    logout.mutate();
  };
  const handleDialogCancel = () => setLogoutConfirmDialog(false);

  return (
    <Layout
      title='Login Information'
      hasTopNav={true}
      back={true}
      hasTabBar={false}
    >
      <SizedBox height='0.625rem' />
      <div className={cx(`account-info`)}>
        <span className={cx(`account-info__label`)}>Login Account</span>
        <div className={cx(`account-info__container`)}>
          <div
            className={cx(`account-info__provider`, {
              'account-info__provider--google':
                infoData?.response.provider ===
                OauthProviderEnum.PROVIDER_GOOGLE,
              'account-info__provider--kakao':
                infoData?.response.provider ===
                OauthProviderEnum.PROVIDER_KAKAO,
            })}
          >
            {infoData?.response.provider ===
            OauthProviderEnum.PROVIDER_GOOGLE ? (
              <GoogleIcon className={cx('account-info__provider__icon')} />
            ) : (
              <KakaoIcon className={cx('account-info__provider__icon')} />
            )}
          </div>
          <span className={cx('account-info__email')}>
            {infoData?.response.email}
          </span>
        </div>
      </div>
      <ul className={cx('menu-list')}>
        <li className={cx('menu-list__item')} onClick={handleLogoutMenuClick}>
          Log out
        </li>
        <li
          className={cx('menu-list__item')}
          onClick={handleDeleteAccountMenuClick}
        >
          Delete account
        </li>
      </ul>
      <Dialog
        isOpen={logoutConfirmDialog}
        title='Log out'
        description='Are you sure you want to log out?'
        onClose={handleDialogClose}
        buttons={
          <div
            style={{
              display: 'flex',
              gap: '10px',
            }}
          >
            <Button size='full' color='whitegray' onClick={handleDialogCancel}>
              Cancel
            </Button>
            <Button size='full' color='red' onClick={handleDialogLogout}>
              Log out
            </Button>
          </div>
        }
      />
    </Layout>
  );
}
