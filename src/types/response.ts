import { AxiosResponse } from 'axios';

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
