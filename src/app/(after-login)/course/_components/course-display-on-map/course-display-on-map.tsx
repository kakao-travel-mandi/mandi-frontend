import { useMemo } from 'react';

import { PolylineF } from '@react-google-maps/api';

import EndPointSelectedIcon from '@/assets/colored-icon/end-points-selected.svg';
import EndPointIcon from '@/assets/colored-icon/end-points.svg';
import { useGPXQuery } from '@/queries/courseQuery';
import { Coordinate, MapCourseDTO, PointDTO } from '@/types/course';
import { coordinateToLatLng, getPathCoordinates } from '@/utils/geolocation';

import CustomMarker from '../custom-marker/custom-marker';

import { CourseMarker } from './course-marker/course-marker';

interface CourseMarkerProps {
  course: MapCourseDTO;
  selected?: boolean;
  selectedPointCoordinate?: Coordinate;
  visibleMidPoint?: boolean;
  visibleEndPoints?: boolean;
  onClickCourse?: (course: MapCourseDTO) => void;
  onClickEndPoints?: (point: PointDTO) => void;
}

const CourseDisplayOnMap = ({
  course,
  selected,
  selectedPointCoordinate,
  visibleMidPoint = true,
  visibleEndPoints = true,
  onClickCourse,
  onClickEndPoints,
}: CourseMarkerProps) => {
  const { data } = useGPXQuery(course.gpxUrl);

  const handleClickCourse = () => onClickCourse?.(course);

  const isPointSelected = (point: PointDTO) => {
    return (
      selectedPointCoordinate &&
      JSON.stringify(point.coordinate) ===
        JSON.stringify(selectedPointCoordinate)
    );
  };

  const getMarkerProps = (point: PointDTO) => ({
    icon: isPointSelected(point) ? <EndPointSelectedIcon /> : <EndPointIcon />,
    size: isPointSelected(point) ? { width: 36, height: 41 } : 12,
    anchor: isPointSelected(point),
  });

  const points = useMemo(() => [course.startPoint, course.endPoint], [course]);

  return (
    <>
      <PolylineF
        path={getPathCoordinates(data)}
        options={{ strokeColor: '#00B288', strokeWeight: 4 }}
        onClick={handleClickCourse}
      />
      {visibleMidPoint && (
        <CourseMarker
          name={course.courseName}
          position={coordinateToLatLng(course.midPoint)}
          size={selected ? 42 : 32}
          onClick={handleClickCourse}
        />
      )}
      {visibleEndPoints &&
        points.map((point, index) => {
          const { icon, size, anchor } = getMarkerProps(point);
          return (
            <CustomMarker
              key={index}
              icon={icon}
              size={size}
              position={coordinateToLatLng(point.coordinate)}
              onClick={() => onClickEndPoints?.(point)}
              anchor={anchor}
            />
          );
        })}
    </>
  );
};

export default CourseDisplayOnMap;
