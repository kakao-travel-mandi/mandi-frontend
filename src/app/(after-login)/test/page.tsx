'use client';
import classNames from 'classnames/bind';

import MyInfoDown from '@/components/my-info-down';

import styles from './test.module.scss';

const cn = classNames.bind(styles);

export default function Home() {
  const handleClick = () => {
    console.log('버튼이 클릭되었습니다!');
  };
  return <MyInfoDown />;
}
/*      <div className={cn('container')}>
    </div>*/
