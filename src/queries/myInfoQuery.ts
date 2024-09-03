import { useQuery } from '@tanstack/react-query';

import { getMyInfoAPI } from '@/apis/myInfo';

export const useMyInfoQuery = () => {
  return useQuery({
    queryKey: ['my-info'],
    queryFn: () => getMyInfoAPI(),
  });
};
