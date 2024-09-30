import { axiosInstance } from './axiosInstance';

export const deleteCommentLike = async (commentId: string) => {
  try {
    const response = await axiosInstance.delete(`/comments/${commentId}/like`);
    console.log('comment like deleted:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting comment like:', error);
    throw error;
  }
};
export const postCommentLike = async (commentId: string) => {
  try {
    const response = await axiosInstance.post(`/comments/${commentId}/like`);
    console.log('comment like added:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error comment like:', error);
    throw error;
  }
};
export const postCommentAdd = async (
  commentId: string,
  parentCommentId: number | null,
  content: string,
) => {
  try {
    const response = await axiosInstance.post(`/comments/${commentId}`, {
      parentCommentId,
      content,
    });
    console.log('Comment added:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    const response = await axiosInstance.delete(`/comments/${commentId}`);
    console.log('comment deleted:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};
