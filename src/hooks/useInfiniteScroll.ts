import { useEffect, useRef } from 'react';

import { UseInfiniteQueryResult } from '@tanstack/react-query';

import useIntersectionObserver from '@/hooks/useIntersectionObserver';

const ioOptions = {
  threshold: 1,
  delay: 0,
};

const useInfiniteScroll = <TData, TError>(
  query: UseInfiniteQueryResult<TData, TError>,
) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isFetching,
  } = query;
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const {
    entries: [entry],
  } = useIntersectionObserver(loadMoreRef, ioOptions);

  const isIntersecting = entry?.isIntersecting;
  console.log('isIntersecting', isIntersecting);
  useEffect(() => {
    if (isIntersecting) {
      fetchNextPage();
    }
  }, [isIntersecting]);

  return {
    loadMoreRef,
    data,
    hasNextPage,
    isFetchingNextPage,
    status,
    isFetching,
  };
};

export default useInfiniteScroll;
