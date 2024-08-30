import classNames from 'classnames/bind';

import styles from './StaticsPanel.module.scss';

const BLOCK = 'statics-panel';

const cx = classNames.bind(styles);

// TODO: 아이콘이미지를 받아오는건지? 그리고 api 확인

interface StaticsPanelProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  value: number;
  className?: string;
}

export const StaticsPanel = ({
  icon: Icon,
  title,
  value,
  className,
}: StaticsPanelProps) => {
  return (
    <div className={cx(BLOCK, className)}>
      <div className={cx(`${BLOCK}__icon`)}>
        <Icon />
      </div>
      <div className={cx(`${BLOCK}__title`)}>{title}</div>
      <div className={cx(`${BLOCK}__value`)}>{value}</div>
    </div>
  );
};
