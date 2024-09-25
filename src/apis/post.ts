import { PostsCreateRequest } from '@/types/request';

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
export const postPostsCreate = async (request: PostsCreateRequest) => {
  try {
    const response = await axiosInstance.post('/posts/create', request);

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
export const deletePostLike = async (postId: string) => {
  try {
    const response = await axiosInstance.delete(`/posts/${postId}/like`);
    console.log('Post like deleted:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting post like:', error);
    throw error;
  }
};
export const postPostLike = async (postId: string) => {
  try {
    const response = await axiosInstance.post(`/posts/${postId}/like`);
    console.log('Post like added:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error post like:', error);
    throw error;
  }
};
