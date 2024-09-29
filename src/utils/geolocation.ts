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

type CoordinateToLatLngFunction = {
  (coordinate: Coordinate, literal: true): google.maps.LatLngLiteral;
  (coordinate: Coordinate, literal?: false): google.maps.LatLng;
};
export const coordinateToLatLng: CoordinateToLatLngFunction = function (
  coordinate: Coordinate,
  literal?: boolean,
): google.maps.LatLng | google.maps.LatLngLiteral {
  if (literal === true) {
    return {
      lat: coordinate.latitude,
      lng: coordinate.longitude,
    };
  } else {
    return new google.maps.LatLng(coordinate.latitude, coordinate.longitude);
  }
} as CoordinateToLatLngFunction;

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

const deg2rad = (deg: number) => deg * (Math.PI / 180);

export const getDistance = (coord1: Coordinate, coord2: Coordinate) => {
  const R = 6371; // 지구의 반경 (km)
  const dLat = deg2rad(coord2.latitude - coord1.latitude);
  const dLon = deg2rad(coord2.longitude - coord1.longitude);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(coord1.latitude)) *
      Math.cos(deg2rad(coord2.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // 거리 (km)
  return distance;
};
