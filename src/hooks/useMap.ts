import { useCallback, useEffect, useState } from 'react';

import { getCurrentPosition } from '@/utils/geolocation';

export const useMap = () => {
  const [center, setCenter] = useState<google.maps.LatLngLiteral | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => setMap(map), []);
  const onUnmount = useCallback(() => setMap(null), []);

  const fetchAndSetInitialCenter = useCallback(async () => {
    const currentPosition = await getCurrentPosition();
    setCenter({
      lat: currentPosition.latitude,
      lng: currentPosition.longitude,
    });
  }, []);

  useEffect(() => {
    fetchAndSetInitialCenter();
  }, [fetchAndSetInitialCenter]);

  return { center, map, onLoad, onUnmount };
};
