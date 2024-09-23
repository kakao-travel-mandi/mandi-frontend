import styles from './view-switch-button.module.scss';
import classNames from 'classnames/bind';
import ListIcon from '@/assets/icon/icon-list-bullet.svg';
import MapIcon from '@/assets/icon/icon-map.svg';

const cx = classNames.bind(styles);

interface ViewSwitchButtonProps {
  layout: 'list' | 'map';
  visible?: boolean;
  className?: string;
  onClick: () => void;
}

const ViewSwitchButton = ({
  layout,
  visible = true,
  className,
  onClick,
}: ViewSwitchButtonProps) => {
  return (
    visible && (
      <button
        className={cx(
          'layout-button',
          {
            'layout-button--white': layout === 'map',
            'layout-button--green': layout === 'list',
          },
          className,
        )}
        onClick={onClick}
      >
        {layout === 'list' && <MapIcon className={cx('layout-button__icon')} />}
        {layout === 'map' && <ListIcon className={cx('layout-button__icon')} />}
        <span>{layout === 'list' ? 'Maps' : 'List'}</span>
      </button>
    )
  );
};

export default ViewSwitchButton;
