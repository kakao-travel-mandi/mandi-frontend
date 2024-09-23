import styles from './course-filter.module.scss';
import classNames from 'classnames/bind';

import Chip from '@/components/common/chip';
import { formatDifficulty, formatDistance, formatRating } from '@/utils/course';
import { CourseFilters } from '@/stores/course-filters';

const cx = classNames.bind(styles);

const BLOCK = 'filters';

interface CourseFilterProps {
  filters: CourseFilters;
  handleClickFilter: () => void;
}

const CourseFilter = ({ filters, handleClickFilter }: CourseFilterProps) => {
  return (
    <div className={cx(BLOCK)}>
      <Chip
        action={true}
        onClick={handleClickFilter}
        selected={filters.sortBy !== null}
      >
        {formatDistance(filters.sortBy)}
      </Chip>
      <Chip
        action={true}
        onClick={handleClickFilter}
        selected={filters.difficulty.length > 0}
      >
        {formatDifficulty(filters.difficulty)}
      </Chip>
      <Chip
        action={true}
        onClick={handleClickFilter}
        selected={filters.stars !== null}
      >
        {formatRating(filters.stars)}
      </Chip>
    </div>
  );
};

export default CourseFilter;
