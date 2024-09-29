import { setCookie, getCookie, deleteCookie } from 'cookies-next';

export const setAccessToken = (token: string) => {
  setCookie('accessToken', token);
};

export const deleteAccessToken = () => {
  deleteCookie('accessToken');
};

export const setRefreshToken = (token: string) => {
  setCookie('refreshToken', token);
};

export const deleteRefreshToken = () => {
  deleteCookie('refreshToken');
};

export const getAccessToken = () => {
  return getCookie('accessToken');
};

export const getRefreshToken = () => {
  return getCookie('refreshToken');
};
