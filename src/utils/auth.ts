import { setCookie, getCookie } from 'cookies-next';

export const setAccessToken = (token: string) => {
  setCookie('accessToken', token);
};

export const setRefreshToken = (token: string) => {
  setCookie('refreshToken', token);
};

export const getAccessToken = () => {
  return getCookie('accessToken');
};

export const getRefreshToken = () => {
  return getCookie('refreshToken');
};
