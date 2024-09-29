import { create } from 'zustand';

import { GetCoursesRequest } from '@/types/request';
import { getDifficultyNumber } from '@/utils/course';

export type DifficultyType = 'easy' | 'moderate' | 'hard';
export type SortByType = 'asc' | 'desc' | null;
export type StarsType = 1 | 2 | 3 | 4 | 5 | null;

export type CourseFilters = {
  sortBy: SortByType;
  difficulty: DifficultyType[];
  stars: StarsType;
};

type CourseFiltersStoreType = {
  filters: CourseFilters;
  setFilters: (filters: CourseFilters) => void;
  setSortBy: (sortBy: SortByType) => void;
  setDifficulty: (difficulty: DifficultyType) => void;
  setStars: (stars: StarsType) => void;
};

const initialFilters: CourseFilters = {
  sortBy: null,
  difficulty: [],
  stars: null,
};

export const useCourseFiltersStore = create<CourseFiltersStoreType>(set => ({
  filters: initialFilters,
  setFilters: filters => set({ filters }),
  setSortBy: sortBy =>
    set(state => ({ filters: { ...state.filters, sortBy } })),
  setStars: stars => set(state => ({ filters: { ...state.filters, stars } })),
  setDifficulty: difficulty => {
    set(state => {
      const newDifficulty = state.filters.difficulty.includes(difficulty)
        ? state.filters.difficulty.filter(d => d !== difficulty)
        : [...state.filters.difficulty, difficulty];
      return { filters: { ...state.filters, difficulty: newDifficulty } };
    });
  },
}));

// 실제 UI에서 표시할 이름
export const filterNamesMap = {
  sortBy: 'Distance',
  difficulty: 'Difficulty',
  stars: 'Stars',
};
export const distanceMap = {
  desc: 'High to Low',
  asc: 'Low to High',
};
export const difficultyMap: Record<DifficultyType, string> = {
  easy: 'Easy',
  moderate: 'Moderate',
  hard: 'Hard',
};
export const starsMap = {
  5: '5 stars',
  4: '4 or more',
  3: '3 or more',
  2: '2 or more',
  1: '1 or more',
};

export const formatCourseFilterParams = (
  filters: CourseFilters,
): Pick<GetCoursesRequest, 'orderByDirection' | 'rating' | 'levels'> => {
  const { sortBy, difficulty, stars } = filters;
  const levels = difficulty
    .map(d => getDifficultyNumber(d))
    .sort((a, b) => a - b);
  return {
    orderByDirection:
      sortBy !== null ? (sortBy.toUpperCase() as 'ASC' | 'DESC') : undefined,
    rating:
      stars !== null
        ? (stars.toString() as '1' | '2' | '3' | '4' | '5')
        : undefined,
    levels: levels.length > 0 ? levels.join(',') : undefined,
  };
};
