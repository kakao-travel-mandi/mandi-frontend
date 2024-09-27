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
import { deleteCookie } from 'cookies-next';

const cx = classNames.bind(styles);

const TrakingPage = () => {
  const { map, onLoad, onUnmount, center } = useMap();
  const {
    showResult,
    state,
    displayTime,
    totalDistance,
    updateTracking,
    handleClickPlayAndPause,
    handleClickStop,
    resetTracking,
  } = useTrekking();
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

  // 언마운트 시, showResult가 true일 경우 트래킹 데이터 초기화
  useEffect(() => {
    return () => {
      if (showResult) {
        resetTracking();
        deleteCookie('trekkingId');
      }
    };
  }, [showResult]);

  if (showResult) return <ResultPage />;

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
          // TODO: 코스 데이터 받아와서 넣기
          courseName='Course Name'
          state={state}
          time={displayTime}
          distance={totalDistance}
          handleClickStop={handleClickStop}
          handleClickPlayAndPause={handleClickPlayAndPause}
        />
      </DraggableBottomSheet>
    </Layout>
  );
};

export default TrakingPage;
