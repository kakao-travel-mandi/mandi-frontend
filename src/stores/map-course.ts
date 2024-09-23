import { MapCourseDTO, PointDTO } from '@/types/course';
import { create } from 'zustand';

type SelectedItem =
  | {
      type: 'course';
      data: MapCourseDTO;
    }
  | {
      type: 'point';
      data: PointDTO;
    };

type MapCourseStoreType = {
  courses: MapCourseDTO[];
  selectedItem: SelectedItem | null;
  setCourses: (courses: MapCourseDTO[]) => void;
  selectItem: (item: SelectedItem | null) => void;
  resetStore: () => void; // 새로운 초기화 함수
};

export const useMapCourseStore = create<MapCourseStoreType>(set => ({
  courses: [],
  selectedItem: null,
  setCourses: courses => set({ courses }),
  selectItem: item => set({ selectedItem: item }),
  resetStore: () => set({ courses: [], selectedItem: null }),
}));
