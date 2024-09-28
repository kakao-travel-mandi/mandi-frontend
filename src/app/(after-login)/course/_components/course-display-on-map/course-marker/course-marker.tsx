import { MarkerF, OverlayView, OverlayViewF } from '@react-google-maps/api';
import classNames from 'classnames/bind';
import { renderToString } from 'react-dom/server';

import CourseIcon from '@/assets/colored-icon/Surrounding Course.svg';

import styles from './course-marker.module.scss';

const cx = classNames.bind(styles);

interface CourseMarkerProps {
  name: string;
  position: google.maps.LatLng;
  size?: number;
  onClick?: () => void;
}

export const CourseMarker = ({
  name,
  position,
  size = 36,
  onClick,
}: CourseMarkerProps) => {
  const courseicon = <CourseIcon />;
  return (
    <>
      <MarkerF
        position={position}
        icon={{
          url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
            renderToString(courseicon),
          )}`,
          scaledSize: new window.google.maps.Size(size, size),
          anchor: new window.google.maps.Point(size / 2, size / 2),
        }}
        onClick={onClick}
      />
      <OverlayViewF
        position={position}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        <div
          className={cx('marker-name')}
          style={{
            transform: `translateY(${size / 3}px)`,
          }}
          onClick={onClick}
        >
          <span className={cx('text')}>{name}</span>
          <span className={cx('text_clone')}>{name}</span>
        </div>
      </OverlayViewF>
    </>
  );
};
