import { AxiosResponse } from 'axios';

interface BaseResponse extends AxiosResponse {
  success: boolean;
  error: {
    message: string;
    status: number;
    errorCode: string;
  };
}

export interface SignupResponse extends BaseResponse {
  response: {
    accessToken: string;
    refreshToken: string;
    isSignUp: boolean;
  } | null;
}

export interface LoginResponse extends BaseResponse {
  response: {
    accessToken: string;
    refreshToken: string;
    isSignUp: boolean;
  };
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
