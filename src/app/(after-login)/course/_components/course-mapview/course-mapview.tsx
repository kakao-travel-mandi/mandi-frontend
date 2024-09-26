'use client';

import { useCallback, useEffect, useState } from 'react';

import { GoogleMap } from '@react-google-maps/api';
import classNames from 'classnames/bind';

import CurrentIcon from '@/assets/icon/icon-circle-empty-mono.svg';
import RefreshIcon from '@/assets/icon/icon-refresh-mono.svg';
import { useNearbyCoursesMutation } from '@/queries/courseQuery';
import { useMapCourseStore } from '@/stores/map-course';
import { MapCourseDTO, PointDTO } from '@/types/course';
import { Position } from '@/types/geolocation';
import {
  coordinateToLatLng,
  getBoundsCoordinates,
  getCurrentPosition,
} from '@/utils/geolocation';

import { MapProvider } from '../../map-provider';
import CourseDisplayOnMap from '../course-display-on-map/course-display-on-map';
import CurrentPositionMarker from '../current-position-marker/current-position-marker';
import MarkerInfoCard from '../marker-info-card/marker-info-card';

import styles from './course-mapview.module.scss';
const cx = classNames.bind(styles);

interface CourseMapViewProps {}

const CourseMapView = ({}: CourseMapViewProps) => {
  const [center, setCenter] = useState<google.maps.LatLngLiteral | null>(null);
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
    const bounds = map?.getBounds();
    if (!bounds) return;

    const coordinates = getBoundsCoordinates(bounds);
    mutate(coordinates);
  };
  const { courses, setCourses, selectedItem, selectItem, resetStore } =
    useMapCourseStore();

  const { mutate } = useNearbyCoursesMutation({
    onSuccess: data => {
      console.log(data);
      setCourses(data.response.courses);
    },
    onError: error => {
      console.log(error);
    },
  });
  const onClickCourse = (course: MapCourseDTO) => {
    selectItem({ type: 'course', data: course });
    setCourses([course]);
    map?.panTo(coordinateToLatLng(course.midPoint));
  };
  const onClickEndPoints = (point: PointDTO) => {
    console.log(point);
    selectItem({ type: 'point', data: point });
    map?.panTo(coordinateToLatLng(point.coordinate));
  };

  const onClickMap = () => {
    selectItem(null);
  };

  useEffect(() => {
    fetchAndSetInitialCenter();
    return () => selectItem(null);
  }, [selectItem]);

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
            }}
            onClick={onClickMap}
          >
            {currentMarkerPosition && (
              <CurrentPositionMarker position={currentMarkerPosition} />
            )}
            {courses.map(course => (
              <CourseDisplayOnMap
                key={course.id}
                course={course}
                onClickCourse={onClickCourse}
                onClickEndPoints={onClickEndPoints}
                selected={
                  selectedItem?.type === 'course' &&
                  selectedItem.data.id === course.id
                }
                selectedPointCoordinate={
                  selectedItem?.type === 'point'
                    ? (selectedItem.data as PointDTO).coordinate
                    : undefined
                }
              />
            ))}
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
            {selectedItem && (
              <MarkerInfoCard
                type={selectedItem.type === 'course' ? 'course' : 'point'}
                data={selectedItem.data as any}
              />
            )}
          </div>
        </MapProvider>
      )}
    </div>
  );
};

export default CourseMapView;
