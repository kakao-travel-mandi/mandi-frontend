import { AxiosResponse } from 'axios';

import { GetBearType } from './test';

interface BaseResponse extends AxiosResponse {
  code: number;
  message: string;
}

export interface GetListResponse extends BaseResponse {
  data: GetBearType;
}

export interface GetMyInfoResponse extends BaseResponse {
  nickname: string;
  profileImageUrl: string;
  bio: string;
  oauthInfo: {
    provider: string;
    email: string;
  };
  totalReviewCount: number;
  completedCourseCount: number;
}
