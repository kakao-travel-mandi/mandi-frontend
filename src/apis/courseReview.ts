import { getAccessToken } from '@/utils/auth';

import { axiosInstance } from './axiosInstance';

export const getCourseCompleteReviewAPI = async () => {
  try {
    const response = await axiosInstance.get('/reviews');
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Error: ${response.status}`);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCourseCompleteAPI = async () => {
  const accessToken = getAccessToken();
  try {
    const response = await axiosInstance.get('/courses/completed', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Error: ${response.status}`);
    } ///
  } catch (error) {
    console.log(error);
    throw error;
  }
};
