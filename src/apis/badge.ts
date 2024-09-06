import { axiosInstance } from './axiosInstance';

export const getBadgesAPI = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/badges/${userId}`);
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
