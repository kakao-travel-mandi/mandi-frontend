import classNames from 'classnames/bind';

import { NearbyPoint } from '@/types/course';

import styles from './list-item.module.scss';

const cx = classNames.bind(styles);

const BLOCK = 'item';

interface ListItemsProps {
  point: NearbyPoint;
}

const ListItems = ({ point }: ListItemsProps) => (
  <div className={cx(BLOCK)}>
    <h3 className={cx(`${BLOCK}__name`)}>{point.name}</h3>
    <span className={cx(`${BLOCK}__address`)}>{point.address}</span>
  </div>
);

export default ListItems;
