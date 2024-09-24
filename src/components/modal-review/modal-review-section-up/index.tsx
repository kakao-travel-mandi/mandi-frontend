import classNames from 'classnames/bind';
import Image from 'next/image';

import IconClock from '@/assets/icon/icon-clock.svg';
import IconEllipsisVertical from '@/assets/icon/icon-ellipsis-vertical.svg';
import IconExerciseRunning from '@/assets/icon/icon-exercise_running.svg';
import IconMapPin from '@/assets/icon/icon-map-pin.svg';
import IconTrash from '@/assets/icon/icon-trash.svg';
import { Menubox } from '@/components/common/menubox';

import styles from './modalSectionUP.module.scss';

export interface ModalReviewSectionUpProps {
  img: string;
  title: string;
  time?: number | string;
  distance?: number;
  modal?: 'write' | 'unWrite' | 'complete-course';
  date?: string | number;
}

const cx = classNames.bind(styles);

const ModalReviewSectionUp = ({
  modal,
  img,
  title,
  time,
  distance,
  date,
}: ModalReviewSectionUpProps) => {
  return (
    <>
      {modal === 'write' ? (
        <div className={cx('container__write')}>
          <Image
            src={img}
            className={cx('container__write__img')}
            width={52}
            height={52}
            alt='리뷰 지도'
          />
          <div className={cx('container__write__content')}>
            <span className={cx('label4-regular')}>{date}</span>
            <span className={cx('container__write__title', 'label1-semibold')}>
              {title}
            </span>
          </div>
          <Menubox
            triggerButton={<IconEllipsisVertical />}
            items={[
              {
                content: 'Delete',
                icon: IconTrash,
                onClick: () => alert('삭제되었습니다(수정필요)'),
              },
            ]}
          />
        </div>
      ) : (
        <div className={cx('container')}>
          <Image
            src={img}
            className={cx('container__img')}
            width={80}
            height={80}
            alt='리뷰 지도'
          />
          <div className={cx('container__content')}>
            <span className={cx('label4-regular')}>{date}</span>
            <span className={cx('container__title', 'subtitle1-semibold')}>
              {title}
            </span>
            <div className={cx('container__record', 'label3-medium')}>
              <div className={cx('container__record__frame')}>
                <IconClock width='16' height='16' fill='#ADB1BA' />
                <span> {time}</span>
              </div>
              <div className={cx('container__record__frame')}>
                <IconExerciseRunning width='16' height='16' fill='#ADB1BA' />
                <span> {distance}km</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalReviewSectionUp;
