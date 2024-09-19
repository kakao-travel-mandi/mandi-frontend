// TODO: 필요 없을 수 있음...

import { create } from 'zustand';

export type DifficultyType = 'easy' | 'moderate' | 'hard';
export type SortByType = 'asc' | 'desc' | 'default' | null;
export type StarsType = 1 | 2 | 3 | 4 | 5 | null;

export type CourseFilters = {
  sortBy: SortByType;
  difficulty: DifficultyType[];
  stars: StarsType;
};

type CourseFiltersStoreType = {
  filters: CourseFilters;
  setFilters: (filters: CourseFilters) => void;
  setSortBy: (sortBy: 'asc' | 'desc' | 'default' | null) => void;
  setDifficulty: (difficulty: 'easy' | 'moderate' | 'hard') => void;
  setStars: (stars: (1 | 2 | 3 | 4 | 5) | null) => void;
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
  default: 'Default',
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
