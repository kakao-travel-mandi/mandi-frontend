import { useMutation } from '@tanstack/react-query';

import {
  deleteComment,
  deleteCommentLike,
  postCommentAdd,
  postCommentLike,
} from '@/apis/comment';

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

export const usePostCommentAdd = () => {
  return useMutation({
    mutationFn: ({
      commentId,
      parentCommentId,
      content,
    }: {
      commentId: string;
      parentCommentId: number | null;
      content: string;
    }) => postCommentAdd(commentId, parentCommentId, content),
    onSuccess: () => {
      console.log('댓글 추가 성공');
    },
    onError: error => {
      console.error('댓글 추가 실패', error);
    },
  });
};

export const useDeleteComment = () => {
  return useMutation({
    mutationFn: (commentId: string) => deleteComment(commentId),
    onSuccess: () => {
      console.log(' 댓글 삭제 성공');
    },
    onError: error => {
      console.error('댓글 삭제 실패', error);
    },
  });
};
