import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import { useRouter, useSearchParams } from 'next/navigation';

import IconCongratulation from '@/assets/icon/icon-congratulation.svg';
import Button from '@/components/common/button';

import styles from './content.module.scss';

const BLOCK = 'content';

const cn = classNames.bind(styles);

const Content = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [nickname, setNickname] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const nicknameFromParams = searchParams.get('nickname');
      if (nicknameFromParams) {
        setNickname(nicknameFromParams);
      }
    }
  }, [searchParams]);

  const handleStart = () => {
    router.push('/home');
  };

  return (
    <div className={cn(`${BLOCK}__container`)}>
      <div className={cn(`${BLOCK}__content`)}>
        <IconCongratulation />
        <div className={cn(`${BLOCK}__text`)}>
          <h2>Registration Complete</h2>
          <h1>
            Welcome,
            <br />
            {nickname}!
          </h1>
        </div>
      </div>

      <div className={cn(`${BLOCK}__button-container`)}>
        <Button size='full' color='green' onClick={handleStart}>
          Start Mandi
        </Button>
      </div>
    </div>
  );
};

export default Content;
