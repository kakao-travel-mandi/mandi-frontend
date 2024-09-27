import classNames from 'classnames/bind';
import Image from 'next/image';

import ModalReview from '@/app/(after-login)/my-info/_components/modal-review/modal-review/index';

import styles from './reviewLayout.module.scss';

interface ReviewsData {
  id: number;
  courseName: string;
  duration: string;
  distance: number;
  trekkingPathImageUrl: string;
  completedAt: string;

  isReviewed?: boolean;
  content?: string;
  reviewedAt?: string;
  score?: number;
}

interface ReviewLayoutProps {
  reviewsData?: ReviewsData[] | undefined; // API가 데이터 제공하기 전까지 타입

  modal: 'write' | 'unWrite' | 'complete-course';
}

const cx = classNames.bind(styles);

const ReviewLayout = ({ reviewsData, modal }: ReviewLayoutProps) => {
  return (
    <div className={cx('container')}>
      {reviewsData && reviewsData.length > 0 ? (
        reviewsData.map((data, index) => (
          <ModalReview
            key={index}
            img={data.trekkingPathImageUrl}
            title={data.courseName}
            time={data.duration}
            distance={data.distance}
            modal={modal}
            date={data.completedAt}
            review={data.content}
            score={data.score}
            reviewDate={data.reviewedAt}
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
