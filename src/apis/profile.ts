import { CheckNicknameRequest } from '@/types/request';

import { axiosInstance } from './axiosInstance';

export const checkNicknameAPI = async (request: CheckNicknameRequest) => {
  const { nickname } = request;

  const response = await axiosInstance.post(`/profile/check-nickname`, {
    nickname,
  });

  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.data.error.message);
  }
};
