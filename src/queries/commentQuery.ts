import { useMutation } from '@tanstack/react-query';

import { deleteCommentLike, postCommentLike } from '@/apis/comment';

export const usePostCommentLike = () => {
  return useMutation({
    mutationFn: (commentId: string) => postCommentLike(commentId),
    onSuccess: () => {
      console.log('댓글 좋아요 성공');
    },
    onError: error => {
      console.error('Error posting post like:', error);
    },
  });
};

export const useDeleteCommentLike = () => {
  return useMutation({
    mutationFn: (commentId: string) => deleteCommentLike(commentId),
    onSuccess: () => {
      console.log(' 댓글 좋아요 삭제 성공');
    },
    onError: error => {
      console.error('Error deleting post like:', error);
    },
  });
};
