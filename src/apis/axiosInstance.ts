import axios from 'axios';
import { signOut } from 'next-auth/react';

import { MAX_TIMEOUT_TIME, NO_AUTH_ENDPOINTS } from '@/constants/api';
import { getAccessToken, setAccessToken, setRefreshToken } from '@/utils/auth';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: MAX_TIMEOUT_TIME,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const weatherInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WEATHER_API_URL,
  timeout: MAX_TIMEOUT_TIME,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  request => {
    const accessToken = getAccessToken();

    const isNoAuthEndpoint = NO_AUTH_ENDPOINTS.includes(request.url ?? '');

    if (accessToken && !isNoAuthEndpoint) {
      request.headers.Authorization = `Bearer ${accessToken}`;
    }

    return request;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      setAccessToken('');
      setRefreshToken('');
      signOut({
        redirect: true,
        callbackUrl: '/',
      });
    }
    return Promise.reject(error);
  },
);
