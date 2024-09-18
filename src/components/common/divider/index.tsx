import classNames from 'classnames/bind';

import styles from './divider.module.scss';

const cx = classNames.bind(styles);

const BLOCK = 'divider';

interface DividerProps {
  height?: string;
}

const Divider = ({ height = '0.75rem' }: DividerProps) => {
  return <div className={cx(BLOCK)} style={{ height }} />;
};

export default Divider;
