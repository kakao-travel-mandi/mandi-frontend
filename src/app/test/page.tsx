'use client';
import classNames from 'classnames/bind';

import ModalReviewSectionUp, {
  ModalReviewSectionUpProps,
} from '@/components/modal-review/modal-review-section-up';

import styles from './test.module.scss';

const cn = classNames.bind(styles);

export default function Home() {
  const handleClick = () => {
    console.log('버튼이 클릭되었습니다!');
  };
  const dummy: ModalReviewSectionUpProps = {
    img: '/map-ex.png',
    title: '신선대 둘레길',
    channel: ['신선대', '봉오리산'],
    time: 20,
    distance: 0.875,
    modal: 'write',
  };
  return (
    <div className={cn('container')}>
      <ModalReviewSectionUp
        img={dummy.img}
        title={dummy.title}
        channel={dummy.channel}
        time={dummy.time}
        distance={dummy.distance}
        modal={dummy.modal}
      />
    </div>
  );
}
