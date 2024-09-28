import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';

import IconArrowRightSmall from '@/assets/icon/icon-arrow-right-small.svg';
import IconMedal from '@/assets/icon/icon-gold-medal.svg';
import IconGoogle from '@/assets/icon/icon-google-small.svg';
import IconNote from '@/assets/icon/icon-note-mini.svg';
import IconSetting from '@/assets/icon/icon-setting.svg';

import styles from './myInfoDown.module.scss';

const cx = classNames.bind(styles);

const MyInfoDown = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push('/');
  };
  const handleMyBadgeClick = () => {
    router.push('/my-info/my-badge');
  };
  const handleTermsUseClick = () => {
    router.push('/my-info/privacy-policy');
  };
  const handlePrivacyPolicyClick = () => {
    router.push('/my-info/privacy-policy');
  };
  const handleOpenSourceLicenseClick = () => {
    alert('오픈 소스 라이선스는 필요시 추가합니다.');
  };
  const handleLoginInfoClick = () => {
    router.push('/my-info/login-info');
  };
  return (
    <div className={cx('container')}>
      <span className={cx('container__inventory', 'body2-semibold')}>
        <IconMedal />
        My Collection
      </span>
      <div onClick={handleMyBadgeClick} className={cx('label3-regular')}>
        My Badges
        <IconArrowRightSmall />
      </div>
      <span className={cx('container__inventory', 'body2-semibold')}>
        <IconNote />
        Policies & Agreements
      </span>
      <div onClick={handleTermsUseClick} className={cx('label3-regular')}>
        Terms of Use
        <IconArrowRightSmall />
      </div>
      <div onClick={handlePrivacyPolicyClick} className={cx('label3-regular')}>
        Privacy Policy
        <IconArrowRightSmall />
      </div>
      <div
        onClick={handleOpenSourceLicenseClick}
        className={cx('label3-regular')}
      >
        Open Source License
        <IconArrowRightSmall />
      </div>
      <div className={cx('label3-regular', 'container__version')}>
        App version
        <span>0.0.01</span>
      </div>
      <span className={cx('container__inventory', 'body2-semibold')}>
        <IconSetting />
        Setting
      </span>
      <div onClick={handleLoginInfoClick} className={cx('label3-regular')}>
        Login Information
        <div className={cx('container__info')}>
          <div className={cx('container__info__google')}>
            <IconGoogle />
          </div>
          <IconArrowRightSmall />
        </div>
      </div>
    </div>
  );
};
export default MyInfoDown;
