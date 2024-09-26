import classNames from 'classnames/bind';

import SearchIcon from '@/assets/icon/icon-search-mono.svg';
import { CourseNameDTO } from '@/types/course';

import styles from './autocomplete-list.module.scss';

const cx = classNames.bind(styles);

interface ListItemProps {
  keyword: string;
  text: string;
  onClick: (search: string) => void;
}

const ListItem = ({ keyword, text, onClick }: ListItemProps) => {
  const highlightedText = text.slice(0, keyword.length);
  const restText = text.slice(keyword.length);
  const handleClick = () => onClick(text);

  return (
    <div className={cx('item')} onClick={handleClick}>
      <SearchIcon className={cx('item__icon')}>icon</SearchIcon>
      <span className={cx('item__text')}>
        <span className={cx('item__text--highlight')}>{highlightedText}</span>
        {restText}
      </span>
    </div>
  );
};

interface AutoCompleteListProps {
  keyword: string;
  list: CourseNameDTO[];
  handleClickListItem: (search: string) => void;
}

const AutoCompleteList = ({
  keyword,
  list,
  handleClickListItem,
}: AutoCompleteListProps) => {
  const filteredList = list.filter(item =>
    item.name.toLowerCase().startsWith(keyword.toLowerCase()),
  );

  return (
    <div className={cx('list')}>
      {filteredList.map(item => (
        <ListItem
          key={item.id}
          keyword={keyword}
          text={item.name}
          onClick={handleClickListItem}
        />
      ))}
    </div>
  );
};

export default AutoCompleteList;
