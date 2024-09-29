import classNames from 'classnames/bind';

import NoResult from '@/app/(after-login)/course/search/_components/no-result/no-result';
import NoListIcon from '@/assets/colored-icon/no-list.svg';
import { NearbyPoint } from '@/types/course';

import ListItems from './list-item';
import styles from './nearby-places-list.module.scss';

const cx = classNames.bind(styles);

interface NearbyPlacesListProps {
  list: NearbyPoint[] | null;
  handleClickItem: (point: NearbyPoint) => void;
}

const NearbyPlacesList = ({ list, handleClickItem }: NearbyPlacesListProps) => {
  if (list === null) return;

  return (
    <>
      {list.length !== 0 ? (
        list.map(point => (
          <ListItems key={point.id} point={point} onClick={handleClickItem} />
        ))
      ) : (
        <div className={cx('no-result')}>
          <NoResult
            title='No results found'
            desc='It is not within a 1km radius.'
            icon={NoListIcon}
          />
        </div>
      )}
    </>
  );
};

export default NearbyPlacesList;
