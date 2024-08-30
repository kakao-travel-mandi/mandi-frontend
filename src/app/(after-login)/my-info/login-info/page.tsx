'use client';

import { useState } from 'react';

import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';

import GoogleIcon from '@/assets/provider/Google.svg';
import KakaoIcon from '@/assets/provider/Kakao.svg';
import Button from '@/components/common/button';
import Dialog from '@/components/common/dialog';
import { SizedBox } from '@/components/common/sizedbox/SizedBox';
import { TopNavBar } from '@/components/common/top-navbar';
import Layout from '@/components/layout';

import styles from './page.module.scss';

const BLOCK = 'page';

const cx = classNames.bind(styles);

type OauthProvider = 'Google' | 'Kakao';
type AccountInfoProps = {
  oauthProvider: OauthProvider;
  email: string;
};
const infoData: AccountInfoProps = {
  oauthProvider: 'Google',
  email: 'abcdef@gmail.com',
};

export default function Page() {
  // TODO: 데이터 받아오기
  const router = useRouter();
  const [logoutConfirmDialog, setLogoutConfirmDialog] = useState(false);
  const handleDialogClose = () => setLogoutConfirmDialog(false);

  const handleLogoutMenuClick = () => setLogoutConfirmDialog(true);
  const handleDeleteAccountMenuClick = () =>
    router.push('/my-info/delete-account');

  // TODO: 모달 창의 로그아웃 confirm 버튼 눌렀을 때의 동작 구현
  const handleDialogConfirm = () => {};
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
                infoData.oauthProvider === 'Google',
              'account-info__provider--kakao':
                infoData.oauthProvider === 'Kakao',
            })}
          >
            {infoData.oauthProvider === 'Google' ? (
              <GoogleIcon className={cx('account-info__provider__icon')} />
            ) : (
              <KakaoIcon className={cx('account-info__provider__icon')} />
            )}
          </div>
          <span className={cx('account-info__email')}>{infoData.email}</span>
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
            {/* TODO: 모달 버튼 바꿔야됨 */}
            <Button size='full' color='green' onClick={handleDialogConfirm}>
              Confrim
            </Button>
            <Button size='full' color='white' onClick={handleDialogCancel}>
              Leave
            </Button>
          </div>
        }
      />
    </Layout>
  );
}
