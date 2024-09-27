import Layout from '@/components/layout';

import styles from './result-page.module.scss';
import classNames from 'classnames/bind';
import CompleteIcon from '@/assets/colored-icon/complete_course.svg';
import { TrekkingData } from '../trekker/trekker';
import { MapProvider } from '@/app/(after-login)/course/map-provider';
import { GoogleMap } from '@react-google-maps/api';
import Button from '@/components/common/button';

const cx = classNames.bind(styles);

const ResultPage = () => {
  // 마지막 위치로 현재위치 표시하자.
  // 누적시간, 거리 가져오자

  // 경로는 받아오자.
  return (
    <Layout hasTabBar={false} hasTopNav={true} back={true}>
      <div className={cx('container')}>
        <div className={cx('contents')}>
          <div className={cx('result')}>
            <CompleteIcon className={cx('result__icon')} />
            <div className={cx('result__text')}>
              <h2>Corse Completed</h2>
              <span>Sinseondae</span>
            </div>
          </div>
          <div className={cx('data')}>
            <div className={cx('data__row')}>
              <TrekkingData title='Time' content={'00:12:34'} />
              <div className={cx('divider')} />
              <div className={cx('divider')} />
              <TrekkingData title='Distance' content={'1.25km'} />
            </div>
            <div className={cx('map')}>
              <MapProvider>
                <GoogleMap
                  mapContainerClassName={cx('map-container')}
                  center={{ lat: 37.5665, lng: 126.978 }}
                  zoom={10}
                  options={{ disableDefaultUI: true }}
                  clickableIcons={false}
                />
              </MapProvider>
            </div>
          </div>
        </div>
        <div className={cx('bottom-buttons')}>
          <Button size='full' color='whitegray'>
            Skip
          </Button>
          <Button size='full' color='green'>
            Review
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default ResultPage;
