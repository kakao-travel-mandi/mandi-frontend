'use client';

import { useState } from 'react';

import { GoogleMap } from '@react-google-maps/api';
import classNames from 'classnames/bind';

import CurrentIcon from '@/assets/icon/icon-circle-empty-mono.svg';
import RefreshIcon from '@/assets/icon/icon-refresh-mono.svg';
import { useMapCourseStore } from '@/stores/map-course';
import { PointDTO } from '@/types/course';
import { Position } from '@/types/geolocation';
import { getCurrentPosition } from '@/utils/geolocation';

import { MapProvider } from '../../map-provider';
import CourseDisplayOnMap from '../course-display-on-map/course-display-on-map';
import CurrentPositionMarker from '../current-position-marker/current-position-marker';
import MarkerInfoCard from '../marker-info-card/marker-info-card';

import styles from './course-mapview.module.scss';
import { useMap } from '@/hooks/useMap';
import { useNearbyCourse } from '@/hooks/useNearbyCourse';
const cx = classNames.bind(styles);

const CourseMapView = () => {
  const { center, map, onLoad, onUnmount } = useMap();
  const [currentMarkerPosition, setCurrentMarkerPosition] =
    useState<Position | null>(null);
  const { courses, selectedItem } = useMapCourseStore();
  const {
    handleClickCourse,
    handleClickEndPoints,
    handleSearchButtonClick,
    handleClickMap,
  } = useNearbyCourse(map);

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
            onClick={handleClickMap}
          >
            {currentMarkerPosition && (
              <CurrentPositionMarker position={currentMarkerPosition} />
            )}
            {courses.map(course => (
              <CourseDisplayOnMap
                key={course.id}
                course={course}
                onClickCourse={handleClickCourse}
                onClickEndPoints={handleClickEndPoints}
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
