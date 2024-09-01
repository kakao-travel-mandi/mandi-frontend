import classNames from 'classnames/bind';
import Image from 'next/image';

import ModalReview, {
  ModalReviewProps,
} from '@/components/modal-review/modal-review/index';

import styles from './reviewLayout.module.scss';

interface ReviewLayoutProps {
  modalReviewsData?: ModalReviewProps[]; // API가 데이터 제공하기 전까지 타입
  modal: 'write' | 'unWrite' | 'complete-course';
}

const cx = classNames.bind(styles);

const ReviewLayout = ({ modalReviewsData, modal }: ReviewLayoutProps) => {
  return (
    <div className={cx('container')}>
      {modalReviewsData && modalReviewsData.length > 0 ? (
        modalReviewsData.map((data, index) => (
          <ModalReview
            key={index}
            img={data.img}
            title={data.title}
            channel={data.channel}
            time={data.time}
            distance={data.distance}
            modal={data.modal}
            review={data.review}
            reviewImgs={data.reviewImgs}
            score={data.score}
            date={data.date}
          />
        ))
      ) : (
        <div className={cx('container__nodata')}>
          <div className={cx('container__nodata__content')}>
            <Image
              src='/basic/no-content-note.svg'
              width={60}
              height={60}
              alt='내용이 없는 노트'
            />
            {modal === 'unWrite' ? (
              <div className={cx('container__nodata__text')}>
                <span className={cx('body2-semibol')}>
                  There are no completed courses.
                </span>
                <span className={cx('label4-regular')}>
                  Complete a course that interests you.
                </span>
              </div>
            ) : (
              <div className={cx('container__nodata__text')}>
                <span className={cx('body2-semibol')}>
                  You haven’t written any reviews yet.
                </span>
                <span className={cx('label4-regular')}>
                  Please leave a review for the
                  <br /> courses you&apos;ve completed.
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewLayout;
