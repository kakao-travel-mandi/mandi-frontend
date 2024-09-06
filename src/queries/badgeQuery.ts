import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { getBadgesAPI } from '@/apis/badge';
import { BadgeResponse } from '@/types/response';
export const useBadgesMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: BadgeResponse) => void;
  onError: (error: Error) => void;
}) => {
  return useMutation<BadgeResponse, Error, string>({
    mutationKey: ['badges'],
    mutationFn: (userId: string) => getBadgesAPI(userId),
    onSuccess,
    onError,
    retry: 2,
    onSettled: (data, error) => {
      console.log('Mutation settled', { data, error });
    },
  }) as UseMutationResult<BadgeResponse, Error, string>; // Ensure correct type
};
