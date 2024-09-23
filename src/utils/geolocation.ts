import { Coordinate } from '@/types/course';
import { GetNearbyCoursesRequest } from '@/types/request';

// 현재 위치(위도, 경도)를 가져오는 함수
export const getCurrentPosition = async () => {
  if (typeof navigator === 'undefined' || !navigator.geolocation) {
    console.warn('Geolocation is not supported');
    throw new Error('Geolocation is not supported');
  }

  return new Promise<{ latitude: number; longitude: number }>(
    (resolve, reject) => {
      const success = (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude });
      };

      const error = (error: GeolocationPositionError) => {
        console.warn(`ERROR(${error.code}): ${error.message}`);
        reject(error);
      };

      navigator.geolocation.getCurrentPosition(success, error);
    },
  );
};

export const getBoundsCoordinates = (
  bounds: google.maps.LatLngBounds,
): GetNearbyCoursesRequest => {
  const sw = bounds.getSouthWest();
  const ne = bounds.getNorthEast();

  return {
    sw: {
      latitude: sw.lat(),
      longitude: sw.lng(),
    },
    ne: {
      latitude: ne.lat(),
      longitude: ne.lng(),
    },
  };
};

export function coordinateToLatLng(coordinate: Coordinate): google.maps.LatLng {
  return new google.maps.LatLng(coordinate.latitude, coordinate.longitude);
}

export const getPathCoordinates = (gpxText: any) => {
  const parser = new DOMParser();
  const gpxDoc = parser.parseFromString(gpxText, 'application/xml');

  const trackPoints = gpxDoc.getElementsByTagName('trkpt');
  const pathCoordinates = Array.from(trackPoints).map(point => ({
    lat: parseFloat(point.getAttribute('lat') || '0'),
    lng: parseFloat(point.getAttribute('lon') || '0'),
  }));
  return pathCoordinates;
};
