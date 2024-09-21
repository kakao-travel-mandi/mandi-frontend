import { axiosInstance } from './axiosInstance';

export const getPostCategory = async (
  category: string,
  page: number = 1,
  size: number = 10,
) => {
  try {
    const response = await axiosInstance.get(`/posts/category/${category}`, {
      params: { page, size },
    });
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
export const getPostId = async (postId: string) => {
  try {
    const response = await axiosInstance.get(`/posts/${postId}`);
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
