import { GetListRequest } from "@/types/request";
import { GetListResponse } from "@/types/response";

import { axiosInstance } from "./axiosInstance";

export const getListAPI = async (
  request: GetListRequest
): Promise<GetListResponse> => {
  const params = {
    page: request.page,
    size: request.size,
  };
  try {
    const response = await axiosInstance.get("/api/test", {
      params,
    });

    if (response.status === 200) {
      return response.data;
    } else throw new Error(response.data);
  } catch (error) {
    throw error;
  }
};
