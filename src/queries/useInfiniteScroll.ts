import { useEffect, useRef } from 'react';

import { UseInfiniteQueryResult } from '@tanstack/react-query';

import useIntersectionObserver from '@/hooks/useIntersectionObserver';

const ioOptions = {
  threshold: 0.8,
  delay: 200,
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

  // console.log(hasNextPage);
  const {
    entries: [entry],
  } = useIntersectionObserver(loadMoreRef, ioOptions);

  const isIntersecting = entry?.isIntersecting;
  // console.log('isIntersecting', isIntersecting);

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, isFetching, fetchNextPage]);

  return {
    loadMoreRef,
    data,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
};

export default useInfiniteScroll;
