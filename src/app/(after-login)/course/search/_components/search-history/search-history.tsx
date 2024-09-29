import classNames from 'classnames/bind';

import TimeIcon from '@/assets/icon/icon-clock.svg';
import { useCourseSearchHistoryStore } from '@/stores/course-search-history';

import HistoryListItem from './history-list-item/history-list-item';
import styles from './search-history.module.scss';

const cx = classNames.bind(styles);

const BLOCK = 'search-history';
interface SearchHistoryProps {
  handleClickListItem: (search: string) => void;
}

const SearchHistory = ({ handleClickListItem }: SearchHistoryProps) => {
  const { history, deleteSearch, clearHistory } = useCourseSearchHistoryStore();
  // const handleClickListItem = (search: string) => addSearch(search);
  const handleClickDelete = (search: string) => deleteSearch(search);
  const handleClickClear = () => clearHistory();

  return (
    <div className={cx(BLOCK)}>
      <div className={cx(`${BLOCK}__header`)}>
        <h3 className={cx(`${BLOCK}__header__title`)}>Search History</h3>
        <button
          className={cx(`${BLOCK}__header__clear-button`)}
          onClick={handleClickClear}
        >
          clear
        </button>
      </div>
      {history.map(search => (
        <HistoryListItem
          key={search}
          icon={<TimeIcon />}
          text={search}
          onClickListItem={handleClickListItem}
          onClickDelete={handleClickDelete}
        />
      ))}
    </div>
  );
};

export default SearchHistory;
