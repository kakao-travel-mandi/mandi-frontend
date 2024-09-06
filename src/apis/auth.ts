import { LoginRequest, SignupRequest } from '@/types/request';
import { setAccessToken, setRefreshToken } from '@/utils/auth';

import { axiosInstance } from './axiosInstance';

export const loginAPI = async (request: LoginRequest) => {
  const { token } = request;

  const response = await axiosInstance.post(`/auth/google/login`, null, {
    headers: {
      'Content-Type': 'application/json',
      Google: token,
    },
  });

  if (response.status === 200) {
    setAccessToken(response.data.response.accessToken);
    setRefreshToken(response.data.response.refreshToken);

    return response.data;
  } else {
    throw response.status;
  }
};

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
    setAccessToken(response.data.response.accessToken);
    setRefreshToken(response.data.response.refreshToken);

    return response.data;
  } else {
    throw new Error(response.data.error.message);
  }
};
