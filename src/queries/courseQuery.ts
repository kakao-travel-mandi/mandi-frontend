import {
  getCoursesAPI,
  getGPXDataAPI,
  getNearbyCoursesAPI,
} from '@/apis/course';
import { GetCoursesRequest, GetNearbyCoursesRequest } from '@/types/request';
import { GetCoursesResponse, GetNearbyCoursesResponse } from '@/types/response';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useCoursesQuery = (params: GetCoursesRequest) => {
  return useInfiniteQuery<GetCoursesResponse, AxiosError>({
    queryKey: ['courses', params],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => {
      return getCoursesAPI({
        ...params,
        page: typeof pageParam === 'number' ? pageParam.toString() : '1',
      });
    },
    getNextPageParam: lastPage => {
      const { currentPage, totalPages } = lastPage.response.pageInfo;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });
};

export const useNearbyCoursesMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: GetNearbyCoursesResponse) => void;
  onError: (error: AxiosError) => void;
}) => {
  return useMutation<
    GetNearbyCoursesResponse,
    AxiosError,
    GetNearbyCoursesRequest
  >({
    mutationKey: ['nearby-courses'],
    mutationFn: (request: GetNearbyCoursesRequest) =>
      getNearbyCoursesAPI(request),
    onSuccess: data => {
      onSuccess(data);
    },
    onError: (error: AxiosError) => {
      onError(error);
    },
  });
};

export const useGPXQuery = (gpxUrl: string) => {
  return useQuery<string, AxiosError>({
    queryKey: ['gpx', gpxUrl],
    queryFn: () => getGPXDataAPI(gpxUrl),
  });
};
