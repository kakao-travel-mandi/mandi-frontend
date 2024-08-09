import { AxiosResponse } from "axios";

import { GetBearType } from "./test";

interface BaseResponse extends AxiosResponse {
  code: number;
  message: string;
}

export interface GetListResponse extends BaseResponse {
  data: GetBearType;
}
