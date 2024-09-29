import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const MAX_HISTORY_LENGTH = 30;

type CourseSearchHistoryStoreType = {
  history: string[];
  addSearch: (search: string) => void;
  deleteSearch: (search: string) => void;
  clearHistory: () => void;
};

export const useCourseSearchHistoryStore = create(
  persist<CourseSearchHistoryStoreType>(
    set => ({
      history: [],
      addSearch: search => {
        set(state => {
          const filteredHistory = state.history.filter(h => h !== search);
          const newHistory = [search, ...filteredHistory];
          const trimmedHistory = newHistory.slice(0, MAX_HISTORY_LENGTH);
          return { history: trimmedHistory };
        });
      },
      deleteSearch: search => {
        set(state => {
          return {
            history: state.history.filter(h => h !== search),
          };
        });
      },
      clearHistory: () => {
        set({
          history: [],
        });
      },
    }),
    {
      name: 'course-search-history',
    },
  ),
);
