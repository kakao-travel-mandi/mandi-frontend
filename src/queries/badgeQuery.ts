import { useQuery } from '@tanstack/react-query';

import { getBadgesAPI } from '@/apis/badge';
import { BadgeResponse } from '@/types/response';

export const useBadgesQuery = () => {
  return useQuery<BadgeResponse, Error>({
    queryKey: ['badges'],
    queryFn: getBadgesAPI, // getBadgesAPI를 호출하는 함수 전달
    retry: 2, // 실패 시 재시도 횟수
  });
};
