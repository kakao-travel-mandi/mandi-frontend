'use client';

import { useEffect, useState } from 'react';

import { GoogleMap } from '@react-google-maps/api';
import classNames from 'classnames/bind';

import DraggableBottomSheet from '@/components/common/draggable-bottomsheet';
import Layout from '@/components/layout';
import { NearbyPoint } from '@/types/course';
import { NearbyFilter } from '@/types/nearby-filter';
import { getCurrentPosition } from '@/utils/geolocation';

import CurrentPositionMarker from '../../_components/current-position-marker/current-position-marker';
import MarkerInfoCard from '../../_components/marker-info-card/marker-info-card';
import { MapProvider } from '../../map-provider';

import NearbyChips from './_components/nearby-chips/nearby-chips';
import NearbyMarker from './_components/nearby-marker/nearby-marker';
import NearbyPlacesList from './_components/nearby-places-list/nearby-places-list';
import Trekker from './_components/trekker/trekker';
import styles from './page.module.scss';
import { useMap } from '@/hooks/useMap';
import { useTrekking } from '@/hooks/useTrekking';
import { useRouter } from 'next/navigation';
import { useNearbyPlaces } from '@/hooks/useNearbyPlaces';
import ResultPage from './_components/result-page/result-page';
import { useCourseDetailQuery } from '@/queries/courseQuery';
import CourseDisplayOnMap from '../../_components/course-display-on-map/course-display-on-map';
import Dialog from '@/components/common/dialog';
import Button from '@/components/common/button';
import { deleteCookie } from 'cookies-next';

const cx = classNames.bind(styles);

const TrakingPage = ({ params }: { params: { 'course-id': string } }) => {
  const { map, onLoad, onUnmount, center } = useMap();
  const {
    showResult,
    state,
    displayTime,
    totalDistance,
    showDialog,
    resetTracking,
    closeDialog,
    updateTracking,
    handleClickPlayAndPause,
    handleClickStop,
  } = useTrekking();
  const {
    data: course,
    status: courseStatus,
    error: CourseError,
  } = useCourseDetailQuery({
    courseId: Number(params['course-id']),
  });
  const [currentMarkerPosition, setCurrentMarkerPosition] =
    useState<google.maps.LatLngLiteral | null>(null);
  const { nearbyPlaces, selectedNearby, selectNearbyChip, removeNearbyPlaces } =
    useNearbyPlaces(currentMarkerPosition);
  const [selectedMarker, selectMarker] = useState<NearbyPoint | null>(null);
  const router = useRouter();

  const onClickMarker = (point: NearbyPoint) => {
    selectMarker(point);
    map?.panTo({
      lat: point.coordinate.latitude,
      lng: point.coordinate.longitude,
    });
  };
  const handleClose = () => removeNearbyPlaces();
  const handleClickNearbyChip = async (
    id: NearbyFilter,
    category: string[],
  ) => {
    selectMarker(null);
    selectNearbyChip(id, category);
  };

  const clearSelections = () => {
    if (selectedMarker) {
      selectMarker(null);
      return true;
    }
    if (selectedNearby) {
      removeNearbyPlaces();
      return true;
    }
    return false;
  };
  const onClickBack = () => {
    if (!clearSelections()) router.back();
  };
  const onClickMap = () => clearSelections();
  const handleClickDialogEnd = () => {
    resetTracking();
    deleteCookie('trekkingId');
    router.push('/');
  };

  useEffect(() => {
    setCurrentMarkerPosition(center);
  }, [center]);

  useEffect(() => {
    let updateIntervalId: NodeJS.Timeout;

    updateIntervalId = setInterval(async () => {
      const currentPosition = await getCurrentPosition();
      setCurrentMarkerPosition({
        lat: currentPosition.latitude,
        lng: currentPosition.longitude,
      });
      if (state === 'Running') updateTracking(currentPosition, Date.now());
    }, 60000);

    return () => clearInterval(updateIntervalId);
  }, [state]);

  useEffect(() => {
    if (courseStatus === 'error' && CourseError.status === 404) {
      router.push('/'); // 홈으로 리다이렉트
    }
  }, [courseStatus, CourseError, router]);

  if (showResult)
    return (
      <ResultPage
        courseData={course!.response}
        totalTime={displayTime}
        totalDistance={totalDistance}
        lastPosition={currentMarkerPosition!}
      />
    );

  return (
    <Layout hasTopNav={true} hasTabBar={false} back={true} onBack={onClickBack}>
      <div className={cx('map')}>
        {map && (
          <NearbyChips
            className={cx('chips')}
            onClickNearbyChip={handleClickNearbyChip}
            selectedNearby={selectedNearby}
          />
        )}
        <MapProvider>
          {center && (
            <GoogleMap
              mapContainerClassName={cx('map')}
              center={center}
              zoom={15}
              options={{
                disableDefaultUI: true,
                clickableIcons: false,
              }}
              onLoad={onLoad}
              onUnmount={onUnmount}
              onClick={onClickMap}
            >
              {currentMarkerPosition && (
                <CurrentPositionMarker
                  position={currentMarkerPosition}
                  showRadius={true}
                />
              )}
              {nearbyPlaces?.map((point, i) => (
                <NearbyMarker
                  key={i}
                  point={point}
                  onClick={onClickMarker}
                  selected={selectedMarker?.id === point.id}
                />
              ))}
              {courseStatus === 'success' && (
                <CourseDisplayOnMap
                  course={course.response as any}
                  visibleMidPoint={false}
                  visibleEndPoints={false}
                />
              )}
            </GoogleMap>
          )}
        </MapProvider>
      </div>
      {selectedMarker && (
        <div className={cx('bottom-area')}>
          <MarkerInfoCard type='point' data={selectedMarker} />
        </div>
      )}
      <DraggableBottomSheet
        isOpen={!!nearbyPlaces && selectedMarker === null}
        onClose={handleClose}
      >
        <NearbyPlacesList list={nearbyPlaces} handleClickItem={onClickMarker} />
      </DraggableBottomSheet>
      <DraggableBottomSheet
        isOpen={nearbyPlaces == null && selectedMarker === null}
        onClose={handleClose}
        disableDrag={true}
        hasHeader={false}
        initialSnap={0}
        snapPoints={[230]}
      >
        <Trekker
          courseName={course?.response.courseName!}
          state={state}
          time={displayTime}
          distance={totalDistance}
          handleClickStop={handleClickStop}
          handleClickPlayAndPause={handleClickPlayAndPause}
        />
      </DraggableBottomSheet>
      <Dialog
        title='No courses completed yet.'
        description='Incomplete records will not be saved.'
        isOpen={showDialog}
        onClose={closeDialog}
        buttons={
          <div className={cx('dialog-buttons')}>
            <Button color='whitegray' size='full' onClick={closeDialog}>
              Cancel
            </Button>
            <Button color='red' size='full' onClick={handleClickDialogEnd}>
              End
            </Button>
          </div>
        }
      />
    </Layout>
  );
};

export default TrakingPage;
