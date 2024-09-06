import { UpdateMyInfoImageRequest, UpdateMyInfoRequest } from '@/types/request';
import {
  GetMyInfoResponse,
  UpdateMyInfoImageResponse,
  UpdateMyInfoResponse,
} from '@/types/response';

import { axiosInstance } from './axiosInstance';

export const getMyInfoAPI = async (): Promise<GetMyInfoResponse> => {
  try {
    const response = await axiosInstance.get('profile/info');

    if (response.status === 200) {
      return response.data;
    } else throw new Error(response.data);
  } catch (error) {
    throw error;
  }
};

export const updateMyInfoAPI = async (
  request: UpdateMyInfoRequest,
): Promise<UpdateMyInfoResponse> => {
  const { nickname, description } = request;
  const response = await axiosInstance.patch('profile/info', {
    nickname,
    description,
  });
  if (response.status === 200) {
    console.log(response.data);
    return response.data;
  } else {
    throw new Error(response.data.error.message);
  }
};

export const updateMyInfoImageAPI = async (
  request: UpdateMyInfoImageRequest,
): Promise<UpdateMyInfoImageResponse> => {
  const { Base64EncodedImage } = request;
  const response = await axiosInstance.patch('profile/img', {
    Base64EncodedImage,
  });
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.data.error.message);
  }
};
