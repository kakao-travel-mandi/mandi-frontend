import { useMutation, useQuery } from '@tanstack/react-query';

import { getAuthId, loginAPI, signupAPI } from '@/apis/auth';
import { LoginRequest, SignupRequest } from '@/types/request';
import { LoginResponse, SignupResponse } from '@/types/response';

export const useLoginMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: LoginResponse) => void;
  onError: (error: number) => void;
}) => {
  return useMutation<LoginResponse, number, LoginRequest>({
    mutationKey: ['login'],
    mutationFn: (request: LoginRequest) => loginAPI(request),
    onSuccess: (data: LoginResponse) => {
      onSuccess(data);
    },
    onError: (error: number) => {
      onError(error);
    },
  });
};

export const useSignupMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error: number) => void;
}) => {
  return useMutation<SignupResponse, number, SignupRequest>({
    mutationKey: ['signup'],
    mutationFn: (request: SignupRequest) => signupAPI(request),
    onSuccess,
    onError: (error: number) => {
      onError(error);
    },
  });
};

export const useGetAuthId = () => {
  return useQuery({
    queryKey: ['auth-id'],
    queryFn: () => getAuthId(),
  });
};
