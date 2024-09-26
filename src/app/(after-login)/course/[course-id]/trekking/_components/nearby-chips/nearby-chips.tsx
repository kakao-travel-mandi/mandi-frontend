import { Dispatch, SetStateAction } from 'react';

import classNames from 'classnames/bind';

import ConvenienceIcon from '@/assets/icon/Convenience Store.svg';
import ParkingIcon from '@/assets/icon/Parking Lot.svg';
import TouristIcon from '@/assets/icon/Tourist Attraction.svg';
import HotelIcon from '@/assets/icon/icon-building-mono.svg';
import NearbyChip from '@/components/common/nearby-chip';
import { NearbyFilter } from '@/types/nearby-filter';

import styles from './nearby-chips.module.scss';

const cx = classNames.bind(styles);

interface NearbyChipsProps {
  className?: string;
  onClickNearbyChip?: (id: NearbyFilter, category: string[]) => void;
  selectedNearby?: NearbyFilter | null;
}
type ChipData = {
  id: NearbyFilter;
  text: string;
  category: string[];
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
};
const chipsData: ChipData[] = [
  {
    id: 'convenience_store',
    text: 'Convenience Store',
    category: ['convenience_store'],
    icon: ConvenienceIcon,
  },
  {
    id: 'parking_lot',
    text: 'Parking Lot',
    category: ['parking'],
    icon: ParkingIcon,
  },
  {
    id: 'tourist_attraction',
    text: 'Tourist Attraction',
    category: ['tourist_attraction'],
    icon: TouristIcon,
  },
  {
    id: 'hotel',
    text: 'Hotel',
    category: ['hotel'],
    icon: HotelIcon,
  },
];
const NearbyChips = ({
  className,
  onClickNearbyChip,
  selectedNearby,
}: NearbyChipsProps) => {
  const handleClick = (id: NearbyFilter, category: string[]) => {
    onClickNearbyChip?.(id, category);
  };
  return (
    <div className={cx('chips', className)}>
      {chipsData.map(({ id, text, icon, category }) => {
        const selected = selectedNearby === id;
        // console.log('id', id);
        // console.log('selectedNearby', selectedNearby);
        // console.log('selected', selected);
        return (
          <NearbyChip
            key={id}
            id={id}
            text={text}
            category={category}
            onClick={handleClick}
            selected={selected}
            icon={icon}
          />
        );
      })}
    </div>
  );
};

export default NearbyChips;
