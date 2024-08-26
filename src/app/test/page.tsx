'use client';
import classNames from 'classnames/bind';

import StarScope from '@/components/star-scope';

import styles from './test.module.scss';

const cn = classNames.bind(styles);

export default function Home() {
  const handleClick = () => {
    console.log('버튼이 클릭되었습니다!');
  };
  return (
    <div className={cn('container')}>
      <StarScope score={2} isReadOnly={true} />
      <StarScope score={2} />
    </div>
  );
}
