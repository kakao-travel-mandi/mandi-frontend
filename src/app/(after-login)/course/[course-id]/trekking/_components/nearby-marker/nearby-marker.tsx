import CustomMarker from '@/app/(after-login)/course/_components/custom-marker/custom-marker';
import ConvenienceIcon from '@/assets/colored-icon/Convenience Store.svg';
import HotelIcon from '@/assets/colored-icon/Hotel.svg';
import ParkingIcon from '@/assets/colored-icon/Parking Lot.svg';
import TouristIcon from '@/assets/colored-icon/Tourist Attraction.svg';
import { NearbyPoint } from '@/types/course';
import { NearbyFilter } from '@/types/nearby-filter';
import { coordinateToLatLng } from '@/utils/geolocation';

interface NearbyMarkerProps {
  point: NearbyPoint;
  selected?: boolean;
  onClick: (point: NearbyPoint) => void;
}
type IconType = React.FC<React.SVGProps<SVGSVGElement>>;

const iconMap: Record<NearbyFilter, IconType> = {
  convenience_store: ConvenienceIcon,
  parking_lot: ParkingIcon,
  tourist_attraction: TouristIcon,
  hotel: HotelIcon,
};

const NearbyMarker = ({ point, selected, onClick }: NearbyMarkerProps) => {
  const Icon = iconMap[point.filterName];

  return (
    <CustomMarker
      icon={<Icon />}
      size={selected ? 42 : 32}
      position={coordinateToLatLng(point.coordinate)}
      onClick={() => onClick(point)}
    />
  );
};

export default NearbyMarker;
