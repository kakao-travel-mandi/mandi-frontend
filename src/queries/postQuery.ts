import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { getPostCategory } from '@/apis/post';
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
