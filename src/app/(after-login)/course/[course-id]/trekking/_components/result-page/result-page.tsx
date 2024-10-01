import { GoogleMap } from '@react-google-maps/api';
import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';

import CourseDisplayOnMap from '@/app/(after-login)/course/_components/course-display-on-map/course-display-on-map';
import CurrentPositionMarker from '@/app/(after-login)/course/_components/current-position-marker/current-position-marker';
import { MapProvider } from '@/app/(after-login)/course/map-provider';
import CompleteIcon from '@/assets/colored-icon/complete_course.svg';
import Button from '@/components/common/button';
import Layout from '@/components/layout';
import { CourseDetailDTO } from '@/types/course';
import { formatDistance, formatTime } from '@/utils/trekker';

import { TrekkingData } from '../trekker/trekker';

import styles from './result-page.module.scss';

const cx = classNames.bind(styles);

interface ResultPageProps {
  courseData: CourseDetailDTO;
  totalTime: number;
  totalDistance: number;
  lastPosition: google.maps.LatLngLiteral;
}

const ResultPage = ({
  courseData,
  totalTime,
  totalDistance,
  lastPosition,
}: ResultPageProps) => {
  const router = useRouter();

  const handleClickSkip = () => {
    router.push('/');
  };
  const handleClickReview = () => {
    //TODO: 구현 필요
    router.push('/my-info/complete-course-review');
  };
  return (
    <Layout hasTabBar={false} hasTopNav={true} back={true}>
      <div className={cx('container')}>
        <div className={cx('contents')}>
          <div className={cx('result')}>
            <CompleteIcon className={cx('result__icon')} />
            <div className={cx('result__text')}>
              <h2>Corse Completed</h2>
              <span>{courseData.courseName}</span>
            </div>
          </div>
          <div className={cx('data')}>
            <div className={cx('data__row')}>
              <TrekkingData title='Time' content={formatTime(totalTime)} />
              <div className={cx('divider')} />
              <div className={cx('divider')} />
              <TrekkingData
                title='Distance'
                content={formatDistance(totalDistance)}
              />
            </div>
            <div className={cx('map')}>
              <MapProvider>
                <GoogleMap
                  mapContainerClassName={cx('map-container')}
                  center={lastPosition}
                  zoom={10}
                  options={{ disableDefaultUI: true }}
                  clickableIcons={false}
                >
                  <CurrentPositionMarker position={lastPosition} />
                  <CourseDisplayOnMap
                    course={courseData as any}
                    visibleMidPoint={false}
                    visibleEndPoints={false}
                  />
                </GoogleMap>
              </MapProvider>
            </div>
          </div>
        </div>
        <div className={cx('bottom-buttons')}>
          <Button size='full' color='whitegray' onClick={handleClickSkip}>
            Skip
          </Button>
          <Button size='full' color='green' onClick={handleClickReview}>
            Review
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default ResultPage;
