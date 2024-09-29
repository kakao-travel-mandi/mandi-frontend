import { useCallback } from 'react';

import { useNearbyCoursesMutation } from '@/queries/courseQuery';
import { useMapCourseStore } from '@/stores/map-course';
import { Coordinate, MapCourseDTO, PointDTO } from '@/types/course';
import { coordinateToLatLng, getBoundsCoordinates } from '@/utils/geolocation';

export const useNearbyCourse = (map: google.maps.Map | null) => {
  const { courses, setCourses, selectedItem, selectItem } = useMapCourseStore();
  const { mutate } = useNearbyCoursesMutation({
    onSuccess: data => setCourses(data.response.courses),
    onError: error => console.log(error),
  });

  const panTo = useCallback(
    (position: Coordinate) => map?.panTo(coordinateToLatLng(position)),
    [map],
  );
  const handleSearchButtonClick = useCallback(() => {
    const bounds = map?.getBounds();
    if (!bounds) return;
    const coordinates = getBoundsCoordinates(bounds);
    mutate(coordinates);
  }, [map, mutate]);
  const handleClickCourse = useCallback(
    (course: MapCourseDTO) => {
      selectItem({ type: 'course', data: course });
      setCourses([course]);
      panTo(course.midPoint);
    },
    [panTo, selectItem, setCourses],
  );
  const handleClickEndPoints = useCallback(
    (point: PointDTO) => {
      selectItem({ type: 'point', data: point });
      panTo(point.coordinate);
    },
    [panTo, selectItem],
  );
  const handleClickMap = useCallback(() => selectItem(null), [selectItem]);

  return {
    courses,
    selectedItem,
    handleSearchButtonClick,
    handleClickCourse,
    handleClickEndPoints,
    handleClickMap,
  };
};
