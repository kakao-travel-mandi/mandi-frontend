import { useQuery } from "@tanstack/react-query";

import { getListAPI } from "@/apis/list";
import { GetListRequest } from "@/types/request";

export const useListQuery = (request: GetListRequest) => {
  return useQuery({
    queryKey: ["list", request],
    queryFn: () => getListAPI(request),
  });
};
