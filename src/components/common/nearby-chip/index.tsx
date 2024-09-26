import classNames from 'classnames/bind';

import { NearbyFilter } from '@/types/nearby-filter';

import styles from './index.module.scss';

const cx = classNames.bind(styles);
const BLOCK = 'nearby-chip';

interface NearbyChipProps {
  id: NearbyFilter;
  text: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  category: string[];
  selected?: boolean;

  onClick: (id: NearbyFilter, category: string[]) => void;
}

const NearbyChip = ({
  id,
  icon: Icon,
  text,
  category,
  selected = false,
  onClick,
}: NearbyChipProps) => {
  return (
    <div
      className={cx(BLOCK, {
        [`${BLOCK}--selected`]: selected,
      })}
      onClick={() => onClick(id, category)}
    >
      <Icon className={cx(`${BLOCK}__icon`)} />
      <span className={cx(`${BLOCK}__text`)}>{text}</span>
    </div>
  );
};

export default NearbyChip;
