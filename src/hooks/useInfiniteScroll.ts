import { useEffect, useRef } from 'react';

import { UseInfiniteQueryResult } from '@tanstack/react-query';

import useIntersectionObserver from '@/hooks/useIntersectionObserver';

const ioOptions = {
  threshold: 0,
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
    observerRef,
  } = useIntersectionObserver(loadMoreRef, ioOptions);

  const isIntersecting = entry?.isIntersecting;
  console.log('isIntersecting', isIntersecting);
  // console.log('data', data);
  useEffect(() => {
    if (isIntersecting) {
      fetchNextPage();
    }
  }, [isIntersecting, fetchNextPage]);

  return {
    loadMoreRef,
    isIntersecting,
    observerRef,
    ...query,
  };
};

export default useInfiniteScroll;
