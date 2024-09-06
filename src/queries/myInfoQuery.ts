import {  useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import {
  getMyInfoAPI,
  updateMyInfoAPI,
  updateMyInfoImageAPI,
} from '@/apis/myInfo';
import { UpdateMyInfoImageRequest, UpdateMyInfoRequest } from '@/types/request';
import {
  UpdateMyInfoImageResponse,
  UpdateMyInfoResponse,
} from '@/types/response';

export const useMyInfoQuery = () => {
  return useQuery({
    queryKey: ['my-info'],
    queryFn: () => getMyInfoAPI(),
  });
};

export const useMyInfoMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error: AxiosError) => void;
}) => {
  return useMutation<UpdateMyInfoResponse, AxiosError, UpdateMyInfoRequest>({
    mutationKey: ['update-my-info'],
    mutationFn: (request: UpdateMyInfoRequest) => updateMyInfoAPI(request),
    onSuccess,
    onError: (error: AxiosError) => {
      onError(error);
    },
  });
};

export const useMyInfoImageMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error: AxiosError) => void;
}) => {
  return useMutation<
    UpdateMyInfoImageResponse,
    AxiosError,
    UpdateMyInfoImageRequest
  >({
    mutationKey: ['update-my-info-image'],
    mutationFn: (request: UpdateMyInfoImageRequest) =>
      updateMyInfoImageAPI(request),
    onSuccess,
    onError: (error: AxiosError) => {
      onError(error);
    },
  });
};
