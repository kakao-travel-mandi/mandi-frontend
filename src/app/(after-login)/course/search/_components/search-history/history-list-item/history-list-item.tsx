import styles from './history-list-item.module.scss';
import classNames from 'classnames/bind';
import TimeIcon from '@/assets/icon/icon-clock.svg';
import DeleteIcon from '@/assets/icon/icon-x.svg';
import { SyntheticEvent } from 'react';

const cx = classNames.bind(styles);

interface HistoryListItemProps {
  icon: React.ReactElement;
  text: string;
  onClickDelete?: (search: string) => void;
  onClickListItem?: (search: string) => void;
}

const HistoryListItem = ({
  icon: Icon,
  text,
  onClickListItem,
  onClickDelete,
}: HistoryListItemProps) => {
  const handleClick = () => onClickListItem?.(text);
  const handleClickDelete = (e:SyntheticEvent) => {
    e.stopPropagation();
    onClickDelete?.(text);
  };
  return (
    <div className={cx('list-item')} onClick={handleClick}>
      <TimeIcon className={cx('list-item__icon')} />
      <span className={cx('list-item__text')}>{text}</span>
      <button
        className={cx('list-item__delete-button')}
        onClick={handleClickDelete}
      >
        <DeleteIcon className={cx('list-item__icon')} />
      </button>
    </div>
  );
};

export default HistoryListItem;
