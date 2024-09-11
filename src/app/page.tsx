'use client';

import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

import Google from '@/assets/icon/icon-google.svg';
import LoginMandi from '@/assets/icon/icon-login-mandi.svg';
import Mountain from '@/assets/icon/icon-login-mountain.svg';
import Splash from '@/assets/icon/icon-splash.svg';
import Layout from '@/components/layout';
import { useLoginMutation } from '@/queries/authQuery';

import styles from './page.module.scss';

const cn = classNames.bind(styles);

const BLOCK = 'main';

const Main = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [fade, setFade] = useState(false);

  const { data: session } = useSession();

  const { mutate: login } = useLoginMutation({
    onSuccess: data => {
      if (data.response.isSignUp) router.push('/home');
      else router.push('/sign-up');
    },
    onError: code => {
      console.error(code);
    },
  });

  const handleGoogleLogin = async () => {
    try {
      await signIn('google', {
        callbackUrl: '/',
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setFade(true);
      setTimeout(() => setIsLoading(false), 500);
    }, 800);
  }, []);

  useEffect(() => {
    if (session) {
      login({ token: session.accessToken });
    }
  }, [session, login]);

  return (
    <Layout hasTopNav={false} hasTabBar={false}>
      {isLoading ? (
        <div
          className={cn(`${BLOCK}__container`, {
            [`${BLOCK}__container--loading`]: fade,
            [`${BLOCK}__container--loaded`]: !fade,
          })}
        >
          <Splash />
        </div>
      ) : (
        <div
          className={cn(`${BLOCK}__container`, {
            [`${BLOCK}__container--loading`]: !fade,
            [`${BLOCK}__container--loaded`]: fade,
          })}
        >
          <div className={cn(`${BLOCK}__icons`)}>
            <Mountain />
            <LoginMandi />
          </div>
          <div className={cn(`${BLOCK}__footer`)}>
            <p className={cn(`${BLOCK}__footer-text`)}>
              Sign in with social accounts
            </p>

            <button
              className={cn(`${BLOCK}__button`)}
              onClick={handleGoogleLogin}
            >
              <Google />
              <p className={cn(`${BLOCK}__button-text`)}>Login with Google</p>
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Main;
