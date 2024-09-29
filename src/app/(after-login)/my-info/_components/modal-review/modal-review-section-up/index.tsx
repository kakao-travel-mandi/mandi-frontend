import { useState } from 'react';

import classNames from 'classnames/bind';
import Image from 'next/image';

import IconClock from '@/assets/icon/icon-clock.svg';
import IconEllipsisVertical from '@/assets/icon/icon-ellipsis-vertical.svg';
import IconExerciseRunning from '@/assets/icon/icon-exercise_running.svg';
import IconTrash from '@/assets/icon/icon-trash.svg';
import Button from '@/components/common/button';
import Dialog from '@/components/common/dialog';
import { Menubox } from '@/components/common/menubox';
import { useDeleteCompletedReview } from '@/queries/courseQuery';

import styles from './modalSectionUP.module.scss';

export interface ModalReviewSectionUpProps {
  CourseId: number;
  img: string;
  title: string;
  time?: number | string;
  distance?: number;
  modal?: 'write' | 'unWrite' | 'complete-course';
  date?: string | number;
}

const cx = classNames.bind(styles);

const ModalReviewSectionUp = ({
  CourseId,
  modal,
  img,
  title,
  time,
  distance,
  date,
}: ModalReviewSectionUpProps) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [deleteReview, setDeleteReview] = useState(false);
  const { mutate } = useDeleteCompletedReview();
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  const handleDelete = () => {
    mutate(`${CourseId}`, {
      onSuccess: () => {
        console.log('리뷰 삭제 성공!');
        setDeleteReview(true);
      },
    });
    setDialogOpen(false);
  };
  if (deleteReview) {
    return null;
  }
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
                onClick: () => {
                  setDialogOpen(true);
                  console.log('되겨');
                },
              },
            ]}
          />
          <Dialog
            isOpen={isDialogOpen}
            onClose={handleCloseDialog}
            title='Delete the review?'
            description='Deleted reviews cannot be recovered.'
            buttons={
              <div className={cx('container__dialog')}>
                <Button
                  size='full'
                  color='whitegray'
                  onClick={handleCloseDialog}
                >
                  Cancel
                </Button>
                <Button size='full' color='red' onClick={handleDelete}>
                  Delete
                </Button>
              </div>
            }
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
