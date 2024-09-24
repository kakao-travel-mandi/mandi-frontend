import { CircleF } from '@react-google-maps/api';

import Icon from '@/assets/colored-icon/current_position.svg';

import CustomMarker from '../custom-marker/custom-marker';

interface CustomMarkerProps {
  position: google.maps.LatLngLiteral;
  showRadius?: boolean;
}

const CurrentPositionMarker = ({
  position,
  showRadius = true,
}: CustomMarkerProps) => {
  const size = 20;
  return (
    <>
      <CustomMarker
        position={new google.maps.LatLng(position.lat, position.lng)}
        icon={<Icon />}
        size={size}
        customAnchor={new window.google.maps.Point(size / 2, size / 2 - 2)}
      />
      <CircleF
        center={position}
        radius={100}
        options={{
          strokeWeight: 0,
          fillColor: '#5483EE',
          fillOpacity: 0.4,
          clickable: false,
          visible: showRadius,
        }}
      />
    </>
  );
};

export default CurrentPositionMarker;
