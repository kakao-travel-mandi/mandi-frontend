'use client';

import { useEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';
import Image from 'next/image';

import TrashcanIcon from '@/assets/icon/icon-bin-mono 1.svg';
import MoreIcon from '@/assets/icon/icon-ellipsis-vertical.svg';
import SirenIcon from '@/assets/icon/icon-siren-mono.svg';
import { Menubox } from '@/components/common/menubox';

import Star from '../star-raing/star';

import { Review } from './dummy-reviews';
import styles from './review-item.module.scss';

const BLOCK = 'review-item';
const cx = classNames.bind(styles);

const ReviewItem = ({ id, rating, date, content, images, user }: Review) => {
  const cloneRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const [overflow, setOverflow] = useState<boolean | null>(null);

  const handleExpand = () => setOverflow(false);

  useEffect(() => {
    const clone = cloneRef.current;
    const text = textRef.current;

    if (clone && text) {
      const cloneHeight = clone.getBoundingClientRect().height;
      const textHeight = text.getBoundingClientRect().height;

      const isOverflow = textHeight < cloneHeight;

      setOverflow(isOverflow);
    }
  }, []);

  return (
    <div className={cx(BLOCK)}>
      <div className={cx(`${BLOCK}__header`)}>
        <div className={cx(`${BLOCK}__avatar`)} />
        <div className={cx(`${BLOCK}__user-rating`)}>
          <div className={cx(`${BLOCK}__username`)}>{user.name}</div>
          <div className={cx(`${BLOCK}__rating`)}>
            <Star type='filled' />
            <span>{rating}</span>
          </div>
        </div>
        <div className={cx(`${BLOCK}__date`)}>{date}</div>
        <Menubox
          triggerButton={<MoreIcon className={cx(`${BLOCK}__more-icon`)} />}
          items={[
            // TODO: user store 이용해서 내가 쓴 리뷰인지 확인
            {
              icon: TrashcanIcon,
              content: 'Delete',
              onClick: () => console.log('Delete'),
            },
            {
              icon: SirenIcon,
              content: 'Report',
              onClick: () => console.log('Report'),
            },
          ]}
        />
      </div>
      <div className={cx(`${BLOCK}__content`)}>
        <div className={cx(`${BLOCK}__images`)}>
          {images.map((image, index) => (
            <div key={image.id} className={cx(`${BLOCK}__images__item`)}>
              <Image src={image.src} alt='review-image' layout='fill' />
            </div>
          ))}
        </div>
        <div ref={cloneRef} className={cx(`${BLOCK}__text__clone`)}>
          {content}
        </div>
        <div>
          <div
            ref={textRef}
            className={cx(`${BLOCK}__text`, {
              [`${BLOCK}__text--expanded`]: overflow === false,
            })}
          >
            {content}
          </div>
          {overflow && (
            <button
              className={cx(`${BLOCK}__expand-button`)}
              onClick={handleExpand}
            >
              more
            </button>
          )}
        </div>
      </div>
      {/* TODO: 리뷰 삭제 dialog */}
    </div>
  );
};

export default ReviewItem;
