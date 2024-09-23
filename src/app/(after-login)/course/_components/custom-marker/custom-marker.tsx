import { MarkerF } from '@react-google-maps/api';
import { renderToString } from 'react-dom/server';

interface CustomMarkerProps {
  icon: JSX.Element;
  position: google.maps.LatLng;
  size?:
    | number
    | {
        width: number;
        height: number;
      };

  anchor?: boolean;
  onClick?: () => void;
}

const CustomMarker = ({
  icon,
  position,
  size = 32,
  anchor = false,
  onClick,
}: CustomMarkerProps) => {
  const width = typeof size === 'number' ? size : size.width;
  const height = typeof size === 'number' ? size : size.height;
  return (
    <MarkerF
      position={position}
      onClick={onClick}
      icon={{
        url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
          renderToString(icon),
        )}`,
        scaledSize: new window.google.maps.Size(width, height),
        anchor: anchor
          ? new window.google.maps.Point(width / 2, width)
          : new window.google.maps.Point(width / 2, height / 2),
      }}
    />
  );
};

export default CustomMarker;
