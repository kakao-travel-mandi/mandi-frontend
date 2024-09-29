import { setCookie } from 'cookies-next';

import {
  DifficultyType,
  SortByType,
  StarsType,
  difficultyMap,
  distanceMap,
  starsMap,
} from '@/stores/course-filters';
import { CourseDTO } from '@/types/course';

const difficultyOrder: DifficultyType[] = ['easy', 'moderate', 'hard'];

export const formatDifficulty = (difficulties: DifficultyType[]): string => {
  if (difficulties.length === 0) return 'Difficulty';
  if (difficulties.length === 3)
    return `${difficultyMap[difficultyOrder[0]]}, ${difficultyMap[difficultyOrder[1]]}, ...`;
  return difficultyOrder
    .filter(d => difficulties.includes(d))
    .map(d => difficultyMap[d])
    .join(', ');
};

export const formatDistance = (sortBy: SortByType) => {
  if (sortBy === null) return 'Distance';
  return distanceMap[sortBy];
};

export const formatRating = (stars: StarsType) => {
  if (stars === null) return 'Rating';
  return starsMap[stars];
};

export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy':
      return 'green';
    case 'Moderate':
      return 'orange';
    case 'Hard':
      return 'red';
    default:
      return 'gray';
  }
};

export const getDifficultyNumber = (difficulty: string) => {
  switch (difficulty) {
    case 'easy':
      return 1;
    case 'moderate':
      return 2;
    case 'hard':
      return 3;
    default:
      return 0;
  }
};

export const setTrekkingIdCookie = (id: number) => {
  const convertedId = id.toString();
  setCookie('trekkingId', id);
};