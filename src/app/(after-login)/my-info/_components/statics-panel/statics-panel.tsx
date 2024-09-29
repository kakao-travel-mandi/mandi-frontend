import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';

import styles from './statics-panel.module.scss';

const BLOCK = 'statics-panel';

const cx = classNames.bind(styles);

interface StaticsPanelProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  value: number;
  route: string;
  className?: string;
}

export const StaticsPanel = ({
  icon: Icon,
  title,
  value,
  route,
  className,
}: StaticsPanelProps) => {
  const router = useRouter();
  const handleClick = () => router.push(route);
  return (
    <div className={cx(BLOCK, className)} onClick={handleClick}>
      <div className={cx(`${BLOCK}__icon`)}>
        <Icon />
      </div>
      <div className={cx(`${BLOCK}__title`)}>{title}</div>
      <div className={cx(`${BLOCK}__value`)}>{value}</div>
    </div>
  );
};
