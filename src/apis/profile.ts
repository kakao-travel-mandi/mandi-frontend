import { CheckNicknameRequest } from '@/types/request';

import { axiosInstance } from './axiosInstance';

export const checkNicknameAPI = async (request: CheckNicknameRequest) => {
  const { nickname } = request;

  try {
    const response = await axiosInstance.post(`/profile/check-nickname`, {
      nickname,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw response.status;
    }
  } catch (error) {
    throw error;
  }
};
