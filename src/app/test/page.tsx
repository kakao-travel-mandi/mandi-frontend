'use client';
import classNames from 'classnames/bind';

import Badge from '@/components/common/badge';
import {Button} from '@/components/common/button';
import {Chip} from '@/components/common/chip';

import styles from './test.module.scss';

const cn = classNames.bind(styles);

export default function Home() {
  const handleClick = () => {
    console.log('버튼이 클릭되었습니다!');
  };
  return (
    <div className={cn('container')}>
      <Chip>테스트</Chip>
      <Chip action={true}>테스트</Chip>
      <Button color="green" size="small">
        안녕
      </Button>
    </div>
  );
}