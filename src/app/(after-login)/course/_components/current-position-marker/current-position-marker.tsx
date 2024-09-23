import { useState } from 'react';

import { CircleF, MarkerF } from '@react-google-maps/api';
import { renderToString } from 'react-dom/server';

interface CustomMarkerProps {
  icon: JSX.Element;
  position: google.maps.LatLngLiteral;
  selected?: boolean;
  showRadius?: boolean;
}

const CurrentPositionMarker = ({
  icon,
  position,
  selected = false,
  showRadius = false,
}: CustomMarkerProps) => {
  const [clicked, setClicked] = useState(false);
  const size = selected ? 36 : 26;
  return (
    <MarkerF
      position={position}
      icon={{
        url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
          renderToString(icon),
        )}`,
        scaledSize: new window.google.maps.Size(size, size),
        anchor: new window.google.maps.Point(size / 2, size / 2),
      }}
    >
      <CircleF
        center={position}
        radius={300}
        options={{
          strokeWeight: 0,
          fillColor: '#5483EE',
          fillOpacity: 0.4,
          clickable: false,
          visible: showRadius,
        }}
      />
    </MarkerF>
  );
};

export default CurrentPositionMarker;
