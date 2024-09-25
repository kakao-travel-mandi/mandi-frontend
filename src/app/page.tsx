'use client';

import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

import IconCheckCircleGreen from '@/assets/icon/heroicons-solid/check-circle-green.svg';
import IconCheckCircle from '@/assets/icon/heroicons-solid/check-circle.svg';
import IconArrowRightSmallMono from '@/assets/icon/icon-arrow-right-small-mono.svg';
import IconCheckMonoGreen from '@/assets/icon/icon-check-mono-green.svg';
import IconCheckMono from '@/assets/icon/icon-check-mono.svg';
import Google from '@/assets/icon/icon-google.svg';
import LoginMandi from '@/assets/icon/icon-login-mandi.svg';
import Mountain from '@/assets/icon/icon-login-mountain.svg';
import Splash from '@/assets/icon/icon-splash.svg';
import BottomSheet from '@/components/common/bottomsheet';
import Button from '@/components/common/button';
import Layout from '@/components/layout';
import { useLoginMutation } from '@/queries/authQuery';

import styles from './page.module.scss';

const cn = classNames.bind(styles);

const BLOCK = 'main';

const Main = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [fade, setFade] = useState(false);

  const [isModal, setIsModal] = useState(false);
  const [isAgreeTerm, setIsAgreeTerm] = useState(false);
  const [isAgreePrivacy, setIsAgreePrivacy] = useState(false);

  const { data: session } = useSession();

  const { mutate: login } = useLoginMutation({
    onSuccess: data => {
      if (data.response.isSignUp) router.push('/home');
      if (!data.response.isSignUp) {
        setIsModal(true);
      }
    },
    onError: error => {
      if (error.status === 404) router.push('/sign-up');
      else alert('Login failed');
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

  const handleSignIn = () => {
    router.push('/sign-up');
  };

  const handleAllAgree = () => {
    setIsAgreeTerm(true);
    setIsAgreePrivacy(true);
  };

  const handleAgreeTerm = () => {
    setIsAgreeTerm(prev => !prev);
  };

  const handleAgreePrivacy = () => {
    setIsAgreePrivacy(prev => !prev);
  };

  useEffect(() => {
    const fadeTimeout = setTimeout(() => {
      setFade(true);
      setTimeout(() => setIsLoading(false), 500);
    }, 800);

    return () => {
      clearTimeout(fadeTimeout);
    };
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
          <BottomSheet isOpen={isModal}>
            <div className={cn(`${BLOCK}__modal`)}>
              <h2 className={cn(`${BLOCK}__modal--title`)}>
                Please agree to the terms and conditions to use Mandi
              </h2>
              <button
                className={cn(`${BLOCK}__modal--all-agree`)}
                onClick={handleAllAgree}
              >
                {isAgreeTerm && isAgreePrivacy ? (
                  <IconCheckCircleGreen width={20} height={20} />
                ) : (
                  <IconCheckCircle width={20} height={20} />
                )}
                <p className={cn(`${BLOCK}__modal--all-agree-text`)}>
                  All agree
                </p>
              </button>
              <div className={cn(`${BLOCK}__modal--terms`)}>
                <button
                  className={cn(`${BLOCK}__modal--terms-button`)}
                  onClick={handleAgreeTerm}
                >
                  {isAgreeTerm ? (
                    <IconCheckMonoGreen width={20} height={20} />
                  ) : (
                    <IconCheckMono width={20} height={20} />
                  )}
                  <p className={cn(`${BLOCK}__modal--terms-button-text`)}>
                    (Required) Agree to the Terms of Service
                  </p>
                  <IconArrowRightSmallMono
                    width={20}
                    height={20}
                    className={cn(`${BLOCK}__modal--terms-button-icon`)}
                  />
                </button>
                <button
                  className={cn(`${BLOCK}__modal--terms-button`)}
                  onClick={handleAgreePrivacy}
                >
                  {isAgreePrivacy ? (
                    <IconCheckMonoGreen width={20} height={20} />
                  ) : (
                    <IconCheckMono width={20} height={20} />
                  )}
                  <p className={cn(`${BLOCK}__modal--terms-button-text`)}>
                    (Required) Agree to Personal Information Collection and Use
                  </p>
                  <IconArrowRightSmallMono
                    width={20}
                    height={20}
                    className={cn(`${BLOCK}__modal--terms-button-icon`)}
                  />
                </button>
              </div>
              <Button
                size='full'
                color='green'
                onClick={handleSignIn}
                disabled={!isAgreeTerm || !isAgreePrivacy}
              >
                Agree and Start
              </Button>
            </div>
          </BottomSheet>
        </div>
      )}
    </Layout>
  );
};

export default Main;
