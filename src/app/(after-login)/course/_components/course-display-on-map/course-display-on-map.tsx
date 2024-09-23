import { useGPXQuery } from '@/queries/courseQuery';
import { Coordinate, MapCourseDTO, PointDTO } from '@/types/course';
import { coordinateToLatLng, getPathCoordinates } from '@/utils/geolocation';
import { PolylineF } from '@react-google-maps/api';
import EndPointIcon from '@/assets/colored-icon/end-points.svg';
import EndPointSelectedIcon from '@/assets/colored-icon/end-points-selected.svg';
import { CourseMarker } from './course-marker/course-marker';
import CustomMarker from '../custom-marker/custom-marker';
import { useMemo } from 'react';

interface CourseMarkerProps {
  course: MapCourseDTO;
  selected?: boolean;
  selectedPointCoordinate?: Coordinate;
  onClickCourse?: (course: MapCourseDTO) => void;
  onClickEndPoints?: (point: PointDTO) => void;
}

const CourseDisplayOnMap = ({
  course,
  selected,
  selectedPointCoordinate,
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
      <CourseMarker
        name={course.courseName}
        position={coordinateToLatLng(course.midPoint)}
        size={selected ? 42 : 32}
        onClick={handleClickCourse}
      />
      {points.map((point, index) => {
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
