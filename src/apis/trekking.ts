import { FinishTrekkingRequest, StartTrekkingRequest } from '@/types/request';
import { axiosInstance } from './axiosInstance';

export const startTrekkingAPI = async (
  courseId: number,
  request: StartTrekkingRequest,
) => {
  try {
    const response = await axiosInstance.post(
      `/trekking/${courseId}/start`,
      request,
    );
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.data.error.message);
    }
  } catch (error) {
    throw error;
  }
};

export const finishTrekkingAPI = async (
  courseId: number,
  request: FinishTrekkingRequest,
) => {
  try {
    const response = await axiosInstance.post(
      `/trekking/${courseId}/finish`,
      request,
    );
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.data.error.message);
    }
  } catch (error) {
    throw error;
  }
};
