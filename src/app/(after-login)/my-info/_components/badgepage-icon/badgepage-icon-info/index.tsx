import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import Image from 'next/image';

import Button from '@/components/common/button';

import styles from './badgePageIconInfo.module.scss';

interface BadgePageIconInfoProps {
  text: string | undefined;
  icon?: string | undefined;
  disable?: boolean | undefined;
  onClick: () => void;
}

const cx = classNames.bind(styles);

const BadgePageIconInfo = ({
  text,
  icon,
  disable,
  onClick,
}: BadgePageIconInfoProps) => {
  const [description, setDescription] = useState('');
  useEffect(() => {
    if (text === 'Mandi Starter') {
      setDescription('Join the Mandi service');
    } else if (text === 'Course Collector') {
      setDescription('3 or more course scraps');
    } else if (text === 'Joy of Sharing') {
      setDescription('Write your first review');
    } else if (text === 'Beginning of Completion') {
      setDescription('Completing the first course');
    } else if (text === 'Walked 10,000 Steps') {
      setDescription('Achieve a total distance of over 8km');
    } else if (text === 'Mandiholic') {
      setDescription('Visit the mandi service more than 10 times');
    } else {
      setDescription('');
    }
  }, [text]);
  return (
    <div className={cx('container')}>
      <div
        className={cx('container__icon', disable && 'container__icon__disable')}
      >
        <Image
          src={icon ?? '/badge/mountain.svg'}
          width={82}
          height={82}
          alt='badge'
        />
      </div>
      <div className={cx('container__text')}>
        <span className={cx('label1-semibold')}>{text}</span>

        <span className={cx('label2-regular')}>{description}</span>
      </div>
      <Button size='full' color='green' onClick={onClick}>
        Close
      </Button>
    </div>
  );
};

export default BadgePageIconInfo;
