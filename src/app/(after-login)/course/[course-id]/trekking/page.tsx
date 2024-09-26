'use client';

import { useCallback, useEffect, useState } from 'react';

import { GoogleMap } from '@react-google-maps/api';
import classNames from 'classnames/bind';

import DraggableBottomSheet from '@/components/common/draggable-bottomsheet';
import Layout from '@/components/layout';
import { NearbyPoint } from '@/types/course';
import { NearbyFilter } from '@/types/nearby-filter';
import { getCurrentPosition } from '@/utils/geolocation';

import CurrentPositionMarker from '../../_components/current-position-marker/current-position-marker';
import MarkerInfoCard from '../../_components/marker-info-card/marker-info-card';
import { MapProvider } from '../../map-provider';

import NearbyChips from './_components/nearby-chips/nearby-chips';
import NearbyMarker from './_components/nearby-marker/nearby-marker';
import NearbyPlacesList from './_components/nearby-places-list/nearby-places-list';
import Trekker from './_components/trekker/trekker';
import styles from './page.module.scss';

const cx = classNames.bind(styles);

const TrakingPage = () => {
  // TODO: center 상태는 나중에 없애기
  const [center, setCenter] = useState<google.maps.LatLngLiteral | null>(null);
  const [currentMarkerPosition, setCurrentMarkerPosition] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [nearbyPlaces, setNearbyPlaces] = useState<NearbyPoint[] | null>(null);
  const [selectedNearby, selectNearby] = useState<NearbyFilter | null>(null);
  const [selectedMarker, selectMarker] = useState<NearbyPoint | null>(null);
  const onClickMarker = (point: NearbyPoint) => selectMarker(point);

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);
  const onUnmount = useCallback((map: google.maps.Map) => {
    setMap(null);
  }, []);

  const handleClose = () => {
    setNearbyPlaces(null);
    selectNearby(null);
  };
  const handleClickNearbyChip = async (
    id: NearbyFilter,
    category: string[],
  ) => {
    selectMarker(null);
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
          radius: 500,
        },
        includedPrimaryTypes: category,
        // TODO: 지정 필요
        maxResultCount: 10,
        rankPreference: SearchNearbyRankPreference.POPULARITY,
      };
      const { places } = await Place.searchNearby(request);
      console.log(places);
      return places;
    },
    [currentMarkerPosition],
  );
  const fetchAndSetInitialCenter = async () => {
    const currentPosition = await getCurrentPosition();
    setCenter({
      lat: currentPosition.latitude,
      lng: currentPosition.longitude,
    });
    // TODO:임시로 현재 위치 마커를 표시하기 위해
    setCurrentMarkerPosition({
      lat: currentPosition.latitude,
      lng: currentPosition.longitude,
    });
  };
  const onClickBack = () => {
    if (selectedNearby) {
      selectNearby(null);
      setNearbyPlaces(null);
    }
  };
  const onClickMap = () => {
    if (selectedMarker) {
      selectMarker(null);
      return;
    }
    if (selectedNearby) {
      selectNearby(null);
      setNearbyPlaces(null);
    }
  };

  useEffect(() => {
    fetchAndSetInitialCenter();
  }, []);

  return (
    <Layout hasTopNav={true} hasTabBar={false} back={true} onBack={onClickBack}>
      <div className={cx('map')}>
        {map && (
          <NearbyChips
            className={cx('chips')}
            onClickNearbyChip={handleClickNearbyChip}
            selectedNearby={selectedNearby}
          />
        )}
        <MapProvider>
          {center && (
            <GoogleMap
              mapContainerClassName={cx('map')}
              center={center}
              zoom={15}
              options={{
                disableDefaultUI: true,
                clickableIcons: false,
              }}
              onLoad={onLoad}
              onUnmount={onUnmount}
              onClick={onClickMap}
            >
              {currentMarkerPosition && (
                <CurrentPositionMarker
                  position={currentMarkerPosition}
                  showRadius={true}
                />
              )}
              {nearbyPlaces?.map((point, i) => (
                <NearbyMarker
                  key={i}
                  point={point}
                  onClick={onClickMarker}
                  selected={selectedMarker?.id === point.id}
                />
              ))}
            </GoogleMap>
          )}
        </MapProvider>
      </div>
      {selectedMarker && (
        <div className={cx('bottom-area')}>
          <MarkerInfoCard type='point' data={selectedMarker} />
        </div>
      )}
      <DraggableBottomSheet
        isOpen={!!nearbyPlaces && selectedMarker === null}
        onClose={handleClose}
      >
        <NearbyPlacesList list={nearbyPlaces} />
      </DraggableBottomSheet>
      <DraggableBottomSheet
        isOpen={nearbyPlaces == null && selectedMarker === null}
        onClose={handleClose}
        disableDrag={true}
        hasHeader={false}
        initialSnap={0}
        snapPoints={[230]}
      >
        <Trekker />
      </DraggableBottomSheet>
    </Layout>
  );
};

export default TrakingPage;
