import classNames from 'classnames/bind';
import styles from './autocomplete-list.module.scss';
import { CourseNameDTO } from '@/types/course';
import SearchIcon from '@/assets/icon/icon-search-mono.svg';

const cx = classNames.bind(styles);

interface ListItemProps {
  keyword: string;
  text: string;
}

const ListItem = ({ keyword, text }: ListItemProps) => {
  const highlightedText = text.slice(0, keyword.length);
  const restText = text.slice(keyword.length);

  return (
    <div className={cx('item')}>
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
}

const AutoCompleteList = ({ keyword, list }: AutoCompleteListProps) => {
  const filteredList = list.filter(item =>
    item.name.toLowerCase().startsWith(keyword.toLowerCase()),
  );

  return (
    <div className={cx('list')}>
      {filteredList.map(item => (
        <ListItem key={item.id} keyword={keyword} text={item.name} />
      ))}
    </div>
  );
};

export default AutoCompleteList;
