import { useCallback, useMemo } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { CourseFilters } from '@/stores/course-filters';

const useCourseFiltersWithUrl = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const getFiltersFromUrl = useCallback((): CourseFilters => {
    const sortBy = searchParams.get('sortBy');
    const difficulty = searchParams.getAll('difficulty');
    const stars = searchParams.get('stars');

    return {
      sortBy:
        sortBy === 'asc' || sortBy === 'desc' || sortBy === 'default'
          ? sortBy
          : null,
      difficulty: difficulty.filter(
        (d): d is 'easy' | 'moderate' | 'hard' =>
          d === 'easy' || d === 'moderate' || d === 'hard',
      ),
      stars: stars ? (parseInt(stars) as 1 | 2 | 3 | 4 | 5) || null : null,
    };
  }, [searchParams]);

  const filters = useMemo(() => getFiltersFromUrl(), [getFiltersFromUrl]);

  const updateUrlWithFilters = useCallback(
    (newFilters: CourseFilters) => {
      const queryParams = new URLSearchParams();

      if (
        newFilters.sortBy
        // && newFilters.sortBy !== 'default'
      ) {
        queryParams.set('sortBy', newFilters.sortBy);
      }

      if (newFilters.difficulty && newFilters.difficulty.length > 0) {
        newFilters.difficulty.forEach(diff =>
          queryParams.append('difficulty', diff),
        );
      }

      if (newFilters.stars) {
        queryParams.set('stars', newFilters.stars.toString());
      }

      const newUrl = `/course?${queryParams.toString()}`;
      router.push(newUrl);
    },
    [router],
  );

  return {
    filters,
    updateUrlWithFilters,
  };
};

export default useCourseFiltersWithUrl;
