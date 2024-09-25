import { AxiosResponse } from 'axios';

import { OauthProvider } from './oauth-provider';
import { WeatherItem } from './weather';

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

export interface PostsCategoryResponse {
  success: boolean; // 요청 성공 여부
  response: {
    posts: {
      postId: number; // 게시물 ID
      user: {
        userId: number; // 사용자 ID
        nickname: string; // 사용자 닉네임
        imgUrl: string; // 사용자 프로필 이미지 URL
      };
      category: string; // 카테고리 (예: TOURISM)
      content: string; // 게시물 내용
      title: string; // 게시물 제목
      uploadDate: string; // 업로드 날짜 (ISO 포맷)
      likeCnt: number; // 좋아요 수
      commentCnt: number; // 댓글 수
      imgUrlList: {
        url: string; // 이미지 URL 리스트
      }[];
    }[];
    pageInfo: {
      totalCount: number; // 전체 게시물 수
      size: number; // 페이지당 게시물 수
      currentPage: number; // 현재 페이지 번호
      totalPages: number; // 전체 페이지 수
    };
  };
  error: {
    message: string; // 에러 메시지
    status: number; // 에러 상태 코드
    errorCode: string; // 에러 코드
  };
}

export interface WeatherResponse {
  list: WeatherItem[];
  city: {
    name: string;
  };
}
