import { GetMyInfoResponse } from '@/types/response';

import { axiosInstance } from './axiosInstance';

export const getMyInfoAPI = async (): Promise<GetMyInfoResponse> => {
  try {
    const response = await axiosInstance.get('/my-info');

    if (response.status === 200) {
      return response.data;
    } else throw new Error(response.data);
  } catch (error) {
    throw error;
  }
};
