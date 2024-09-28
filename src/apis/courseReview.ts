import { axiosInstance } from './axiosInstance';

export const getCourseCompleteReviewAPI = async () => {
  try {
    const response = await axiosInstance.get('/courses/completed/reviews');
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
  try {
    const response = await axiosInstance.get('/courses/completed');
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
