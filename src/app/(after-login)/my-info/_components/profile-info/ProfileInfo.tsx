import classNames from 'classnames/bind';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import ArrowRight from '@/assets/icon/icon-arrow-right-small-mono.svg';

import styles from './ProfileInfo.module.scss';

const cx = classNames.bind(styles);

const BLOCK = 'profile';

interface ProfileInfoProps {
  className?: string;
}

export const ProfileInfo = ({ className }: ProfileInfoProps) => {
  // TODO: 라우팅 방식 정해야함
  const router = useRouter();
  const handleClick = () => router.push('/my-info/edit-profile');

  return (
    <div className={cx(BLOCK, className)} onClick={handleClick}>
      <div className={cx(`${BLOCK}__avatar`)}>
        <Image
          src={'/pwa-icon-192x192.png'}
          width={52}
          height={52}
          alt='profile image'
        />
      </div>
      <div className={cx(`${BLOCK}__details`)}>
        <div className={cx(`${BLOCK}__name`)}>김만디</div>
        <div className={cx(`${BLOCK}__introduction`)}>
          Explore Busan like a local with my expert tips and guides!
        </div>
      </div>
      <ArrowRight
        width={12}
        height={12}
        className={cx(`${BLOCK}__right-icon`)}
      />
    </div>
  );
};
