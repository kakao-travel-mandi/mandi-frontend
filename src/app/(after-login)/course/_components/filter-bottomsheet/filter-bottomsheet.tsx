import classNames from 'classnames/bind';

import BottomSheet from '@/components/common/bottomsheet';
import Button from '@/components/common/button';
import Chip from '@/components/common/chip';
import useCourseFiltersWithUrl from '@/hooks/useCourseFiltersWithUrl';
import {
  difficultyMap,
  distanceMap,
  starsMap,
  useCourseFiltersStore,
} from '@/stores/course-filters';

import styles from './filter-bottomsheet.module.scss';

const cx = classNames.bind(styles);

const BLOCK = 'filter-container';

interface FilterBottomsheetProps {
  isOpen: boolean;
  handleClose: () => void;
}

const FilterBottomsheet = ({ isOpen, handleClose }: FilterBottomsheetProps) => {
  const { filters, setSortBy, setStars, setDifficulty } =
    useCourseFiltersStore();
  const { updateUrlWithFilters } = useCourseFiltersWithUrl();
  const handleClick = () => {
    updateUrlWithFilters(filters);
    handleClose();
  };
  const handleDistanceChange = (selected: boolean, key: string) => {
    setSortBy(selected ? (key as 'asc' | 'desc') : null);
  };
  const handleDifficultyChange = (selected: boolean, key: string) => {
    setDifficulty(key as 'easy' | 'moderate' | 'hard');
  };
  const handleStarsChange = (selected: boolean, key: string) => {
    setStars(selected ? (Number(key) as 1 | 2 | 3 | 4 | 5) : null);
  };
  return (
    <BottomSheet isOpen={isOpen} onClose={handleClose}>
      <div className={cx(BLOCK)}>
        <div className={cx(`${BLOCK}__section`)}>
          <h3 className={cx(`${BLOCK}__section__name`)}>Distance</h3>
          <div className={cx(`${BLOCK}__section__filter-list`)}>
            {Object.entries(distanceMap).map(([key, value]) => (
              <Chip
                id={key}
                key={key}
                selected={filters.sortBy === key}
                onChanges={handleDistanceChange}
              >
                {value}
              </Chip>
            ))}
          </div>
        </div>
        <div className={cx(`${BLOCK}__section`)}>
          <h3 className={cx(`${BLOCK}__section__name`)}>Difficulty</h3>
          <div className={cx(`${BLOCK}__section__filter-list`)}>
            {Object.entries(difficultyMap).map(([key, value]) => (
              <Chip
                id={key}
                key={key}
                selected={filters.difficulty?.includes(
                  key as 'easy' | 'moderate' | 'hard',
                )}
                onChanges={handleDifficultyChange}
              >
                {value}
              </Chip>
            ))}
          </div>
        </div>
        <div className={cx(`${BLOCK}__section`)}>
          <h3 className={cx(`${BLOCK}__section__name`)}>Stars</h3>
          <div className={cx(`${BLOCK}__section__filter-list`)}>
            {Object.entries(starsMap)
              .reverse()
              .map(([key, value]) => (
                <Chip
                  id={key}
                  key={key}
                  selected={filters.stars === Number(key)}
                  onChanges={handleStarsChange}
                >
                  {value}
                </Chip>
              ))}
          </div>
        </div>
        <Button color='darkgray' size='full' onClick={handleClick}>
          Settings complete
        </Button>
      </div>
    </BottomSheet>
  );
};

export default FilterBottomsheet;
