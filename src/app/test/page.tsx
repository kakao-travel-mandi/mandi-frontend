'use client';
import classNames from 'classnames/bind';

import IconHoleCup from '@/assets/icon/icon-holeCup.svg';
import BadgePageIcon from '@/components/badgePageIcon';

import styles from './test.module.scss';

const cn = classNames.bind(styles);

export default function Home() {
  const handleClick = () => {
    console.log('버튼이 클릭되었습니다!');
  };
  return (
    <div className={cn('container')}>
      <BadgePageIcon Icon={IconHoleCup} text="완주의 시작" />
      <BadgePageIcon Icon={IconHoleCup} text="테스트 테스트" disable />
    </div>
  );
}