import { useState } from 'react';

import {
  CircleF,
  MarkerF,
  OverlayView,
  OverlayViewF,
} from '@react-google-maps/api';
import classNames from 'classnames/bind';
import { renderToString } from 'react-dom/server';

import styles from './custom-marker.module.scss';

const cx = classNames.bind(styles);

interface CustomMarkerProps {
  icon: JSX.Element;
  position: google.maps.LatLngLiteral;
  selected?: boolean;
  showRadius?: boolean;
}

const CustomMarker = ({
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
        radius={100}
        options={{
          strokeWeight: 0,
          fillColor: '#5483EE',
          fillOpacity: 0.4,
          clickable: false,
          visible: showRadius,
        }}
      />
      <OverlayViewF
        position={position}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        <div
          className={cx('marker-name')}
          style={{
            transform: `translate(-50%, ${size / 2}px)`,
          }}
        >
          <span className={cx('text')}>Sinseandea</span>
          <span className={cx('text_clone')}>Sinseandea</span>
        </div>
      </OverlayViewF>
    </MarkerF>
  );
};

export default CustomMarker;
