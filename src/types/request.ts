import { Coordinate } from './course';

export type SignupRequest = {
  token: string;
  nickname: string;
  description: string;
};

export type LoginRequest = {
  token: string;
};

export type UpdateMyInfoRequest = {
  nickname: string;
  description: string;
};

export type UpdateMyInfoImageRequest = {
  Base64EncodedImage: string;
};
export type CheckNicknameRequest = {
  nickname: string;
};

export type GetCoursesRequest = {
  page?: string;
  size?: string;
  rating?: '0' | '1' | '2' | '3' | '4' | '5';
  keyword?: string;
  orderByDirection?: 'ASC' | 'DESC';
  levels?: string;
};

export type GetNearbyCoursesRequest = {
  sw: Coordinate;
  ne: Coordinate;
};
