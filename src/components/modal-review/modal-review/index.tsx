import classNames from 'classnames/bind';

import ModalReviewSectionDown from '@/components/modal-review/modal-review-section-down/index';
import ModalReviewSectionUp from '@/components/modal-review/modal-review-section-up/index';

import styles from './modalReview.module.scss';

export interface ModalReviewProps {
  img: string;
  title: string;
  channel: [string, string];
  time?: number | string;
  distance?: number;

  modal: 'write' | 'unWrite' | 'complete-course';
  review?: string;
  reviewImgs?: string[];
  score: number;
  date: string | number;
}

const cx = classNames.bind(styles);

const ModalReview = ({
  modal,
  img,
  title,
  channel,
  time,
  distance,
  review,
  reviewImgs,
  score,
  date,
}: ModalReviewProps) => {
  return (
    <div className={cx('container')}>
      <ModalReviewSectionUp
        modal={modal}
        img={img}
        title={title}
        channel={channel}
        time={time}
        distance={distance}
      />
      <ModalReviewSectionDown
        review={review}
        reviewImgs={reviewImgs}
        score={score}
        date={date}
        modal={modal}
      />
    </div>
  );
};
export default ModalReview;
