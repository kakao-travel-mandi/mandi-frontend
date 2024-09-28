'use client';
import { use, useCallback, useEffect, useRef, useState } from 'react';

import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import { renderToString } from 'react-dom/server';

import HomeIcon from '@/assets/tabbar/icon-home.svg';
import BottomSheet from '@/components/common/bottomsheet';
import DraggableBottomSheet from '@/components/common/draggable-bottomsheet';
import Layout from '@/components/layout';
import { getCurrentPosition } from '@/utils/geolocation';

import { MapProvider } from '../map-provider';

import CustomMarker from './custom-marker/custom-marker';

const containerStyle = {
  width: '400px',
  height: '400px',
};
const center = {
  lat: 37.5612811, // 위도
  lng: 126.964338, // 경도
};

const Course = () => {
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [googleMaps, setGoogleMaps] = useState<any>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);
  const onUnmount = useCallback((map: google.maps.Map) => {
    setMap(null);
  }, []);

  useEffect(() => {
    (async () => {
      const { latitude, longitude } = await getCurrentPosition();
      setCenter({ lat: latitude, lng: longitude });
    })();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.google) {
      setGoogleMaps(window.google);
    }
  }, []);

  const nearbySearch = useCallback(async () => {
    // console.log('dd');
    const { Place, SearchNearbyRankPreference } =
      (await google.maps.importLibrary('places')) as google.maps.PlacesLibrary;

    const request: google.maps.places.SearchNearbyRequest = {
      // required parameters
      fields: ['id', 'location', 'displayName'], // 경로를 위해 id 필요. 마커 표시 위해 location 필요, 이름 표시 위해 displayName 필요
      locationRestriction: {
        center: center,
        radius: 500,
      },
      includedPrimaryTypes: ['cafe'],
      maxResultCount: 5,
      rankPreference: SearchNearbyRankPreference.POPULARITY,
    };
    const { places } = await Place.searchNearby(request);
    if (places.length) {
      console.log(places[0]);
    }
  }, [center]);

  return (
    <Layout hasTopNav={true} hasTabBar={false} back={true} title='Course'>
      <div>Course</div>
      <button onClick={nearbySearch}>주변 카페 검색</button>
      {/* <DraggableBottomSheet isOpen={true} onClose={() => setIsOpen(false)}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
          }}
        >
          <div
            style={{
              width: '500px',
              height: '500px',
              backgroundColor: 'green',
            }}
          />
          <div
            style={{
              width: '500px',
              height: '500px',
              backgroundColor: 'green',
            }}
          />
          <div
            style={{
              width: '500px',
              height: '500px',
              backgroundColor: 'green',
            }}
          />
        </div>
      </DraggableBottomSheet> */}
      <MapProvider>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <CustomMarker position={center} />
        </GoogleMap>
      </MapProvider>
    </Layout>
  );
};

export default Course;
