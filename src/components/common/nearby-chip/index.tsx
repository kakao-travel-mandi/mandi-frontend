import styles from './index.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
const BLOCK = 'nearby-chip';

interface NearbyChipProps {
  id: string;
  text: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  selected: boolean;
  onClick: (id: string) => void;
}

const NearbyChip = ({
  id,
  icon: Icon,
  text,
  selected,
  onClick,
}: NearbyChipProps) => {
  return (
    <div
      className={cx(BLOCK, {
        [`${BLOCK}--selected`]: selected,
      })}
      onClick={() => onClick(id)}
    >
      <Icon className={cx(`${BLOCK}__icon`)} />
      <span className={cx(`${BLOCK}__text`)}>{text}</span>
    </div>
  );
};

export default NearbyChip;
