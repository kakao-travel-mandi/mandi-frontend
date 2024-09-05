import {
  GetMyInfoResponse,
  UpdateMyInfoImageResponse,
  UpdateMyInfoResponse,
} from '@/types/response';

import { axiosInstance } from './axiosInstance';
import { UpdateMyInfoImageRequest, UpdateMyInfoRequest } from '@/types/request';

// TODO: 임시.. 토큰 일단 하드코딩..
const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2bmNsZmpxbTEyQGdtYWlsLmNvbSIsInJvbGUiOiJST0xFX1VTRVIiLCJpZCI6MiwiZXhwIjoxNzI1NTU2MTQzfQ.bhqjUaFTQFV_qG2wXz4tg-etHDyPL-FJYKmp1O4dpkS5HTLyKYlQSVonNejagKgRezUEeXUGCsOkR6Jjx6Dl7Q';
const headers = {
  Authorization: `Bearer ${token}`,
};

export const getMyInfoAPI = async (): Promise<GetMyInfoResponse> => {
  try {
    const response = await axiosInstance.get('profile/info', {
      headers,
    });

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
  const response = await axiosInstance.patch(
    'profile/info',
    {
      nickname,
      description,
    },
    {
      headers,
    },
  );
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
  const response = await axiosInstance.patch(
    'profile/img',
    {
      Base64EncodedImage,
    },
    {
      headers,
    },
  );
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.data.error.message);
  }
};
