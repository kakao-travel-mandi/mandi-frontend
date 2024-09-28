import { AxiosResponse } from 'axios';

import { CourseDTO, MapCourseDTO } from './course';
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

export interface GetCoursesResponse extends BaseResponse {
  response: {
    pageInfo: {
      totalCount: number;
      size: number;
      currentPage: number;
      totalPages: number;
    };
    courses: CourseDTO[];
  };
}

export interface GetNearbyCoursesResponse extends BaseResponse {
  response: {
    courses: MapCourseDTO[];
  };
}

export interface WeatherResponse {
  list: WeatherItem[];
  city: {
    name: string;
  };
}
export interface CourseCompleteReviewResponse {
  success: boolean;
  response: {
    totalCompletedCourseCount: number;
    totalReviewCount: number;
    reviewedCourses: {
      completedCourse: {
        id: number;
        courseName: string;
        duration: string;
        distance: number;
        trekkingPathImageUrl: string;
        completedAt: string;
      };
      isReviewed: boolean;
      content: string;
      score: number;
      reviewedAt: string;
    }[];
    notReviewedCourses: {
      id: number;
      courseName: string;
      duration: string;
      distance: number;
      trekkingPathImageUrl: string;
      completedAt: string;
    }[];
  };
  error: {
    message: string;
    status: number;
    errorCode: string;
  };
}
export interface CourseCompleteResponse {
  success: boolean;
  response: {
    totalCount: number;
    totalDistance: number;
    completedCourses: {
      id: number;
      courseName: string;
      duration: string;
      distance: number;
      trekkingPathImageUrl: string;
      completedAt: string;
    }[];
  };
  error: {
    message: string;
    status: number;
    errorCode: string;
  };
}
