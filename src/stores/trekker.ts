import { Coordinate } from '@/types/course';
import { getDistance } from '@/utils/geolocation';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TrekkerState = 'Running' | 'Paused' | 'Stopped';

type TrekkerStoreType = {
  state: TrekkerState;
  totalDistance: number;
  totalTime: number;
  lastPosition: Coordinate | null;
  lastUpdateTime: number | null;
  resetTracking: () => void;
  startTracking: (position: Coordinate, currentTime: number) => void;
  updateTracking: (position: Coordinate, currentTime: number) => void;
  pauseTracking: (position: Coordinate, currentTime: number) => void;
  resumeTracking: (position: Coordinate, currentTime: number) => void;
};

const calculateUpdates = (
  state: TrekkerStoreType,
  position: Coordinate,
  currentTime: number,
) => {
  const timeDiff = state.lastUpdateTime
    ? (currentTime - state.lastUpdateTime) / 1000
    : 0;
  const distance = state.lastPosition
    ? getDistance(state.lastPosition, position)
    : 0;

  return {
    totalDistance: state.totalDistance + distance,
    totalTime: state.totalTime + timeDiff,
    lastPosition: position,
    lastUpdateTime: currentTime,
  };
};

export const useTrekkerStore = create(
  persist<TrekkerStoreType>(
    set => ({
      state: 'Stopped',
      totalDistance: 0,
      totalTime: 0,
      lastPosition: null,
      lastUpdateTime: null,
      startTracking: (position, currentTime) => {
        set({
          state: 'Running',
          totalDistance: 0,
          totalTime: 0,
          lastPosition: position,
          lastUpdateTime: currentTime,
        });
      },
      updateTracking: (position, currentTime) => {
        set(state => {
          if (state.state !== 'Running') return state;

          return {
            ...state,
            ...calculateUpdates(state, position, currentTime),
          };
        });
      },
      pauseTracking: (position, currentTime) =>
        set(state => {
          if (state.state !== 'Running') return state;

          return {
            ...state,
            state: 'Paused',
            ...calculateUpdates(state, position, currentTime),
          };
        }),
      resumeTracking: (position, currentTime) =>
        set(state => {
          if (state.state !== 'Paused') return state;

          return {
            ...state,
            state: 'Running',
            lastPosition: position,
            lastUpdateTime: currentTime,
          };
        }),
      resetTracking: () =>
        set({
          state: 'Stopped',
          totalDistance: 0,
          totalTime: 0,
          lastPosition: null,
          lastUpdateTime: null,
        }),
    }),
    {
      name: 'trekker-data-storage',
    },
  ),
);
