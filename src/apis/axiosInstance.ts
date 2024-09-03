import axios from 'axios';
import { redirect } from 'next/navigation';

import { MAX_TIMEOUT_TIME } from '@/constants/api';
import { getAccessToken } from '@/utils/auth';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: MAX_TIMEOUT_TIME,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  config => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
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
    if (error.response && error.response.status === 401) {
      redirect('/');
    }
    return Promise.reject(error);
  },
);
