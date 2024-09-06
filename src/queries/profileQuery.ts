import { useMutation } from '@tanstack/react-query';

import { checkNicknameAPI } from '@/apis/profile';
import { CheckNicknameResponse } from '@/types/response';

export const useCheckNicknameMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: () => void;
}) => {
  return useMutation({
    mutationKey: ['checkNickname'],
    mutationFn: (nickname: string) => checkNicknameAPI({ nickname }),
    onSuccess,
    onError,
  });
};
