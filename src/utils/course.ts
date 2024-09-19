import {
  DifficultyType,
  SortByType,
  StarsType,
  difficultyMap,
  distanceMap,
  starsMap,
} from '@/stores/course-filters';

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
