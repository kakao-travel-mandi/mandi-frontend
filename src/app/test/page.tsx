'use client';
import classNames from 'classnames/bind';

import Chip from '@/components/common/chip';
import Layout from '@/components/layout';

import styles from './test.module.scss';

const cn = classNames.bind(styles);

export default function Home() {
  const handleClick = () => {
    console.log('버튼이 클릭되었습니다!');
  };
  return (
    <Layout hasTopNav={true} hasTabBar={true} back={true} title='test'>
      <div className={cn('container')}>
        <Chip>테스트</Chip>
        <Chip action={true}>테스트</Chip>
      </div>
    </Layout>
  );
}
