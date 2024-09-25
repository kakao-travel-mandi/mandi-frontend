import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';

import {
  getPostCategory,
  postPostsCreate,
  deletePostLike,
  postPostLike,
} from '@/apis/post';
import { PostsCreateRequest } from '@/types/request';
import { PostsCategoryResponse } from '@/types/response';

export const usePostCategoryMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: PostsCategoryResponse) => void;
  onError: (error: Error) => void;
}) => {
  return useMutation<PostsCategoryResponse, Error, string>({
    mutationKey: ['postsCategory'],
    mutationFn: (category: string) => getPostCategory(category),
    onSuccess,
    onError,
    retry: 2,
    onSettled: (data, error) => {
      console.log('Mutation settled', { data, error });
    },
  }) as UseMutationResult<PostsCategoryResponse, Error, string>;
};
export const useCreatePostMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: any) => void;
  onError: (error: Error) => void;
}) => {
  return useMutation({
    mutationFn: (request: PostsCreateRequest) => postPostsCreate(request),
    onSuccess, // 성공 시 호출될 함수
    onError, // 실패 시 호출될 함수
    retry: 2, // 실패 시 최대 2번 재시도
    onSettled: (data, error) => {
      // 성공 또는 실패 후 처리
      console.log('Mutation settled', { data, error });
    },
  });
};

export const useDeletePostLike = () => {
  return useMutation({
    mutationFn: (postId: string) => deletePostLike(postId),
    onSuccess: () => {
      console.log('좋아요 삭제 성공');
    },
    onError: error => {
      console.error('Error deleting post like:', error);
    },
  });
};

// React Query mutation for posting a like
export const usePostPostLike = () => {
  return useMutation({
    mutationFn: (postId: string) => postPostLike(postId),
    onSuccess: () => {
      console.log('좋아요 성공');
    },
    onError: error => {
      console.error('Error posting post like:', error);
    },
  });
};
