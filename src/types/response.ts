import { AxiosResponse } from 'axios';

import { OauthProvider } from './oauth-provider';

interface BaseResponse extends AxiosResponse {
  success: boolean;
  error: {
    message: string;
    status: number;
    errorCode: string;
  };
}

export interface LoginResponse extends BaseResponse {
  response: {
    accessToken: string;
    refreshToken: string;
    isSignUp: boolean;
  };
}

export interface SignupResponse extends BaseResponse {
  response: {
    accessToken: string;
    refreshToken: string;
    isSignUp: boolean;
  } | null;
}

export interface CheckNicknameResponse extends BaseResponse {
  response: boolean;
}

export interface GetMyInfoResponse extends BaseResponse {
  response: {
    nickname: string;
    imgUrl: string;
    description: string;
    totalReviews: number;
    completedCourses: number;
    email: string;
    provider: OauthProvider;
  };
}

export interface UpdateMyInfoResponse extends BaseResponse {
  response: boolean;
}

export interface UpdateMyInfoImageResponse extends BaseResponse {
  response: string;
}

export interface BadgeResponse extends BaseResponse {
  response: {
    totalBadgeCount: number;
    userBadgeCount: number;
    badges: {
      id: number;
      name: string;
      requirements: string;
      imgUrl: string;
    }[];
  };
}
