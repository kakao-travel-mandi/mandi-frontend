import { useCallback, useState } from 'react';

import { NearbyPoint } from '@/types/course';
import { NearbyFilter } from '@/types/nearby-filter';

export const useNearbyPlaces = (
  currentMarkerPosition: google.maps.LatLngLiteral | null,
) => {
  const [nearbyPlaces, setNearbyPlaces] = useState<NearbyPoint[] | null>(null);
  const [selectedNearby, selectNearby] = useState<NearbyFilter | null>(null);

  const removeNearbyPlaces = () => {
    setNearbyPlaces(null);
    selectNearby(null);
  };
  const selectNearbyChip = async (id: NearbyFilter, category: string[]) => {
    if (selectedNearby === id) {
      selectNearby(null);
      setNearbyPlaces(null);
      return;
    }
    selectNearby(id);
    const places = await nearbySearch(category);
    const nearbyPoints = places.map(place => ({
      id: place.id,
      name: place.displayName!,
      address: place.formattedAddress!,
      coordinate: {
        latitude: place.location?.lat()!,
        longitude: place.location?.lng()!,
      },
      filterName: id as NearbyFilter,
    }));
    setNearbyPlaces(nearbyPoints);
  };
  const nearbySearch = useCallback(
    async (category: string[]) => {
      const { Place, SearchNearbyRankPreference } =
        (await google.maps.importLibrary(
          'places',
        )) as google.maps.PlacesLibrary;

      const request: google.maps.places.SearchNearbyRequest = {
        // required parameters
        fields: ['id', 'location', 'displayName', 'formattedAddress'], // 경로를 위해 id 필요. 마커 표시 위해 location 필요, 이름 표시 위해 displayName 필요
        locationRestriction: {
          center: currentMarkerPosition!,
          radius: 1000,
        },
        includedPrimaryTypes: category,
        maxResultCount: 15,
        rankPreference: SearchNearbyRankPreference.POPULARITY,
      };
      const { places } = await Place.searchNearby(request);
      console.log(places);
      return places;
    },
    [currentMarkerPosition],
  );

  return {
    nearbyPlaces,
    selectedNearby,
    removeNearbyPlaces,
    selectNearbyChip,
  };
};
