'use client';

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { GoogleMap } from '@react-google-maps/api';
import classNames from 'classnames/bind';

import HomeIcon from '@/assets/colored-icon/current.svg';
import CurrentIcon from '@/assets/icon/icon-circle-empty-mono.svg';
import RefreshIcon from '@/assets/icon/icon-refresh-mono.svg';
import { Position } from '@/types/geolocation';
import { getCurrentPosition } from '@/utils/geolocation';

import { MapProvider } from '../../map-provider';
import CustomMarker from '../custom-marker/custom-marker';

import styles from './course-mapview.module.scss';
import { Course, Point } from '@/types/course';
import Card from '../card/card';
const cx = classNames.bind(styles);

const dummyPoint: Point = {
  lat: 37.123,
  lng: 127.123,
  name: 'Haeundae',
  address: '59 Bukhang-ro, Nam-gu, Busan',
};
const dummyCourse: Course = {
  id: '1',
  name: 'Sinseondae',
  difficulty: 'easy',
  distance: 3.5,
  duration: '1:30',
  startPoint: dummyPoint,
  endPoint: dummyPoint,
  ratingAverage: '4.5',
};

interface CourseMapViewProps {
  setLayout: Dispatch<SetStateAction<'map' | 'none' | 'list'>>;
}

type SelectedMarker =
  | {
      type: 'Course';
      data: Course;
    }
  | {
      type: 'Point';
      data: Point;
    }
  | null;
const CourseMapView = ({ setLayout }: CourseMapViewProps) => {
  const [selectedMarker, setSelectedMarker] = useState<SelectedMarker>(null);
  const [center, setCenter] = useState<Position | null>(null);
  const [currentMarkerPosition, setCurrentMarkerPosition] =
    useState<Position | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);
  const onUnmount = useCallback((map: google.maps.Map) => {
    setMap(null);
  }, []);
  const fetchAndSetInitialCenter = async () => {
    const currentPosition = await getCurrentPosition();
    setCenter({
      lat: currentPosition.latitude,
      lng: currentPosition.longitude,
    });
  };
  const handleCurrentButtonClick = async () => {
    if (!map) return;
    if (currentMarkerPosition === null) {
      const { latitude: lat, longitude: lng } = await getCurrentPosition();
      const newPosition = { lat, lng };

      setCurrentMarkerPosition(newPosition);
      map.panTo(newPosition);
    } else {
      setCurrentMarkerPosition(null);
    }
  };
  const handleSearchButtonClick = () => {
    // 보이는 지도 경계 가져온 후, 서버에 요청
    const bounds = map?.getBounds();
    console.dir(bounds);
  };

  useEffect(() => {
    fetchAndSetInitialCenter();
  }, []);

  return (
    <div className={cx('container')}>
      {center && (
        <MapProvider>
          <GoogleMap
            mapContainerClassName={cx('map')}
            onLoad={onLoad}
            onUnmount={onUnmount}
            center={center}
            zoom={15}
            options={{
              disableDefaultUI: true,
              clickableIcons: false,
              styles: [
                {
                  elementType: 'geometry',
                  stylers: [{ visibility: 'visible' }],
                },
              ],
            }}
          >
            {currentMarkerPosition && (
              <CustomMarker
                position={currentMarkerPosition}
                icon={<HomeIcon />}
                selected={true}
              />
            )}
          </GoogleMap>
          <button
            className={cx('search-button')}
            onClick={handleSearchButtonClick}
          >
            <RefreshIcon className={cx('search-button__icon')} />
            <span>Search on map</span>
          </button>
          <div className={cx('bottom-area')}>
            <button
              className={cx('current-button')}
              onClick={handleCurrentButtonClick}
            >
              <CurrentIcon className={cx('current-button__icon')} />
            </button>
            <Card type='point' data={dummyPoint} />
          </div>
        </MapProvider>
      )}
    </div>
  );
};

export default CourseMapView;
