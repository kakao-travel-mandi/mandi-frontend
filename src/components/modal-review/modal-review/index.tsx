import classNames from 'classnames/bind';

import ModalReviewSectionDown from '@/components/modal-review/modal-review-section-down/index';
import ModalReviewSectionUp from '@/components/modal-review/modal-review-section-up/index';

import styles from './modalReview.module.scss';

export interface ModalReviewProps {
  img: string;
  title: string;
  time?: number | string;
  distance?: number;

  modal: 'write' | 'unWrite' | 'complete-course';
  review?: string;
  reviewImgs?: string[];
  score?: number;
  date: string | number;
  reviewDate: string | number;
}

const cx = classNames.bind(styles);

const ModalReview = ({
  modal,
  img,
  title,
  time,
  distance,
  review,
  reviewImgs,
  score,
  date,
  reviewDate,
}: ModalReviewProps) => {
  return (
    <div className={cx('container')}>
      <ModalReviewSectionUp
        modal={modal}
        img={img}
        title={title}
        time={time}
        date={date}
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
