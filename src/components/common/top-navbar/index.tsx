'use client';

import { ReactNode } from 'react';

import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';

import Back from '@/assets/icon/icon-arrow-left-small-mono.svg';
import Mandi from '@/assets/logo/Mandi.svg';

import { IconActionButtonProps, IconButton } from './IconActionButton';
import { TextActionButtonProps, TextButton } from './TextActionButton';
import styles from './index.module.scss';

const BLOCK = 'top-navbar';

const cx = classNames.bind(styles);

export interface TopNavBarProps {
  logo?: ReactNode;
  title?: string;
  actions?: (TextActionButtonProps | IconActionButtonProps)[];
  back?: boolean;
  topNavColor?: 'white' | 'gray';
  topNavBarClassName?: string;
  topNavBarContents?: ReactNode;
  onBack?: () => void;
}

export const TopNavBar = ({
  logo,
  title,
  actions,
  back,
  topNavColor = 'white',
  topNavBarContents,
  topNavBarClassName,
  onBack,
}: TopNavBarProps) => {
  const router = useRouter();
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <div
      className={cx(
        BLOCK,
        topNavColor && `background-color-${topNavColor}`,
        topNavBarClassName,
      )}
    >
      <div className={cx(`${BLOCK}__leading`)}>
        {!!logo && logo}
        {back && <IconButton icon={Back} onClick={handleBack} />}
      </div>
      {topNavBarContents !== undefined ? (
        <div className={cx(`${BLOCK}__contents`)}>{topNavBarContents}</div>
      ) : (
        <div className={cx(`${BLOCK}__height`)}></div>
      )}
      <div className={cx(`${BLOCK}__title`)}>{title}</div>
      <div className={cx(`${BLOCK}__actions`)}>
        {actions &&
          actions.map((Action, index) => {
            // 액션타입이 TextButtonProps면 TextButton 컴포넌트로 렌더링
            if ('text' in Action) {
              const { text, onClick } = Action as TextActionButtonProps;
              return <TextButton text={text} onClick={onClick} key={index} />;
            } else {
              const { icon, onClick } = Action as IconActionButtonProps;
              return <IconButton icon={icon} onClick={onClick} key={index} />;
            }
          })}
      </div>
    </div>
  );
};
