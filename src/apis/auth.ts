import { LoginRequest, SignupRequest } from '@/types/request';

import { axiosInstance } from './axiosInstance';

export const signupAPI = async (request: SignupRequest) => {
  const { token, nickname, description } = request;

  const response = await axiosInstance.post(
    `/auth/google/signup`,
    {
      nickname,
      description,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Google: token,
      },
    },
  );

  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.data.error.message);
  }
};

export const loginAPI = async (request: LoginRequest) => {
  const { token } = request;

  const response = await axiosInstance.post(`/auth/google/login`, null, {
    headers: {
      'Content-Type': 'application/json',
      Google: token,
    },
  });

  if (response.status === 200) {
    return response.data;
  } else {
    throw response.status;
  }
};
