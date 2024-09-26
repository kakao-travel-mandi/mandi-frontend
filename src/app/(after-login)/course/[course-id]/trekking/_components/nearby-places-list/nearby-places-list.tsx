import classNames from 'classnames/bind';

import { NearbyPoint } from '@/types/course';

import ListItems from './list-item';
import styles from './nearby-places-list.module.scss';

const cx = classNames.bind(styles);

interface NearbyPlacesListProps {
  list: NearbyPoint[] | null;
}

const NearbyPlacesList = ({ list }: NearbyPlacesListProps) => {
  if (list === null) return;
  return (
    <>
      {list.map(point => (
        <ListItems key={point.id} point={point} />
      ))}
    </>
  );
};

export default NearbyPlacesList;
