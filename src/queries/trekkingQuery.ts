import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { finishTrekkingAPI, startTrekkingAPI } from '@/apis/trekking';
import { FinishTrekkingRequest, StartTrekkingRequest } from '@/types/request';
import {
  FinishTrekkingResponse,
  StartTrekkingResponse,
} from '@/types/response';

export const useStartTrekkingMutation = (
  courseId: number,
  {
    onSuccess,
    onError,
  }: {
    onSuccess: (data: StartTrekkingResponse) => void;
    onError: (error: AxiosError) => void;
  },
) => {
  return useMutation<StartTrekkingResponse, AxiosError, StartTrekkingRequest>({
    mutationKey: ['start-trekking', courseId],
    mutationFn: (request: StartTrekkingRequest) =>
      startTrekkingAPI(courseId, request),
    onSuccess,
    onError: (error: AxiosError) => {
      onError(error);
    },
  });
};

export const useFinishTrekkingMutation = (
  couseId: number,
  {
    onSuccess,
    onError,
  }: {
    onSuccess: (
      data: FinishTrekkingResponse,
      variables: FinishTrekkingRequest,
    ) => void;
    onError: (error: AxiosError) => void;
  },
) => {
  return useMutation<FinishTrekkingResponse, AxiosError, FinishTrekkingRequest>(
    {
      mutationKey: ['finish-trekking', couseId],
      mutationFn: (request: FinishTrekkingRequest) =>
        finishTrekkingAPI(couseId, request),
      onSuccess: (data, variables) => {
        onSuccess(data, variables);
      },
      onError: (error: AxiosError) => {
        onError(error);
      },
    },
  );
};
